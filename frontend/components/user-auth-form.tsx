"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import Modal from "./Modal";
import { signUp, signIn } from "@/utils/auth";
import { VerificationCodeForm } from "./user-code-form";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "./ui/googleButton";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "login" | "register";
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const router = useRouter();

  const handleGoogleSuccess = (response: any) => {
    // Handle successful sign-in here
    console.log("Google sign-in success:", response);
  };

  const handleGoogleFailure = (error: any) => {
    // Handle sign-in failure here
    console.error("Google sign-in error:", error);
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (data?.email && data?.password) {
      if (props.type === "register") {
        await signUp(data.email, data.password);
        toast({
          title: "Success!",
          description: "Email has been sent to your inbox.",
          variant: "default",
        });
        setUsername(data.email);
        setShowModal(true);
      }
      if (props.type === "login") {
        await signIn(data.email, data.password);
        router.push("/home");
      }

      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading || isGoogleLoading}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {props.type === "login" ? "Login" : "Register"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton onFailure={handleGoogleFailure} />
      {showModal && (
        <Modal>
          <VerificationCodeForm username={username} />
        </Modal>
      )}
    </div>
  );
}
