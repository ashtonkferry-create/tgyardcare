import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SeasonsPanel from "@/components/admin/SeasonsPanel";

export const metadata: Metadata = {
  title: "Seasons - TG Admin",
  robots: { index: false, follow: false },
};

export default function SeasonsPage() {
  return (
    <AdminLayout title="Seasons & Promos">
      <SeasonsPanel />
    </AdminLayout>
  );
}
