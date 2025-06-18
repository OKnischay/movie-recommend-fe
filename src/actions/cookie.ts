"use server";
import { TCookie } from "@/types/cookie";
import { cookies } from "next/headers";

export const setCookie = async (name: TCookie, value: string, date: number) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    expires: new Date(date),
    secure: false,
    httpOnly: false,
    sameSite: true,
  });
};

export const getCookie = async (name: TCookie) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const removeCookie = async (name: TCookie) => {
  const cookieStore = await cookies();
  console.log("Removing cookie:", name);
  cookieStore?.delete(name);
};