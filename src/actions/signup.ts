"use server";

import { setCookie } from "@/actions/cookie";
import { SignupFormSchema } from "@/components/auth/schema/signup.schema";
import { z } from "zod";
import { accessExpiryDate, refreshExpiryDate } from "@/constant/expiry";


async function signup(values: z.infer<typeof SignupFormSchema>) {
  const response = await fetch("http://localhost:8000/api/authentication/signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to sign up");
  }

  return response.json(); 
}

// Server action to handle signup and set cookies
export async function handleSignup(values: z.infer<typeof SignupFormSchema>) {
  try {
    const response = await signup(values);

    if (!response?.id || !response.access_token || !response.refresh_token) {
      return { success: false, error: "Invalid response from server" };
    }

    await setCookie("access_token", response.access_token, accessExpiryDate);
    await setCookie("refresh_token", response.refresh_token, refreshExpiryDate);
    await setCookie(
      "user",
      JSON.stringify({
        id: response.id,
        email: response.email,
        role: response.role,
      }),
      accessExpiryDate
    );

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Signup failed. Please try again.",
    };
  }
}
