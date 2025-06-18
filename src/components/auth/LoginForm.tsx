"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginFormSchema } from "./schema/login.schema";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { handleLogin } from "@/actions/auth-actions";
import { PasswordInput } from "@/components/ui/password-input";
import { Mail,Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    //   try {
    //     setIsLoading(true);
    //     const result = await handleLogin(values);
    //     if (result.success) {
    //       toast.success("Login successful");
    //       router.replace("/");
    //     } else {
    //       toast.error(result.error || "Something went wrong. Please try again.");
    //     }
    //   } catch (error) {
    //     console.error("Login error:", error);
    //     toast.error("Something went wrong. Please try again.");
    //   } finally {
    //     setIsLoading(false);
    //   }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome to CineMatch
            </h1>
        <div className="flex">
              <div className="px-4 py-2 font-semibold text-gray-800 border-b-2 border-blue-500">
                Login
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
                {/* <FormLabel>Email</FormLabel> */}

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <div className="flex items-center justify-between">{/* <FormLabel>Password</FormLabel> */}</div>
                <FormControl>
                    <div className="relative">
                     <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />  
                  <PasswordInput placeholder="Please enter your password" {...field} 
                  className="pl-10 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
                {/* <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label> */}
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
          <Button type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
            Login
          </Button>
          <div className="text-center">
                <p className="text-sm text-gray-600">
                  You don't have an account?{" "}
                  <Link 
                    href="/register" 
                    className="text-pink-800 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
        </form>
      </Form>
    </div>
  );
}
