// Creating S3 Bucket for storing images

import { aws_s3 as S3 } from "aws-cdk-lib";

import { Construct } from "constructs";

export const ImageBucket = (scope: Construct) => {
  const bucket = new S3.Bucket(scope, "ImageBucket", {
    bucketName: "cognito-tutorial-images",
    cors: [
      {
        allowedHeaders: ["*"],
        allowedMethods: [
          S3.HttpMethods.GET,
          S3.HttpMethods.PUT,
          S3.HttpMethods.POST,
          S3.HttpMethods.DELETE,
          S3.HttpMethods.HEAD,
        ],
        allowedOrigins: ["*"],
        exposedHeaders: [
          "x-amz-server-side-encryption",
          "x-amz-request-id",
          "x-amz-id-2",
          "ETag",
        ],
      },
    ],
    accessControl: S3.BucketAccessControl.PRIVATE,
  });
  return bucket;
};
