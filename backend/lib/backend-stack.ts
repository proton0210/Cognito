import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ImageBucket } from "../constructs/storage";
import { IdentityPool, UserPool, UserPoolClient } from "../constructs/auth";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const imageBucket = ImageBucket(this);

    const userPool = UserPool(this);
    const userPoolClient = UserPoolClient(this, userPool);
    const identityPool = IdentityPool(this, userPool, userPoolClient);

    new cdk.CfnOutput(this, "Image Bucket ARN", {
      description: "Image Bucket ARN",
      value: imageBucket.bucketArn,
    });

    new cdk.CfnOutput(this, "User Pool ID", {
      description: "User Pool ID",
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, "User Pool Client ID", {
      description: "User Pool Client ID",
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, "Identity Pool ID", {
      description: "Identity Pool ID",
      value: identityPool.identityPoolId,
    });
  }
}
