import React from "react";
import { verifyAdmin } from "@/lib/require-admin";
import { redirect } from "next/navigation";

// This route requires dynamic rendering because it reads request headers/cookies
export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  const adminCheck = await verifyAdmin();

  if (!adminCheck.success) {
    // Redirect non-admins to login
    redirect("/login");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;