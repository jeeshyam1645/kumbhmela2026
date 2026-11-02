import { redirect } from "next/navigation";
import { BookingList } from "@/components/BookingList";
import { auth } from "@/lib/auth";
import { listBookingsForUser, listCamps } from "@/lib/queries";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("My bookings | Magh Mela Stays", "Callback requests for your Magh Mela stay.", "/bookings"),
  robots: { index: false, follow: false },
};

export default async function BookingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/bookings");
  const rows = await listBookingsForUser(Number(session.user.id));
  const { camps } = await listCamps();
  return (
    <BookingList
      camps={camps}
      bookings={rows.map((row) => ({
        id: row.id,
        campId: row.campId,
        guestName: row.guestName,
        mobile: row.mobile,
        checkIn: String(row.checkIn),
        checkOut: String(row.checkOut),
        guestCount: row.guestCount,
        totalAmount: row.totalAmount,
        status: row.status,
      }))}
    />
  );
}
