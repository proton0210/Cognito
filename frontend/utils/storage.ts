import { Storage } from "aws-amplify";

const listImages = async () => {
  try {
    // Use the Storage.list method to list images from the bucket
    const images = await Storage.list("");

    // 'images' will contain an array of objects representing the images in the bucket
    console.log(images);
    return images;
  } catch (error) {
    console.error("Error listing images:", error);
    throw error;
  }
};

export default listImages;
