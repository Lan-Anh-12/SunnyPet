import { redirect } from "next/navigation";
import { format } from "date-fns";

export default function DoctorRootPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  redirect(`/doctor/${today}`); // Nó sẽ đá sang /doctor/2026-03-29
}