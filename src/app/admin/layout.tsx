import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Kavacham",
  description: "Kavacham Admin Panel - Manage users, astrologers, and platform operations",
  robots: "noindex, nofollow", // Prevent search engines from indexing admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}