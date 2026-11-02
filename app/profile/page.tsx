import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ProfileEditor } from "@/components/ProfileEditor";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { publicUser } from "@/lib/queries";
import { users } from "@/lib/schema";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("Profile | Magh Mela Stays", "Your Magh Mela Stays profile.", "/profile"),
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/profile");
  const db = getDb();
  if (!db) redirect("/login");
  const [user] = await db.select().from(users).where(eq(users.id, Number(session.user.id))).limit(1);
  if (!user) redirect("/login");
  return <ProfileEditor user={publicUser(user)} />;
}
