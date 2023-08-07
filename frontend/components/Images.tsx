"use client";
import React from "react";
import { Storage } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

import useSWR from "swr";
import listImages from "@/utils/storage";

type ImagesProps = {
  user: CognitoUser;
};

const Images: React.FC<ImagesProps> = ({ user }: { user: CognitoUser }) => {
  console.log("Images", user);
  const { data, error, isLoading } = useSWR("ListImages", listImages);

  if (error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (data) {
    console.log("data", data);
  }

  return (
    <div>
      <p>Image Component</p>
    </div>
  );
};

export default Images;
