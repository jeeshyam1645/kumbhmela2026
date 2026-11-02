import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/AdminPanel";
import { auth } from "@/lib/auth";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("Admin | Magh Mela Stays", "Camp admin.", "/admin"),
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");
  return <AdminPanel />;
}
