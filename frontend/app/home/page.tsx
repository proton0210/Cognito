import { getCurrentSession } from "@/utils/auth";
import React from "react";
import { useRouter } from "next/navigation";
import useHasMounted from "@/hooks/useHasMounted";
import useSWR from "swr";

type pageProps = {
  title?: string;
};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();
  const hasMounted = useHasMounted();

  const { data, error } = useSWR("authenticatedUser", getCurrentSession);

  if (error) {
    router.push("/login");
    return <div>Redirecting to login...</div>; // Show a temporary message while redirecting
  }

  if (!data) {
    return <div>Checking authentication...</div>; // Show a temporary message while checking authentication
  }

  if (!hasMounted) {
    return null; // Render nothing until the authentication check is complete
  }

  if (!data.user) {
    router.push("/login");
    return <div>Redirecting to login...</div>; // Show a temporary message while redirecting
  }

  return <div>Hello</div>; // Render the content only when the user is authenticated
};

export default Page;
