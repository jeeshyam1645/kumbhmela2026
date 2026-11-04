import { redirect } from "next/navigation";
import { AdminEnquiries } from "@/components/AdminEnquiries";
import { auth } from "@/lib/auth";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("Enquiries | Admin | Magh Mela Stays", "Contact enquiries.", "/admin/enquiries"),
  robots: { index: false, follow: false },
};

export default async function AdminEnquiriesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin/enquiries");
  if (session.user.role !== "admin") redirect("/");
  return <AdminEnquiries />;
}
