"use client";
import React from "react";
import { Storage } from "aws-amplify";
import { S3ProviderListOutput } from "@aws-amplify/storage";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/utils/auth";

const Images: React.FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSignOut = async () => {
    const res = await signOut();
    if (res) {
      window.location.reload();
    } else {
      console.log("Error signing out");
    }
  };

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
      <div className="flex justify-center">
        <h2>Loading Pokemon from S3</h2>
      </div>

      {imageUrls.map(
        (imageUrl, index) =>
          index !== 0 && (
            <div key={index} className="flex justify-center items-center ">
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )
      )}
      <div className="flex justify-center items-center ">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={handleSignOut}
        >
          SignOut
        </button>
      </div>
    </div>
  );
};

export default Images;
