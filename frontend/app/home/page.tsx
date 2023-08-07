"use client";
import { getCurrentSession } from "@/utils/auth";
import React from "react";
import { useRouter } from "next/navigation";
import useHasMounted from "@/hooks/useHasMounted";
import useSWR from "swr";
import Images from "@/components/Images";
import { CognitoUser } from "@aws-amplify/auth";

type pageProps = {
  title?: string;
};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();
  const hasMounted = useHasMounted();

  const { data, error } = useSWR("authenticatedUser", getCurrentSession);

  if (error) {
    router.push("/login");
  }

  if (!hasMounted) {
    return null; // Render nothing until the authentication check is complete
  }

  if (data === null) {
    router.push("/login"); // Show a temporary message while redirecting
  }

  return (
    <div>
      <Images />
    </div>
  ); // Render the content only when the user is authenticated
};

export default Page;
