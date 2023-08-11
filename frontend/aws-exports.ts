export const awsConfig = {
  Auth: {
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,

    region: process.env.NEXT_PUBLIC_REGION,

    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,

    userPoolWebClientId: process.env.NEXT_PUBLIC_CLIENT_POOL_ID,
  },
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN_NAME,
    redirectSignIn: [
      "http://localhost:3000/home",
      "https://main.d3m5kt17r5818r.amplifyapp.com/home",
    ],
    redirectSignOut: [
      "http://localhost:3000/",
      "https://main.d3m5kt17r5818r.amplifyapp.com/",
    ],
    responseType: "code",
    scope: ["email", "profile", "openid"],
  },
  Storage: {
    AWSS3: {
      bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      region: process.env.NEXT_PUBLIC_REGION,
    },
  },
  aws_cognito_social_providers: ["GOOGLE"],
};
