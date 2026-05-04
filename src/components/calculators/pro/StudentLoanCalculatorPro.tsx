'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { AnimatedNumber, MetricCard, SliderInput, TabSwitch } from './CalcKit';
import { cn } from '@/lib/utils';

type AmortizationRow = {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

type LoanResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
  payoffMonths: number;
  effectiveAprPct: number;
};

const formatMoney = (n: number, decimals = 0) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(n) ? n : 0);

function buildSchedule(
  principal: number,
  annualRatePct: number,
  termMonths: number,
  extraMonthly: number
): LoanResult {
  const r = annualRatePct / 100 / 12;
  const n = Math.max(1, Math.round(termMonths));

  let scheduledPayment = 0;
  if (r === 0) {
    scheduledPayment = principal / n;
  } else {
    scheduledPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  if (!Number.isFinite(scheduledPayment) || scheduledPayment <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      schedule: [],
      payoffMonths: 0,
      effectiveAprPct: 0,
    };
  }

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  const targetMonthly = scheduledPayment + Math.max(0, extraMonthly);
  const cap = Math.max(n, 1200);

  for (let month = 1; month <= cap && balance > 0.005; month++) {
    const interest = balance * r;
    let principalPaid = targetMonthly - interest;
    if (principalPaid <= 0) {
      principalPaid = 0;
    }
    let payment = targetMonthly;
    if (principalPaid > balance) {
      principalPaid = balance;
      payment = principalPaid + interest;
    }
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    schedule.push({
      month,
      payment,
      interest,
      principal: principalPaid,
      balance,
    });
    if (balance <= 0.005) break;
  }

  const totalPayment = schedule.reduce((sum, row) => sum + row.payment, 0);
  const payoffMonths = schedule.length;
  return {
    monthlyPayment: scheduledPayment,
    totalPayment,
    totalInterest,
    schedule,
    payoffMonths,
    effectiveAprPct:
      principal > 0
        ? ((totalPayment - principal) / principal) * (12 / payoffMonths) * 100
        : 0,
  };
}

/* -------------------------------------------------------------------------- */
/*  Donut chart (principal vs interest)                                       */
/* -------------------------------------------------------------------------- */

function DonutChart({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) {
  const total = Math.max(0.0001, principal + interest);
  const principalPct = (principal / total) * 100;
  const interestPct = 100 - principalPct;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const principalDash = (principalPct / 100) * circumference;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="principal-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7a5af8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="interest-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#interest-grad)"
            strokeWidth="22"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#principal-grad)"
            strokeWidth="22"
            strokeLinecap="round"
            strokeDasharray={`${principalDash} ${circumference}`}
            initial={false}
            animate={{ strokeDasharray: `${principalDash} ${circumference}` }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total
          </span>
          <span className="text-base font-bold tabular-nums text-gray-800 dark:text-white">
            <AnimatedNumber value={total} prefix="$" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Principal
            </p>
            <p className="text-xs text-gray-500 tabular-nums dark:text-gray-400">
              ${formatMoney(principal, 0)} · {principalPct.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-orange-500 to-rose-500" />
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Interest
            </p>
            <p className="text-xs text-gray-500 tabular-nums dark:text-gray-400">
              ${formatMoney(interest, 0)} · {interestPct.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Balance / breakdown chart                                                 */
/* -------------------------------------------------------------------------- */

type ChartView = 'balance' | 'breakdown';

function AmortizationChart({
  schedule,
  view,
}: {
  schedule: AmortizationRow[];
  view: ChartView;
}) {
  const w = 720;
  const h = 260;
  const padding = { top: 16, right: 16, bottom: 28, left: 56 };
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const maxBalance = Math.max(...schedule.map((r) => r.balance), 1);
  const maxPayment = Math.max(...schedule.map((r) => r.payment), 1);

  const xAt = (i: number) =>
    padding.left + (i / Math.max(1, schedule.length - 1)) * innerW;

  const balancePath = useMemo(() => {
    if (schedule.length === 0) return '';
    return schedule
      .map((row, i) => {
        const x = xAt(i);
        const y = padding.top + innerH - (row.balance / maxBalance) * innerH;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule, view]);

  const balanceArea = useMemo(() => {
    if (schedule.length === 0) return '';
    const top = schedule
      .map((row, i) => {
        const x = xAt(i);
        const y = padding.top + innerH - (row.balance / maxBalance) * innerH;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
    const lastX = xAt(schedule.length - 1);
    const baseline = padding.top + innerH;
    return `${top} L ${lastX.toFixed(2)} ${baseline.toFixed(2)} L ${padding.left} ${baseline.toFixed(2)} Z`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule, view]);

  const yTicks = useMemo(() => {
    const max = view === 'balance' ? maxBalance : maxPayment;
    return [0, 0.25, 0.5, 0.75, 1].map((p) => ({
      pct: p,
      value: max * p,
      y: padding.top + innerH - p * innerH,
    }));
  }, [view, maxBalance, maxPayment, innerH, padding.top]);

  const months = schedule.length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/40">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-[260px] w-full min-w-[520px]"
        >
          <defs>
            <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a5af8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7a5af8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="balance-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {yTicks.map((t) => (
            <g key={t.pct}>
              <line
                x1={padding.left}
                x2={w - padding.right}
                y1={t.y}
                y2={t.y}
                stroke="currentColor"
                className="text-gray-200 dark:text-white/10"
                strokeDasharray="3 4"
              />
              <text
                x={padding.left - 8}
                y={t.y + 4}
                textAnchor="end"
                className="fill-gray-400 text-[10px] tabular-nums"
              >
                ${formatMoney(t.value, 0)}
              </text>
            </g>
          ))}

          {view === 'balance' && schedule.length > 0 ? (
            <>
              <motion.path
                d={balanceArea}
                fill="url(#balance-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.path
                d={balancePath}
                fill="none"
                stroke="url(#balance-stroke)"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </>
          ) : null}

          {view === 'breakdown' && schedule.length > 0
            ? schedule.map((row, i) => {
                const barW = Math.max(1.4, innerW / schedule.length - 1);
                const x = xAt(i) - barW / 2;
                const interestH = (row.interest / maxPayment) * innerH;
                const principalH = (row.principal / maxPayment) * innerH;
                const baseY = padding.top + innerH;
                return (
                  <g key={row.month}>
                    <motion.rect
                      x={x}
                      y={baseY - interestH}
                      width={barW}
                      height={interestH}
                      fill="#f97316"
                      initial={{ height: 0, y: baseY }}
                      animate={{ height: interestH, y: baseY - interestH }}
                      transition={{ duration: 0.4, delay: i * 0.002 }}
                      rx={1}
                    />
                    <motion.rect
                      x={x}
                      y={baseY - interestH - principalH}
                      width={barW}
                      height={principalH}
                      fill="#7a5af8"
                      initial={{ height: 0, y: baseY - interestH }}
                      animate={{
                        height: principalH,
                        y: baseY - interestH - principalH,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.002 }}
                      rx={1}
                    />
                  </g>
                );
              })
            : null}

          <line
            x1={padding.left}
            x2={w - padding.right}
            y1={padding.top + innerH}
            y2={padding.top + innerH}
            stroke="currentColor"
            className="text-gray-300 dark:text-white/20"
          />

          {[0, 0.25, 0.5, 0.75, 1].map((p) => {
            const month = Math.round(p * Math.max(1, months - 1)) + 1;
            const x = padding.left + p * innerW;
            return (
              <text
                key={p}
                x={x}
                y={h - 8}
                textAnchor="middle"
                className="fill-gray-400 text-[10px]"
              >
                M{month}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        {view === 'balance' ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
            Outstanding balance
          </span>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-full bg-indigo-500" />
              Principal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-full bg-orange-500" />
              Interest
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function StudentLoanCalculatorPro() {
  const [principal, setPrincipal] = useState(30000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [termMonths, setTermMonths] = useState(120);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [chartView, setChartView] = useState<ChartView>('balance');

  const baseline = useMemo(
    () => buildSchedule(principal, annualRate, termMonths, 0),
    [principal, annualRate, termMonths]
  );
  const result = useMemo(
    () => buildSchedule(principal, annualRate, termMonths, extraMonthly),
    [principal, annualRate, termMonths, extraMonthly]
  );

  const interestSaved = Math.max(0, baseline.totalInterest - result.totalInterest);
  const monthsSaved = Math.max(0, baseline.payoffMonths - result.payoffMonths);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Student Loan Calculator{' '}
            <span className="ml-2 align-middle rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
              Pro
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            EMI = [P × r × (1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> − 1] · live amortization
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPrincipal(30000);
            setAnnualRate(6.5);
            setTermMonths(120);
            setExtraMonthly(0);
          }}
          className="rounded-full border border-gray-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500/30 dark:hover:text-indigo-300 transition"
        >
          Reset
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        <SliderInput
          label="Loan Amount"
          value={principal}
          min={1000}
          max={300000}
          step={500}
          unit="$"
          accent="indigo"
          onChange={(v) => setPrincipal(Math.max(0, v))}
          presets={[
            { label: '$10k', value: 10000 },
            { label: '$30k', value: 30000 },
            { label: '$60k', value: 60000 },
            { label: '$100k', value: 100000 },
          ]}
        />
        <SliderInput
          label="Interest Rate (APR)"
          value={annualRate}
          min={0}
          max={20}
          step={0.05}
          unit="%"
          accent="rose"
          onChange={(v) => setAnnualRate(Math.max(0, v))}
          presets={[
            { label: '4%', value: 4 },
            { label: '6.5%', value: 6.5 },
            { label: '8%', value: 8 },
            { label: '12%', value: 12 },
          ]}
        />
        <SliderInput
          label="Repayment Term"
          value={termMonths}
          min={12}
          max={360}
          step={6}
          unit="months"
          accent="sky"
          onChange={(v) => setTermMonths(Math.max(1, Math.round(v)))}
          presets={[
            { label: '5 yr', value: 60 },
            { label: '10 yr', value: 120 },
            { label: '15 yr', value: 180 },
            { label: '20 yr', value: 240 },
          ]}
        />
        <SliderInput
          label="Extra Monthly Payment"
          value={extraMonthly}
          min={0}
          max={2000}
          step={25}
          unit="$"
          accent="emerald"
          hint="Optional: see how prepayment shrinks interest and time."
          onChange={(v) => setExtraMonthly(Math.max(0, v))}
          presets={[
            { label: '$0', value: 0 },
            { label: '$50', value: 50 },
            { label: '$150', value: 150 },
            { label: '$300', value: 300 },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Monthly Payment"
          value={result.monthlyPayment + extraMonthly}
          decimals={2}
          prefix="$"
          accent="indigo"
          caption={
            extraMonthly > 0
              ? `Scheduled $${formatMoney(result.monthlyPayment, 2)} + extra $${formatMoney(
                  extraMonthly,
                  2
                )}`
              : 'Includes both principal and interest'
          }
        />
        <MetricCard
          label="Total Interest"
          value={result.totalInterest}
          decimals={0}
          prefix="$"
          accent="rose"
          caption={`Across ${result.payoffMonths} month${result.payoffMonths === 1 ? '' : 's'}`}
        />
        <MetricCard
          label="Total Repaid"
          value={result.totalPayment}
          decimals={0}
          prefix="$"
          accent="amber"
          caption={`Principal $${formatMoney(principal, 0)} + interest`}
        />
        <MetricCard
          label={extraMonthly > 0 ? 'Interest Saved' : 'Effective Cost'}
          value={extraMonthly > 0 ? interestSaved : result.totalInterest / Math.max(1, principal) * 100}
          decimals={extraMonthly > 0 ? 0 : 2}
          prefix={extraMonthly > 0 ? '$' : ''}
          suffix={extraMonthly > 0 ? '' : '%'}
          accent="emerald"
          caption={
            extraMonthly > 0
              ? `${monthsSaved} month${monthsSaved === 1 ? '' : 's'} earlier payoff`
              : 'Total interest / principal'
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] xl:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Amortization over {result.payoffMonths} months
            </h3>
            <TabSwitch
              options={[
                { id: 'balance', label: 'Balance' },
                { id: 'breakdown', label: 'Principal vs interest' },
              ]}
              value={chartView}
              onChange={setChartView}
            />
          </div>
          <AmortizationChart schedule={result.schedule} view={chartView} />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/40">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Where each dollar goes
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Principal builds equity; interest is the cost of borrowing.
          </p>
          <div className="mt-4">
            <DonutChart
              principal={principal}
              interest={result.totalInterest}
            />
          </div>
        </div>
      </div>

      <ScheduleTable schedule={result.schedule} />

      <FormulaCard
        principal={principal}
        annualRate={annualRate}
        termMonths={termMonths}
        monthly={result.monthlyPayment}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Schedule table                                                            */
/* -------------------------------------------------------------------------- */

function ScheduleTable({ schedule }: { schedule: AmortizationRow[] }) {
  const [open, setOpen] = useState(false);
  const yearly = useMemo(() => {
    const grouped = new Map<
      number,
      { year: number; payment: number; interest: number; principal: number; balance: number }
    >();
    for (const row of schedule) {
      const year = Math.ceil(row.month / 12);
      const cur = grouped.get(year) ?? {
        year,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: row.balance,
      };
      cur.payment += row.payment;
      cur.interest += row.interest;
      cur.principal += row.principal;
      cur.balance = row.balance;
      grouped.set(year, cur);
    }
    return Array.from(grouped.values());
  }, [schedule]);

  if (schedule.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Annual amortization schedule
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {yearly.length} year{yearly.length === 1 ? '' : 's'} · expand to see year-by-year breakdown
          </p>
        </div>
        <span
          className={cn(
            'rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 transition',
            open && 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30'
          )}
        >
          {open ? 'Hide' : 'Show'}
        </span>
      </button>

      {open ? (
        <div className="overflow-x-auto border-t border-gray-200 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Year</th>
                <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Paid</th>
                <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                  Principal
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                  Interest
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {yearly.map((row) => (
                <tr key={row.year}>
                  <td className="px-4 py-2 tabular-nums">{row.year}</td>
                  <td className="px-4 py-2 tabular-nums">${formatMoney(row.payment, 0)}</td>
                  <td className="px-4 py-2 tabular-nums text-indigo-600 dark:text-indigo-300">
                    ${formatMoney(row.principal, 0)}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-orange-600 dark:text-orange-300">
                    ${formatMoney(row.interest, 0)}
                  </td>
                  <td className="px-4 py-2 tabular-nums">${formatMoney(row.balance, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Formula card                                                              */
/* -------------------------------------------------------------------------- */

function FormulaCard({
  principal,
  annualRate,
  termMonths,
  monthly,
}: {
  principal: number;
  annualRate: number;
  termMonths: number;
  monthly: number;
}) {
  const monthlyRate = annualRate / 100 / 12;
  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 dark:border-white/10 dark:from-indigo-500/10 dark:via-slate-900/0 dark:to-purple-500/10">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Formula breakdown
      </h3>
      <p className="mt-2 font-mono text-sm text-gray-700 dark:text-gray-200">
        EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> − 1]
      </p>
      <ul className="mt-3 grid gap-1 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
        <li>
          P (principal) = <span className="font-mono">${formatMoney(principal, 0)}</span>
        </li>
        <li>
          r (monthly rate) = <span className="font-mono">{(monthlyRate * 100).toFixed(4)}%</span>
        </li>
        <li>
          n (term) = <span className="font-mono">{termMonths} months</span>
        </li>
        <li>
          EMI ={' '}
          <span className="font-mono text-indigo-600 dark:text-indigo-300">
            ${formatMoney(monthly, 2)}
          </span>
        </li>
      </ul>
    </div>
  );
}
