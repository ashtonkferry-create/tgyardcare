import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import CommandCenter from "@/components/admin/CommandCenter";

export const metadata: Metadata = {
  title: "Command Center - TG Admin",
  robots: { index: false, follow: false },
};

export default function AdminOverview() {
  return (
    <AdminLayout title="Command Center">
      <CommandCenter />
    </AdminLayout>
  );
}
