"use server";

import { login } from "@/actions/login";
import { setCookie } from "@/actions/cookie";
import { LoginFormSchema } from "@/components/auth/schema/login.schema";
import { z } from "zod";
// import { SignupFormSchema } from "@/components/auth/schema/signup.schema";
import { accessExpiryDate, refreshExpiryDate } from "@/constant/expiry";
// export async function handleLogin(values: z.infer<typeof LoginFormSchema>) {
//   try {
//     // console.log("hI");
//     const response = await login(values);
//     console.log("Login response received:", response);

//     if (!response?.id || !response.access_token || !response.refresh_token) {
//       return { success: false, error: "Invalid response from server" };
//     }

//     await setCookie("access_token", response.access_token, accessExpiryDate);
//     await setCookie("refresh_token", response.refresh_token, refreshExpiryDate);
//     await setCookie(
//       "user",
//       JSON.stringify({
//         id: response?.id,
//         email: response?.email,
//         role: response?.role,
//       }),
//       accessExpiryDate
//     );

//     return { success: true };
//   } catch (error) {
//     // console.error("Login error:", error);
//     return {
//       success: false,
//       error: "Authentication failed. Please check your credentials.",
//     };
//   }
// }

export async function handleLogin(values: z.infer<typeof LoginFormSchema>) {
  try {
    const response = await login(values);
    console.log("Login response received:", response);

    if (!response?.id || !response.access_token || !response.refresh_token) {
      return { success: false, error: "Invalid response from server" };
    }

    // Set cookies
    await setCookie("access_token", response.access_token, accessExpiryDate);
    await setCookie("refresh_token", response.refresh_token, refreshExpiryDate);
    const user = {
      id: response?.id,
      email: response?.email,
      role: response?.role,
    };
    await setCookie("user", JSON.stringify(user), accessExpiryDate);

    // 👇 Return user directly so the client can use it immediately
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: "Authentication failed. Please check your credentials.",
    };
  }
}

