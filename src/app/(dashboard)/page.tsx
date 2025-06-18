import AdminPage from "@/components/dashboard/admin/AdminPage";
import UserPage from "@/components/dashboard/user/UserPage";
import { getUser } from "@/lib/getUser";
import React from "react";

export default async function DashboardPage() {
  const user = await getUser();
  if (user?.role === "admin") {
    return <AdminPage />;
  } else if (user?.role === "user") {
    return <UserPage />;
  }
  return <div>Dashboard</div>;
}
