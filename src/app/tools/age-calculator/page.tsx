"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { CalendarDays } from "lucide-react";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");

  const calcAge = () => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday: getNextBirthday(birth) };
  };

  const getNextBirthday = (birth: Date) => {
    const now = new Date();
    let next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (next <= now) next = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const diff = Math.ceil((next.getTime() - now.getTime()) / 86400000);
    return diff;
  };

  const age = calcAge();

  return (
    <ToolLayout title="Age Calculator" description="Calculate your exact age in years, months, days, weeks, and more. Free online age calculator.">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-medium block mb-1">Date of Birth</label>
          <input type="date" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        {age && (
          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6 text-center">
              <div className="text-5xl font-bold">{age.years} <span className="text-lg font-normal text-[var(--muted-foreground)]">years</span></div>
              <div className="text-[var(--muted-foreground)] mt-1">{age.months} months, {age.days} days</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Months", value: age.totalMonths.toLocaleString() },
                { label: "Weeks", value: age.totalWeeks.toLocaleString() },
                { label: "Days", value: age.totalDays.toLocaleString() },
                { label: "Next Birthday", value: `${age.nextBirthday} days` },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-center">
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
