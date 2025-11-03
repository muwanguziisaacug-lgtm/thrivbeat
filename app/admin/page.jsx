import React from "react";
import { requireAdmin } from "@/lib/require-admin";

const AdminDashboard = async () => {
  await requireAdmin(); // This will throw an error if not admin
    return <div>
        <h1>Admin Dashboard</h1>
    </div>;
};


export default AdminDashboard