"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { confirmSignUp } from "@/utils/auth";

const verificationCodeSchema = z.object({
  digit1: z.string().length(1, "Digit must be exactly 1 character"),
  digit2: z.string().length(1, "Digit must be exactly 1 character"),
  digit3: z.string().length(1, "Digit must be exactly 1 character"),
  digit4: z.string().length(1, "Digit must be exactly 1 character"),
  digit5: z.string().length(1, "Digit must be exactly 1 character"),
  digit6: z.string().length(1, "Digit must be exactly 1 character"),
});

type FormData = z.infer<typeof verificationCodeSchema>;

type VerificationCodeFormProps = {
  username: string;
};
export const VerificationCodeForm = ({
  username,
}: VerificationCodeFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleFormSubmit = async (data: Record<string, string>) => {
    console.log("Clickedd");
    setIsLoading(true);

    // Convert the received data to the expected shape
    const formData: FormData = {
      digit1: data.digit1 || "",
      digit2: data.digit2 || "",
      digit3: data.digit3 || "",
      digit4: data.digit4 || "",
      digit5: data.digit5 || "",
      digit6: data.digit6 || "",
    };

    const code = Object.values(formData).join("");
    console.log("Verifying.." + username + " " + code);
    await confirmSignUp(username, code);

    setIsLoading(false);
  };

  const inputNames: (keyof FormData)[] = [
    "digit1",
    "digit2",
    "digit3",
    "digit4",
    "digit5",
    "digit6",
  ];

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const nextIndex = index + 1;

    if (value && nextIndex < inputRefs.length) {
      inputRefs[nextIndex].current?.focus();
    }
  };

  return (
    <div>
      <form className="grid gap-2">
        <div className="grid grid-cols-6 gap-1">
          {inputNames.map((name, index) => (
            <Input
              key={name}
              type="text"
              id={name}
              maxLength={1}
              className="w-10 text-center"
              disabled={isLoading}
              ref={inputRefs[index]}
              onChange={(event) => handleInputChange(index, event)}
            />
          ))}
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          disabled={isLoading}
          onClick={() => {
            // Manually trigger the form submission
            const formData = Object.fromEntries(
              inputNames.map((name) => [
                name,
                inputRefs[inputNames.indexOf(name)].current?.value || "",
              ])
            );
            handleFormSubmit(formData);
          }}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};
