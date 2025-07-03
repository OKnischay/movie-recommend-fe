
import { LoginFormSchema } from "@/components/auth/schema/login.schema";
import { z } from "zod";

export interface LoginResponse {
  id: string;
  email: string;
  role?: string;
  access_token: string;
  refresh_token: string;
}

const baseUrl = 'http://localhost:8000/api/authentication/';

export const login = async (data: z.infer<typeof LoginFormSchema>): Promise<LoginResponse> => {
  console.log("Login function triggered"); 
  try {
    console.log(`${baseUrl}login/`); // Check the final URL in the browser console
    console.log("Login data being sent:", data); // Log the data being sent
    const response = await fetch('http://localhost:8000/api/authentication/login/', {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Failed to login.");
    }

    const responseData: LoginResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};
