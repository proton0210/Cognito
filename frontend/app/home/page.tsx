"use client";
import { getCurrentSession } from "@/utils/auth";
import React from "react";
import { useRouter } from "next/navigation";
import useHasMounted from "@/hooks/useHasMounted";
import useSWR from "swr";
import Images from "@/components/Images";
import { CognitoUser } from "@aws-amplify/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user, customState, getUser } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    // Perform the navigation action only after rendering is complete
    if (!user) {
      // router.push("");
    }
  }, [user, router]);

  return (
    <div>
      {/* Render your content here */}
      {user && <Images />}
    </div>
  );
}
