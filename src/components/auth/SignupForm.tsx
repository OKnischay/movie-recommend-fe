"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignupFormSchema } from "./schema/signup.schema";
import { Mail, Lock } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

export function SignupForm() {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      full_name: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    console.log("Final submitted values:", values);
    // Submit to API here
  };

  const handleNext = async () => {
    const valid = await form.trigger(["email", "password", "confirm_password"]);
    if (valid) {
      setStep(2);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome to CineMatch</h1>
        <div className="flex">
          <div className="px-4 py-2 font-semibold text-gray-800 border-b-2 border-blue-500">Sign up</div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Please enter your email"
                          {...field}
                          className="pl-10 py-3"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <PasswordInput
                          placeholder="Please enter your password"
                          {...field}
                          className="pl-10 py-3"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <PasswordInput
                          placeholder="Please confirm your password"
                          {...field}
                          className="pl-10 py-3"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                onClick={handleNext}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input placeholder="Your full name" {...field} className="py-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} className="py-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                   className="w-1/2 bg-amber-300 hover:bg-amber-400 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                   className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Sign Up"}
                </Button>
              </div>
            </>
          )}

          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
