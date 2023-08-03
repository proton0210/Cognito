// Creating S3 Bucket for storing images

import { aws_s3 as S3 } from "aws-cdk-lib";

import { Construct } from "constructs";

export const ImageBucket = (scope: Construct) => {
  const bucket = new S3.Bucket(scope, "ImageBucket", {
    bucketName: "cognito-tutorial-images",
    cors: [
      {
        allowedHeaders: ["*"],
        allowedMethods: [S3.HttpMethods.GET],
        allowedOrigins: ["*"],
      },
    ],
    accessControl: S3.BucketAccessControl.PRIVATE,
  });
  return bucket;
};
