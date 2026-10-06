import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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