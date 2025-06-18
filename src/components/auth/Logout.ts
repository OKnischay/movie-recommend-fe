import { removeCookie } from "@/actions/cookie"

export const Logout = async () => {
    try{
        await removeCookie("refresh_token")
        await removeCookie("user")
        await removeCookie("access_token")
    }
    catch (error) {
        console.error("Logout failed:", error);
        throw new Error("Logout failed");
      }
}