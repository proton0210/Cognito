import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
} from "@aws-sdk/client-cognito-identity";
type ResendConfCodeParameters = {
  username: string;
};
type SignInParameters = {
  username: string;
  password: string;
};
export const signUp = async (username: string, password: string) => {
  try {
    console.log("signing up...");
    await Auth.signUp({
      username,
      password,
    });
    console.log("sign up successful!");
    return true;
    // Perform additional actions if needed after successful signup
  } catch (error: any) {
    if (error.code === "UsernameExistsException") {
      // Handle the case when the provided username already exists
      console.log(
        "Error: Username already exists. Please choose a different username."
      );
    } else if (error.code === "InvalidPasswordException") {
      // Handle the case when the provided password is invalid
      console.log(
        "Error: Invalid password. Password must meet the password policy requirements."
      );
    } else if (error.code === "InvalidParameterException") {
      // Handle the case when there is an issue with the provided parameters (e.g., invalid email format)
      console.log(
        "Error: Invalid parameters. Please check the provided information."
      );
    } else {
      // Handle other types of errors (e.g., network error, unexpected errors)
      console.log("Error: An unexpected error occurred while signing up.");
    }

    // Return null or throw the error to be caught and handled by the caller of this function
    return null;
  }
};
export const resendConfirmationCode = async ({
  username,
}: ResendConfCodeParameters) => {
  try {
    await Auth.resendSignUp(username);
    console.log("code resent successfully");
  } catch (err) {
    console.log("error resending code: ", err);
  }
};

export async function confirmSignUp(username: string, code: string) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

export async function signIn(username: string, password: string) {
  try {
    await Auth.signIn(username, password);
    console.log("successfully signed in");
  } catch (error) {}
}

export const signOut = async (): Promise<Boolean> => {
  try {
    await Auth.signOut();
    return true;
  } catch (error) {
    console.log("error signing out: ", error);
    throw console.error("error signing out: ", error);
  }
};

export const getCurrentSession = async (): Promise<CognitoUser | null> => {
  try {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    return user; // Return the user directly
  } catch (error) {
    console.log("error getting current user", error);
    return null; // Return null if there's an error or the user is not authenticated
  }
};

export const getCredentials = async () => {
  try {
    const credentials = await Auth.currentCredentials();
    console.log("credentials: ", credentials);
    return credentials;
  } catch (error) {
    console.log("error getting credentials: ", error);
  }
};

export const exchangeToken = async (googleToken: string) => {
  const client = new CognitoIdentityClient({
    region: process.env.NEXT_PUBLIC_REGION,
  });

  const logins = {
    "accounts.google.com": googleToken,
  };

  const command = new GetCredentialsForIdentityCommand({
    IdentityId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    Logins: logins,
  });

  try {
    const response = await client.send(command);
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.log("error exchanging token: ", error);
  }
};
