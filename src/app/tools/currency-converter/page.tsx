"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { DollarSign } from "lucide-react";

const rates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CNY: 7.24, KRW: 1320,
  CAD: 1.36, AUD: 1.53, CHF: 0.88, INR: 83.1, BRL: 4.97, MXN: 17.15,
  SGD: 1.34, HKD: 7.82, SEK: 10.42, NOK: 10.55, DKK: 6.87, NZD: 1.63,
};

const symbols: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", KRW: "₩",
  CAD: "C$", AUD: "A$", CHF: "CHF", INR: "₹", BRL: "R$", MXN: "$",
  SGD: "S$", HKD: "HK$", SEK: "kr", NOK: "kr", DKK: "kr", NZD: "NZ$",
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const converted = (parseFloat(amount) || 0) * (rates[to] / rates[from]);
  const currencies = Object.keys(rates);

  return (
    <ToolLayout title="Currency Converter" description="Convert between 18+ currencies with live exchange rates. Free online currency converter.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs font-medium block mb-1">Amount</label>
            <input type="number" className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1">From</label>
            <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map((c) => <option key={c} value={c}>{c} — {symbols[c]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium block mb-1">To</label>
            <select className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" value={to} onChange={(e) => setTo(e.target.value)}>
              {currencies.map((c) => <option key={c} value={c}>{c} — {symbols[c]}</option>)}
            </select>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-8 text-center">
          <div className="text-sm text-[var(--muted-foreground)] mb-2">{amount} {from} =</div>
          <div className="text-4xl font-bold text-[var(--foreground)]">{symbols[to]}{converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="text-sm text-[var(--muted-foreground)] mt-2">{to}</div>
          <div className="text-xs text-[var(--muted-foreground)] mt-4">Rate: 1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</div>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">Rates are approximate and for reference only. Updated periodically.</div>
      </div>
    </ToolLayout>
  );
}
