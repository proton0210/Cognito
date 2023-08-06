"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const verificationCodeSchema = z.object({
  digit1: z.string().length(1, "Digit must be exactly 1 character"),
  digit2: z.string().length(1, "Digit must be exactly 1 character"),
  digit3: z.string().length(1, "Digit must be exactly 1 character"),
  digit4: z.string().length(1, "Digit must be exactly 1 character"),
  digit5: z.string().length(1, "Digit must be exactly 1 character"),
  digit6: z.string().length(1, "Digit must be exactly 1 character"),
});

type FormData = z.infer<typeof verificationCodeSchema>;

export const VerificationCodeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(verificationCodeSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  async function handleFormSubmit(data: FormData) {
    setIsLoading(true);
    const code = Object.values(data).join("");
    console.log(parseInt(code));

    setIsLoading(false);
  }

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-2">
      <div className="grid grid-cols-6 gap-1">
        {inputNames.map((name, index) => (
          <Input
            key={name}
            type="text"
            id={name}
            maxLength={1}
            className="w-10 text-center"
            disabled={isLoading}
            {...register(name)}
            ref={inputRefs[index]}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
      </div>
      <button
        type="submit"
        className={cn(buttonVariants({ variant: "outline" }))}
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
};
