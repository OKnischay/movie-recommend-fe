"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { sendMail } from "./actions/password";
import { MailFormSchema, TMailForm } from "./schema/mailform.schema";

const MailForm = () => {
  const router = useRouter();
  const form = useForm<TMailForm>({
    resolver: zodResolver(MailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await sendMail(data);
      if (response.status == 200) {
        toast.success("Link sent successfully");
      }
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-primary text-base">{`Don't worry, you can reset it.`}</p>
          <p className="text-muted-foreground">
            Please enter your email for a link
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6 flex flex-col">
                <Button type="submit" className="text-background w-full">
                  Send me the link
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
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MailForm;