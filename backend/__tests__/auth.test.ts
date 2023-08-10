import * as dotenv from "dotenv";
dotenv.config();

import * as cognito from "@aws-sdk/client-cognito-identity-provider";
import * as s3 from "@aws-sdk/client-s3";

const cognitoClient = new cognito.CognitoIdentityProviderClient({
  region: "ap-south-1",
});

import Chance from "chance";
const chance = new Chance();

/*
 * Test For checking the Auth Process
 * 1. SignUp
 * 2. Confirm SignUp
 * 3. SignIn
 */

const createUser = () => {
  const firstName = chance.first({ nationality: "en" });
  const lastName = chance.first({ nationality: "en" });
  const suffix = chance.string({
    length: 8,
    pool: "abcdefghijklmnopqrstuvwxyz",
  });

  const email = `${firstName}-${lastName}-${suffix}@tuples.com`;
  const password = chance.string({ length: 10 });
  return { email, password };
};

describe("Auth Test", () => {
  let email: string;
  let password: string;
  let userPoolId: string | undefined;
  let clientId: string | undefined;

  beforeAll(() => {
    const user = createUser(); // Assuming createUser() returns an object with email and password
    email = user.email;
    password = user.password;
    userPoolId = process.env.USER_POOL_ID;
    clientId = process.env.CLIENT_POOL_ID;
  });

  it("After SuccessFull Sign In Should receive id and Access token", async () => {
    console.log(`[${email}] - signing up...`);

    console.log("clientId", clientId);
    console.log("userPoolId", userPoolId);

    const command = new cognito.SignUpCommand({
      ClientId: clientId,
      Username: email,
      Password: password,
    });

    const signUpResponse = await cognitoClient.send(command);
    const userSub = signUpResponse.UserSub;

    console.log(`${userSub} - confirming sign up`);

    const adminCommand: cognito.AdminConfirmSignUpCommandInput = {
      UserPoolId: userPoolId as string,
      Username: userSub as string,
    };

    await cognitoClient.send(
      new cognito.AdminConfirmSignUpCommand(adminCommand)
    );

    console.log(`[${email}] - confirmed sign up`);

    const authRequest: cognito.InitiateAuthCommandInput = {
      ClientId: clientId as string,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const authResponse = await cognitoClient.send(
      new cognito.InitiateAuthCommand(authRequest)
    );

    console.log(`${email} - signed in`);

    expect(authResponse.AuthenticationResult).toBeDefined();
  });
});
