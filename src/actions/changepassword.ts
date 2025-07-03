import { z } from "zod";
import { ChangePasswordSchema } from "@/components/common/schema/changepassword.schema";
import { getCookie } from "@/actions/cookie";

export async function handleChangePassword(values: z.infer<typeof ChangePasswordSchema>) {
  try {
    const accessToken = await getCookie("access_token");

    if (!accessToken) {
      return { success: false, error: "User not authenticated." };
    }

    const response = await fetch("http://localhost:8000/api/authentication/password/change/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.detail || "Failed to change password.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: "Something went wrong while changing password.",
    };
  }
}