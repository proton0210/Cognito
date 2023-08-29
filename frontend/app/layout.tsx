"use client";
import * as React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Amplify } from "aws-amplify";
import { awsConfig } from "@/aws-exports";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Learn AWS Cognito",
  description:
    "Learn how to provide Authenticated and UnAuthenticated access to your application using AWS Cognito User and Identity Pool and Google Social Login.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, customState, getUser } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access window when running on the client side
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        );

      const [localRedirectSignIn, productionRedirectSignIn] =
        awsConfig.oauth.redirectSignIn;

      const [localRedirectSignOut, productionRedirectSignOut] =
        awsConfig.oauth.redirectSignOut;

      const updatedAwsConfig = {
        ...awsConfig,
        oauth: {
          ...awsConfig.oauth,
          redirectSignIn: isLocalhost
            ? localRedirectSignIn
            : productionRedirectSignIn,
          redirectSignOut: isLocalhost
            ? localRedirectSignOut
            : productionRedirectSignOut,
        },
      };

      Amplify.configure(updatedAwsConfig);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <body className={inter.className}>{children}</body>
      </head>
    </html>
  );
}

export default RootLayout;
