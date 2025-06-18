"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { handleSignup } from "@/actions/auth-actions";
import { SignupFormSchema } from "./schema/signup.schema";
import { Mail, Lock } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      // role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    // try {
    //   setIsLoading(true);
    //   console.log(values)
    //   const result = await handleSignup(values);

    //   if (result.success) {
    //     toast.success("Account created successfully!");
    //     router.replace("/login");
    //   } else {
    //     toast.error(result.error || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   toast.error("Something went wrong. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to CineMatch
        </h1>
        <div className="flex">
          <div className="px-4 py-2 font-semibold text-gray-800 border-b-2 border-blue-500">
            Sign up
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      {...field}
                      className="pl-10 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormLabel>Role</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="border-gray-400">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="artist_manager">Artist Manager</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <PasswordInput
                      placeholder="Please enter your password"
                      {...field}
                      className="pl-10 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
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
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <PasswordInput
                      placeholder="Please confirm your password"
                      {...field}
                      className="pl-10 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-pink-800 hover:text-blue-800 font-semibold transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
