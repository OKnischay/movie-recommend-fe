import { ChangePasswordForm } from "@/components/common/ChangePassword";
import { DashboardHeader } from "@/components/dashboard/user/Header";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col items-center justify-center p-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default page;
