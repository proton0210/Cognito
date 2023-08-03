#!/usr/bin/env node
import * as dotenv from "dotenv";

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();
new BackendStack(app, "BackendStack", {
  env: {
    account: process.env.COGNITO_TUTORIAL_ACCOUNT,
    region: process.env.COGNITO_TUTORIAL_REGION,
  },
});
