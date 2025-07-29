"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

import { forgotPassword } from "./actions/password";
import { ForgotPWSchema, TForgotPW } from  "./schema/forgot-pw.schema";

const ForgotPWForm = () => {
  const router = useRouter();
  let { id: token } = useParams();
  token = token?.toString() ?? "";

  const form = useForm<TForgotPW>({
    resolver: zodResolver(ForgotPWSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      form.reset();
      toast.success("Password changed successfully");
      router.push("/login");
    },
    onError: () => toast.error("Failed to change password!"),
  });

  const onSubmit = async (data: TForgotPW) => {
    mutate({ token: token, ...data });
  };

  if (error) {
    toast.error("Failed to change password");
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl font-bold">Change your password</h2>
          <p className="text-primary text-base">{`You're just one step away.`}</p>
          <p className="text-muted-foreground">
            Enter a new password to regain access to your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 ">
              <div className="space-y-6 ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>New Password**</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
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
                      <FormLabel>Confirm Password**</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <Button
                type="submit"
                className="text-background w-full"
                disabled={isPending}
              >
                Change Password
              </Button>
              <div className="mt-4 text-center text-sm">
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/90 underline"
                >
                  Back to login?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPWForm;