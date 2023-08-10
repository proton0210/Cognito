import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from "@aws-sdk/client-cognito-identity";

interface GoogleSignInButtonProps {
  onAwsCredentialsObtained?: (credentials: any) => void;
  onFailure: (error: any) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onAwsCredentialsObtained,
  onFailure,
}) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string;
  const identityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;

  const handleGoogleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      // Exchange Google token for AWS credentials
      const googleToken = (response as GoogleLoginResponse).tokenId;
      const cognitoIdentityClient = new CognitoIdentityClient({
        region: "ap-south-1",
      });

      // Get the identity ID associated with the Google token
      const getIdCommand = new GetIdCommand({
        IdentityPoolId: identityPoolId,
        Logins: {
          "accounts.google.com": googleToken,
        },
      });
      const idResponse = await cognitoIdentityClient.send(getIdCommand);
      const identityId = idResponse.IdentityId;

      // Get AWS credentials for the identity
      const getCredentialsCommand = new GetCredentialsForIdentityCommand({
        IdentityId: identityId,
        Logins: {
          "accounts.google.com": googleToken,
        },
      });
      const credentialsResponse = await cognitoIdentityClient.send(
        getCredentialsCommand
      );
    } catch (error) {
      onFailure(error);
    }
  };

  const handleGoogleFailure = (error: any) => {
    onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Sign In With Google"
      onSuccess={handleGoogleSuccess}
      onFailure={handleGoogleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignInButton;
