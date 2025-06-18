import { getCookie } from "@/actions/cookie";

export const getUser = async () => {
  try {
    const raw = await getCookie("user");
    const user = raw ? JSON.parse(raw) : null;
    return user;
  } catch (err) {
    console.error("Failed to parse user cookie:", err);
  }
};