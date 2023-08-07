"use client";
import React from "react";
import { Storage } from "aws-amplify";
import { S3ProviderListOutput } from "@aws-amplify/storage";

const Images: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const listImages = async () => {
      try {
        // Use the Storage.list method to list images from the bucket
        const imagesList: S3ProviderListOutput = await Storage.list("");
        console.log("Images list", imagesList);
        // Extract the keys from the list of images
        const imageKeys = imagesList.results.map(
          (image) => image.key
        ) as string[];

        // Update the state with the image keys
        setImages(imageKeys);
        setIsLoading(false);
      } catch (error) {
        console.error("Error listing images:", error);
        setIsLoading(false);
      }
    };

    listImages();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Image Component</p>
      {/* Render the images */}
      {images.map((imageKey, index) => (
        <div key={index}>{imageKey}</div>
      ))}
    </div>
  );
};

export default Images;
