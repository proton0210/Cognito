"use client";
import React from "react";
import { Storage } from "aws-amplify";
import { S3ProviderListOutput } from "@aws-amplify/storage";
const Images: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const listImages = async () => {
      try {
        // Use the Storage.list method to list images from the bucket
        const imagesList: S3ProviderListOutput = await Storage.list("", {
          pageSize: "ALL",
        });

        // Extract the keys from the list of images
        const imageKeys = imagesList.results.map(
          (image) => image.key
        ) as string[];

        setImages(imageKeys);

        // Fetch URLs for each image and store them in imageUrls state
        const imageUrlsPromises = imageKeys.map((imageKey) =>
          Storage.get(imageKey)
        );
        const resolvedImageUrls = await Promise.all(imageUrlsPromises);
        setImageUrls(resolvedImageUrls);

        setIsLoading(false);
      } catch (error) {
        console.error("Error listing images:", error);
        setIsLoading(false);
      }
    };

    listImages();
  }, []);

  console.table;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Pokemons From S3 Bucket</p>
      
      {imageUrls.map(
        (imageUrl, index) =>
          index !== 0 && (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )
      )}
    </div>
  );
};

export default Images;
