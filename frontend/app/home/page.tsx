"use client";
import Images from "@/components/Images";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const [currentUser, setCurrentUser] = React.useState(null); // Initialize currentUser as null

  const router = useRouter();

  React.useEffect(() => {
    // Fetch the current authenticated user asynchronously
    const fetchCurrentUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
        router.push("/login");
      }
    };

    fetchCurrentUser();
  }, [router]);

  return (
    <div>
      {/* Render your content here */}
      {currentUser && <Images />}
    </div>
  );
}
