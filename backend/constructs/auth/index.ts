import { aws_cognito as Cognito } from "aws-cdk-lib";
import { aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  IdentityPool as CognitoIdentityPool,
  UserPoolAuthenticationProvider,
} from "@aws-cdk/aws-cognito-identitypool-alpha";
export const UserPool = (scope: Construct) => {
  const userPool = new Cognito.UserPool(scope, "TwitterUserPool", {
    userPoolName: `USER-POOL`,
    selfSignUpEnabled: true,
    autoVerify: {
      email: true,
    },
    passwordPolicy: {
      minLength: 8,
      requireLowercase: false,
      requireUppercase: false,
      requireDigits: false,
      requireSymbols: false,
    },
    signInAliases: {
      email: true,
    },
  });

  return userPool;
};

export const UserPoolClient = (
  scope: Construct,
  userPool: Cognito.UserPool
) => {
  const userPoolClient = new Cognito.UserPoolClient(scope, "UserPoolClient", {
    userPool,
    userPoolClientName: `USER-POOL-CLIENT`,
    authFlows: {
      userPassword: true,
      userSrp: true,
    },
    preventUserExistenceErrors: true,
  });

  return userPoolClient;
};

export const IdentityPool = (
  scope: Construct,
  userPool: Cognito.UserPool,
  client: Cognito.UserPoolClient
) => {
  const identityPool = new CognitoIdentityPool(scope, "IdentityPool", {
    authenticationProviders: {
      google: {
        clientId:
          "759835293815-qk0gstu311o00t1beelmo4mt8b8ad3di.apps.googleusercontent.com",
      },
    },
  });
  identityPool.authenticatedRole.addToPrincipalPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["s3:ListBucket", "s3:GetObject"],
      resources: [
        "arn:aws:s3:::cognito-tutorial-images",
        "arn:aws:s3:::cognito-tutorial-images/*",
        "arn:aws:s3:::cognito-tutorial-images/public/*",
      ],
    })
  );

  identityPool.addUserPoolAuthentication(
    new UserPoolAuthenticationProvider({
      userPool,
      userPoolClient: client,
    })
  );

  return identityPool;
};
