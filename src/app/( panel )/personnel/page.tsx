type EmployeeStatus = "active" | "inactive";

interface Employee {
  id: number;
  personnelCode: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  unitId: number;
  unitName: string;
  position: string;
  status: EmployeeStatus;
  hireDate: string;
  companyId: number;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    personnelCode: "1001",
    firstName: "علی",
    lastName: "رضایی",
    nationalCode: "1234567890",
    unitId: 1,
    unitName: "تولید",
    position: "اپراتور",
    status: "active",
    hireDate: "1398/03/15",
    companyId: 1,
  },
  {
    id: 2,
    personnelCode: "1002",
    firstName: "محمد",
    lastName: "احمدی",
    nationalCode: "0987654321",
    unitId: 4,
    unitName: "کیفیت",
    position: "کارشناس",
    status: "active",
    hireDate: "1397/08/20",
    companyId: 1,
  },
  {
    id: 3,
    personnelCode: "1003",
    firstName: "حسن",
    lastName: "کریمی",
    nationalCode: "1122334455",
    unitId: 5,
    unitName: "نگهداری",
    position: "تکنسین",
    status: "active",
    hireDate: "1396/05/10",
    companyId: 1,
  },
  {
    id: 4,
    personnelCode: "1004",
    firstName: "رضا",
    lastName: "محمدی",
    nationalCode: "2233445566",
    unitId: 2,
    unitName: "بسته‌بندی",
    position: "اپراتور",
    status: "active",
    hireDate: "1399/01/25",
    companyId: 1,
  },
  {
    id: 5,
    personnelCode: "1005",
    firstName: "سعید",
    lastName: "نوری",
    nationalCode: "3344556677",
    unitId: 3,
    unitName: "انبار",
    position: "انباردار",
    status: "inactive",
    hireDate: "1395/11/05",
    companyId: 1,
  },
];

const statusLabels: Record<EmployeeStatus, string> = {
  active: "فعال",
  inactive: "غیرفعال",
};

export default function PersonnelListPage() {
  const employees = mockEmployees;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            👥 مشاهده اطلاعات پرسنلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            لیست کارکنان ثبت‌شده در سیستم
          </p>
        </div>
        <button className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5">
          + افزودن کارمند جدید
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="جستجو با نام، کد ملی یا کد پرسنلی..."
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3.5 text-[14px] outline-none transition focus:border-[#2e7cc4] focus:ring-4 focus:ring-[#2e7cc4]/10"
        />
        <select className="rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3.5 text-[14px] outline-none transition focus:border-[#2e7cc4] focus:ring-4 focus:ring-[#2e7cc4]/10">
          <option>همه واحدها</option>
          <option>تولید</option>
          <option>بسته‌بندی</option>
          <option>انبار</option>
          <option>کیفیت</option>
          <option>نگهداری و تعمیرات</option>
          <option>اداری</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc]">
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                کد پرسنلی
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                نام و نام خانوادگی
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                کد ملی
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                واحد
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                سمت
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                وضعیت
              </th>
              <th className="px-6 py-4 text-right text-[13px] font-bold text-[#64748b]">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-t border-[#e2e8f0] transition hover:bg-[#f8fafc]"
              >
                <td className="px-6 py-4 text-[14px] font-semibold text-[#0f2c4c]">
                  {emp.personnelCode}
                </td>
                <td className="px-6 py-4 text-[14px] font-medium">
                  {emp.firstName} {emp.lastName}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#64748b]">
                  {emp.nationalCode}
                </td>
                <td className="px-6 py-4 text-[14px]">{emp.unitName}</td>
                <td className="px-6 py-4 text-[14px]">{emp.position}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-[12px] font-bold ${
                      emp.status === "active"
                        ? "bg-[#d1fae5] text-[#065f46]"
                        : "bg-[#fecaca] text-[#991b1b]"
                    }`}
                  >
                    {statusLabels[emp.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]">
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-[13px] text-[#64748b]">
        <span>نمایش ۱ تا ۵ از ۵ کارمند</span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 font-semibold transition hover:bg-[#f8fafc]">
            قبلی
          </button>
          <button className="rounded-lg bg-[#2e7cc4] px-4 py-2 font-bold text-white">
            ۱
          </button>
          <button className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 font-semibold transition hover:bg-[#f8fafc]">
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}