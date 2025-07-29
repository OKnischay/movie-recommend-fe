

"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { SignupFormSchema } from "./schema/signup.schema"
import { Mail, Lock, User } from "lucide-react"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleSignup } from "@/actions/signup"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      role: "viewer",
    },
  })

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    if (values.password !== values.confirm_password) {
      form.setError("confirm_password", {
        message: "Passwords don't match",
      })
      return
    }

    setIsLoading(true)
    const result = await handleSignup(values)
    setIsLoading(false)

    if (result.success) {
      toast.success("Account created successfully!")
      router.replace("/login")
    } else {
      toast.error(result.error || "Signup failed. Please try again.")
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to CineMatch
        </h1>
        <div className="flex">
          <div className="px-2 py-2 font-semibold text-gray-800 border-b-2 border-blue-500">
            Create Account
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
               <FormMessage className="text-sm text-red-500 mt-1 min-h-[0] leading-tight" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Please choose a username"
                      {...field}
                      className="pl-10 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500 mt-1 min-h-[0] leading-tight" />
              </FormItem>
            )}
          />

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
                <FormMessage className="text-sm text-red-500 mt-1 min-h-[0] leading-tight" />
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
                <FormMessage className="text-sm text-red-500 mt-1 min-h-[0] leading-tight" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-pink-800 hover:text-blue-800 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}