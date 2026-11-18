import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-8">{children}</main>
      </div>
    </div>
  );
}