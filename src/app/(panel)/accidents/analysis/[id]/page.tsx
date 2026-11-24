import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import AnalysisForm from "./AnalysisForm";

export default async function AnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  const role = (session?.user as any)?.role;
  
  if (!companyId) redirect("/login");

  const resolvedParams = await params;
  const accidentId = parseInt(resolvedParams.id);
  if (isNaN(accidentId)) return notFound();

  // گرفتن حادثه به همراه تحلیل قبلی
  const accident = await prisma.accident.findFirst({
    where: { id: accidentId, companyId },
    include: { analysis: true },
  });

  if (!accident) return notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">تجزیه و تحلیل حادثه</h2>
          <p className="text-sm text-slate-500 mt-1">حادثه‌دیده: {accident.victimName} - کد: {accident.accidentCode || accident.id}</p>
        </div>
        <Link href="/accidents/analysis" className="text-sm text-slate-500 hover:text-slate-800">
          بازگشت
        </Link>
      </div>

      <AnalysisForm 
        accidentId={accidentId} 
        initialData={accident.analysis} 
        userRole={role} 
      />
    </div>
  );
}