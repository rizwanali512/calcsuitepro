'use client';

import { useMemo, useState } from 'react';
import type { University } from '@/lib/universities';
import { cn } from '@/lib/utils';
import { DownloadIcon, PdfIcon, PrintIcon, ShareIcon } from '@/icons/icons';

type TabId = 'gpa' | 'cgpa' | 'grading';

type SubjectRow = {
  id: string;
  name: string;
  credits: number | '';
  grade: string;
};

type SemesterRow = {
  id: string;
  name: string;
  credits: number | '';
  gpa: number | '';
};

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function clampNumber(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function format2(n: number) {
  if (!Number.isFinite(n)) return '0.00';
  return n.toFixed(2);
}

function gradeLabelFromGpa(gpa: number, scale: number) {
  if (!Number.isFinite(gpa) || scale <= 0) return '—';
  const ratio = gpa / scale;
  if (ratio >= 0.925) return 'Excellent';
  if (ratio >= 0.825) return 'Very Good';
  if (ratio >= 0.75) return 'Good';
  if (ratio >= 0.65) return 'Satisfactory';
  if (ratio >= 0.5) return 'Pass';
  return 'Fail';
}

function percentageFromGpa(gpa: number, scale: number) {
  if (!Number.isFinite(gpa) || scale <= 0) return 0;
  return clampNumber((gpa / scale) * 100, 0, 100);
}

function divisionLabelFromPercentage(pct: number) {
  if (!Number.isFinite(pct)) return '—';
  if (pct >= 85) return 'Distinction';
  if (pct >= 70) return 'First Division';
  if (pct >= 60) return 'Second Division';
  if (pct >= 50) return 'Third Division';
  return 'Fail';
}

function openPrintWindow(title: string, htmlBody: string) {
  const w = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
  if (!w) return;
  w.document.open();
  w.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; padding: 24px; }
      h1 { font-size: 18px; margin: 0 0 4px; }
      p { margin: 0 0 10px; color: #4b5563; }
      table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      th, td { border: 1px solid #e5e7eb; padding: 10px; font-size: 12px; text-align: left; }
      th { background: #f9fafb; }
      .kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
      .kpi { border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; }
      .kpi .label { font-size: 11px; color: #6b7280; }
      .kpi .value { font-size: 16px; font-weight: 700; margin-top: 4px; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>${htmlBody}</body>
</html>`);
  w.document.close();
  w.focus();
  w.print();
  w.close();
}

export function UniversityCalculatorClient({ university }: { university: University }) {
  const [activeTab, setActiveTab] = useState<TabId>('gpa');

  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { id: uid('sub'), name: 'Subject 1', credits: 3, grade: university.grading[0]?.grade ?? 'A' },
    { id: uid('sub'), name: 'Subject 2', credits: 3, grade: university.grading[2]?.grade ?? 'B+' },
  ]);

  const [semesters, setSemesters] = useState<SemesterRow[]>([
    { id: uid('sem'), name: 'Semester 1', credits: 18, gpa: 3.2 },
    { id: uid('sem'), name: 'Semester 2', credits: 18, gpa: 3.5 },
  ]);

  const gradePointByGrade = useMemo(() => {
    const m = new Map<string, number>();
    for (const g of university.grading) m.set(g.grade, g.point);
    return m;
  }, [university.grading]);

  const gpaResult = useMemo(() => {
    let totalCredits = 0;
    let totalQualityPoints = 0;
    const rows = subjects.map((s) => {
      const credits = typeof s.credits === 'number' ? s.credits : 0;
      const point = gradePointByGrade.get(s.grade) ?? 0;
      totalCredits += credits;
      totalQualityPoints += credits * point;
      return { ...s, point, qualityPoints: credits * point };
    });
    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    return { gpa, totalCredits, totalQualityPoints, rows };
  }, [subjects, gradePointByGrade]);

  const cgpaResult = useMemo(() => {
    let totalCredits = 0;
    let totalWeightedGpa = 0;
    const rows = semesters.map((s) => {
      const credits = typeof s.credits === 'number' ? s.credits : 0;
      const gpa = typeof s.gpa === 'number' ? s.gpa : 0;
      totalCredits += credits;
      totalWeightedGpa += credits * gpa;
      return { ...s, weighted: credits * gpa };
    });
    const cgpa = totalCredits > 0 ? totalWeightedGpa / totalCredits : 0;
    return { cgpa, totalCredits, totalWeightedGpa, rows };
  }, [semesters]);

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'gpa', label: 'GPA Calculator' },
    { id: 'cgpa', label: 'CGPA Calculator' },
    { id: 'grading', label: 'Grading Scale' },
  ];

  const TabIcon = ({ id }: { id: TabId }) => {
    if (id === 'gpa')
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 19V5M4 19H20M7 16l4-5 3 3 4-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    if (id === 'cgpa')
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 19V5M4 19H20M7 14h2M11 10h2M15 12h2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const tabBtn = (isActive: boolean) =>
    cn(
      'flex items-center justify-center gap-2 h-12 px-4 text-sm font-semibold transition rounded-2xl w-full',
      isActive
        ? 'text-white bg-[linear-gradient(97deg,#7a5af8_0%,#22c55e_100%)] shadow-theme-sm'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white/90'
    );

  const cardCss = `
    :root { color-scheme: light; }
    body { margin: 0; padding: 24px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background: #f8fafc; display:flex; justify-content:center; }
    .card-wrap { width: 100%; max-width: 860px; }
    .card {
      background: radial-gradient(1200px 600px at 50% -10%, rgba(99,102,241,0.14), transparent 55%),
                  radial-gradient(900px 520px at 20% 0%, rgba(6,182,212,0.12), transparent 55%),
                  linear-gradient(180deg, #f8fbff 0%, #f1f7ff 100%);
      border: 1px solid rgba(148,163,184,0.35);
      border-radius: 28px;
      padding: 28px;
      margin: 0 auto;
    }
    .title { text-align: center; font-weight: 800; font-size: 16px; color: #0f172a; }
    .subtitle { text-align: center; margin-top: 6px; font-size: 12px; color: #64748b; }
    .divider { height: 1px; background: rgba(148,163,184,0.25); margin: 18px 0 22px; }
    .center { display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .ring { width: 140px; height: 140px; position: relative; }
    .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .ring .inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .ring .value { font-size: 34px; line-height: 1; font-weight: 900; color: #0f172a; }
    .ring .unit { margin-top: 4px; font-size: 11px; font-weight: 700; letter-spacing: .08em; color: #64748b; }
    .badge { display:inline-flex; align-items:center; justify-content:center; padding: 7px 12px; border-radius: 999px; background: rgba(250,204,21,0.2); color:#a16207; font-weight: 800; font-size: 11px; }
    .stats { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 14px; width: 100%; max-width: 520px; }
    .stat { text-align:center; }
    .stat .v { font-weight: 900; font-size: 16px; color: #0f172a; }
    .stat .l { margin-top: 2px; font-size: 11px; color:#64748b; }
    table { width:100%; border-collapse: separate; border-spacing: 0; margin-top: 18px; font-size: 11px; color:#0f172a; }
    thead th { background: rgba(148,163,184,0.18); color:#334155; text-transform: uppercase; letter-spacing: .06em; font-size: 10px; padding: 10px 10px; text-align:left; }
    tbody td { padding: 10px 10px; border-top: 1px solid rgba(148,163,184,0.22); }
    tbody tr:last-child td { border-top: 2px solid rgba(148,163,184,0.22); font-weight: 800; }
    .footer { display:flex; justify-content:space-between; gap: 12px; margin-top: 18px; font-size: 11px; color:#94a3b8; }
    @media (max-width: 520px) { body { padding: 12px; } .card { padding: 18px; border-radius: 22px; } .stats { gap: 10px; } }
    @media print { body { padding: 0; background: white; } .card { border: 0; } }
  `;

  const escapeHtml = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  const buildRingSvg = (gradId: string, pct: number) => {
    const circumference = 2 * Math.PI * 46;
    const dash = (pct / 100) * circumference;
    return `
<svg viewBox="0 0 120 120" aria-hidden="true">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="46" stroke="rgba(148,163,184,0.35)" stroke-width="10" fill="transparent"></circle>
  <circle cx="60" cy="60" r="46" stroke="url(#${gradId})" stroke-width="10" fill="transparent" stroke-linecap="round"
    stroke-dasharray="${dash} ${circumference}"></circle>
</svg>`;
  };

  const buildGpaCardMarkup = () => {
    const pct = percentageFromGpa(gpaResult.gpa, university.scale);
    const division = divisionLabelFromPercentage(pct);
    const now = new Date();
    const subtitle = `${university.name} • ${now.toLocaleString()}`;
    const courses = gpaResult.rows.length;

    const rows = gpaResult.rows
      .map(
        (r, i) => `
<tr>
  <td>${escapeHtml(`${i + 1}. ${r.name || 'Subject'}`)}</td>
  <td>${typeof r.credits === 'number' ? r.credits : 0}</td>
  <td>${escapeHtml(r.grade)}</td>
  <td>${format2(r.point)}</td>
  <td><strong>${format2(r.qualityPoints)}</strong></td>
</tr>`
      )
      .join('');

    return `
<div class="card">
  <div class="title">GPA Result Card</div>
  <div class="subtitle">${escapeHtml(subtitle)}</div>
  <div class="divider"></div>

  <div class="center">
    <div class="ring">
      ${buildRingSvg('gpaGradExport', pct)}
      <div class="inner">
        <div class="value">${format2(gpaResult.gpa)}</div>
        <div class="unit">GPA</div>
      </div>
    </div>

    <div style="margin-top: 18px;">
      <span class="badge">${escapeHtml(
        `${gradeLabelFromGpa(gpaResult.gpa, university.scale)} - ${division}`
      )}</span>
    </div>

    <div class="stats">
      <div class="stat"><div class="v">${pct.toFixed(1)}%</div><div class="l">Percentage</div></div>
      <div class="stat"><div class="v">${gpaResult.totalCredits}</div><div class="l">Credit Hours</div></div>
      <div class="stat"><div class="v">${courses}</div><div class="l">Courses</div></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Subject</th>
        <th>CH</th>
        <th>Grade</th>
        <th>GP</th>
        <th>QP</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr>
        <td>Total</td>
        <td>${gpaResult.totalCredits}</td>
        <td></td>
        <td></td>
        <td>${format2(gpaResult.totalQualityPoints)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <div>Generated by ${escapeHtml(
      `${university.short} GPA & CGPA Calculator | Accurate & Simple`
    )}</div>
    <div>${escapeHtml(now.toLocaleDateString())}</div>
  </div>
</div>`;
  };

  const buildCgpaCardMarkup = () => {
    const pct = percentageFromGpa(cgpaResult.cgpa, university.scale);
    const division = divisionLabelFromPercentage(pct);
    const now = new Date();
    const subtitle = `${university.name} • ${now.toLocaleString()}`;

    const rows = cgpaResult.rows
      .map(
        (r, i) => `
<tr>
  <td>${escapeHtml(`${i + 1}. ${r.name || 'Semester'}`)}</td>
  <td>${typeof r.credits === 'number' ? r.credits : 0}</td>
  <td>${typeof r.gpa === 'number' ? format2(r.gpa) : '0.00'}</td>
  <td><strong>${format2(r.weighted)}</strong></td>
</tr>`
      )
      .join('');

    return `
<div class="card">
  <div class="title">CGPA Result Card</div>
  <div class="subtitle">${escapeHtml(subtitle)}</div>
  <div class="divider"></div>

  <div class="center">
    <div class="ring">
      ${buildRingSvg('cgpaGradExport', pct)}
      <div class="inner">
        <div class="value">${format2(cgpaResult.cgpa)}</div>
        <div class="unit">CGPA</div>
      </div>
    </div>

    <div style="margin-top: 18px;">
      <span class="badge">${escapeHtml(
        `${gradeLabelFromGpa(cgpaResult.cgpa, university.scale)} - ${division}`
      )}</span>
    </div>

    <div class="stats">
      <div class="stat"><div class="v">${pct.toFixed(1)}%</div><div class="l">Percentage</div></div>
      <div class="stat"><div class="v">${cgpaResult.totalCredits}</div><div class="l">Credit Hours</div></div>
      <div class="stat"><div class="v">${cgpaResult.rows.length}</div><div class="l">Semesters</div></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Semester</th>
        <th>Credits</th>
        <th>GPA</th>
        <th>Weighted</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr>
        <td>Total</td>
        <td>${cgpaResult.totalCredits}</td>
        <td></td>
        <td>${format2(cgpaResult.totalWeightedGpa)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <div>Generated by ${escapeHtml(
      `${university.short} GPA & CGPA Calculator | Accurate & Simple`
    )}</div>
    <div>${escapeHtml(now.toLocaleDateString())}</div>
  </div>
</div>`;
  };

  const printMarkup = (title: string, markup: string) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(
      title
    )}</title><style>${cardCss}</style></head><body><div class="card-wrap">${markup}</div></body></html>`;

    // Prefer iframe printing to avoid popup blockers.
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const cleanup = () => {
      try {
        iframe.remove();
      } catch {
        // ignore
      }
    };

    const doc = iframe.contentWindow?.document;
    if (!doc || !iframe.contentWindow) {
      cleanup();
      // fallback to popup flow if iframe fails for any reason
      openPrintWindow(title, `<style>${cardCss}</style><div class="card-wrap">${markup}</div>`);
      return;
    }

    doc.open();
    doc.write(html);
    doc.close();

    const doPrint = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        // Give print dialog a moment before cleanup.
        window.setTimeout(cleanup, 1000);
      }
    };

    // Ensure resources/styles are applied before printing.
    iframe.onload = () => window.setTimeout(doPrint, 50);
    // Some browsers won't fire onload for about:blank+doc.write; run a fallback timer.
    window.setTimeout(doPrint, 250);
  };

  const downloadMarkupHtml = (filename: string, markup: string) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(
      filename
    )}</title><style>${cardCss}</style></head><body><div class="card-wrap">${markup}</div></body></html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const sharePage = async (title: string) => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // fall through
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  const printGpa = () => {
    printMarkup(`${university.short} GPA Result`, buildGpaCardMarkup());
  };

  const printCgpa = () => {
    printMarkup(`${university.short} CGPA Result`, buildCgpaCardMarkup());
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 p-1">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={tabBtn(activeTab === tab.id)}
            >
              <TabIcon id={tab.id} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === 'gpa' ? 'GPA' : tab.id === 'cgpa' ? 'CGPA' : 'Scale'}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'gpa' && (
        <div className="mt-8 grid lg:grid-cols-[1fr_420px] gap-6">
          <section className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  GPA Calculator
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-6">
                  GPA = total(credit × gradePoint) / total credits
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSubjects((prev) => [
                    ...prev,
                    { id: uid('sub'), name: `Subject ${prev.length + 1}`, credits: 3, grade: university.grading[0]?.grade ?? 'A' },
                  ])
                }
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
              >
                Add Subject
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 dark:text-gray-400">
                    <th className="pb-3 font-semibold">Subject</th>
                    <th className="pb-3 font-semibold">Credit hours</th>
                    <th className="pb-3 font-semibold">Grade</th>
                    <th className="pb-3 font-semibold">Grade point</th>
                    <th className="pb-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="align-top">
                  {subjects.map((row, idx) => {
                    const point = gradePointByGrade.get(row.grade) ?? 0;
                    return (
                      <tr key={row.id} className="border-t border-gray-200 dark:border-white/10">
                        <td className="py-3 pr-4">
                          <input
                            value={row.name}
                            onChange={(e) =>
                              setSubjects((prev) =>
                                prev.map((s) => (s.id === row.id ? { ...s, name: e.target.value } : s))
                              )
                            }
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                            placeholder={`Subject ${idx + 1}`}
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <input
                            inputMode="numeric"
                            value={row.credits}
                            onChange={(e) => {
                              const v = e.target.value;
                              const num = v === '' ? '' : clampNumber(Number(v), 0, 30);
                              setSubjects((prev) =>
                                prev.map((s) => (s.id === row.id ? { ...s, credits: Number.isFinite(num as number) ? (num as number) : '' } : s))
                              );
                            }}
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                            placeholder="e.g. 3"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <select
                            value={row.grade}
                            onChange={(e) =>
                              setSubjects((prev) =>
                                prev.map((s) => (s.id === row.id ? { ...s, grade: e.target.value } : s))
                              )
                            }
                            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                          >
                            {university.grading.map((g) => (
                              <option key={g.grade} value={g.grade}>
                                {g.grade}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-white/90">
                          {format2(point)}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSubjects((prev) => prev.filter((s) => s.id !== row.id))}
                            className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                            aria-label="Remove subject"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="h-fit">
            {(() => {
              const pct = percentageFromGpa(gpaResult.gpa, university.scale);
              const division = divisionLabelFromPercentage(pct);
              const circumference = 2 * Math.PI * 46;
              const dash = (pct / 100) * circumference;
              const now = new Date();
              const subtitle = `${university.name} • ${now.toLocaleString()}`;
              const courses = gpaResult.rows.length;

              return (
                <>
                  <div
                    className="rounded-[28px] border border-gray-200/70 dark:border-white/10 p-7 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_520px_at_20%_0%,rgba(6,182,212,0.14),transparent_55%),linear-gradient(180deg,#f8fbff_0%,#f1f7ff_100%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_520px_at_20%_0%,rgba(6,182,212,0.14),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.04)_100%)]"
                  >
                    <div className="text-center">
                      <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                        GPA Result Card
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
                    </div>

                    <div className="h-px bg-gray-200/60 dark:bg-white/10 my-5" />

                    <div className="flex flex-col items-center">
                      <div className="relative w-[132px] h-[132px]">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                          <defs>
                            <linearGradient id="gpaGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4f46e5" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="60"
                            cy="60"
                            r="46"
                            stroke="rgba(148,163,184,0.35)"
                            strokeWidth="10"
                            fill="transparent"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="46"
                            stroke="url(#gpaGrad)"
                            strokeWidth="10"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${dash} ${circumference}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-[34px] leading-none font-extrabold text-gray-900 dark:text-white/90">
                            {format2(gpaResult.gpa)}
                          </div>
                          <div className="mt-1 text-[11px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                            GPA
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-300/30 dark:bg-amber-300/20 text-amber-700 dark:text-amber-200 text-xs font-bold">
                        {gradeLabelFromGpa(gpaResult.gpa, university.scale)} - {division}
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {pct.toFixed(1)}%
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Percentage</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {gpaResult.totalCredits}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Credit Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {courses}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Courses</div>
                        </div>
                      </div>

                      <div className="mt-6 w-full overflow-x-auto rounded-2xl border border-gray-200/60 dark:border-white/10">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-left text-gray-600 dark:text-gray-300 bg-gray-200/40 dark:bg-white/5">
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">Subject</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">CH</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">Grade</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">GP</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">QP</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gpaResult.rows.map((r, i) => (
                              <tr key={r.id} className="border-t border-gray-200/60 dark:border-white/10">
                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white/90">
                                  {i + 1}. {r.name || 'Subject'}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-white/80">
                                  {typeof r.credits === 'number' ? r.credits : 0}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-white/80">{r.grade}</td>
                                <td className="px-4 py-3 text-gray-700 dark:text-white/80">{format2(r.point)}</td>
                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-white/90">
                                  {format2(r.qualityPoints)}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-gray-200/70 dark:border-white/10">
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                Total
                              </td>
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                {gpaResult.totalCredits}
                              </td>
                              <td className="px-4 py-3" />
                              <td className="px-4 py-3" />
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                {format2(gpaResult.totalQualityPoints)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-5 w-full flex items-center justify-between gap-3 text-[11px] text-gray-400 dark:text-gray-500">
                        <div>
                          Generated by {university.short} GPA &amp; CGPA Calculator | Accurate &amp; Simple
                        </div>
                        <div>{now.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        downloadMarkupHtml(`${university.slug}-gpa-result-card.html`, buildGpaCardMarkup())
                      }
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#8b5cf6_0%,#6366f1_45%,#4f46e5_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      Download Result Card
                    </button>
                    <button
                      type="button"
                      onClick={printGpa}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#34d399_0%,#10b981_45%,#059669_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <PrintIcon className="w-4 h-4" />
                      Print Result
                    </button>
                    <button
                      type="button"
                      onClick={printGpa}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#fb7185_0%,#f43f5e_45%,#e11d48_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <PdfIcon className="w-4 h-4" />
                      Save as PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => sharePage(`${university.short} GPA Result`)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white/90 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                    >
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </>
              );
            })()}
          </aside>
        </div>
      )}

      {activeTab === 'cgpa' && (
        <div className="mt-8 grid lg:grid-cols-[1fr_420px] gap-6">
          <section className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  CGPA Calculator
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-6">
                  CGPA = total(semester GPA × semester credits) / total credits
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSemesters((prev) => [
                    ...prev,
                    { id: uid('sem'), name: `Semester ${prev.length + 1}`, credits: 18, gpa: 3.0 },
                  ])
                }
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-full bg-primary-500 hover:bg-primary-600 transition"
              >
                Add Semester
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white/90">How CGPA works</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-7">
                  CGPA is a <span className="font-semibold text-gray-800 dark:text-white/90">credit-weighted</span>{' '}
                  average. A semester with more credits has more impact on the final CGPA.
                </p>
                <div className="mt-3 font-mono text-xs text-gray-800 dark:text-white/80">
                  CGPA = Σ(GPA × credits) / Σ(credits)
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Live summary</div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Total credits</div>
                    <div className="mt-1 text-base font-extrabold text-gray-900 dark:text-white/90">
                      {cgpaResult.totalCredits}
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">Weighted sum</div>
                    <div className="mt-1 text-base font-extrabold text-gray-900 dark:text-white/90">
                      {format2(cgpaResult.totalWeightedGpa)}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-6">
                  Use <span className="font-semibold text-gray-800 dark:text-white/90">semester credits</span> (not
                  course count) for the most accurate CGPA.
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 dark:text-gray-400">
                    <th className="pb-3 font-semibold">Semester</th>
                    <th className="pb-3 font-semibold">Credits</th>
                    <th className="pb-3 font-semibold">Semester GPA</th>
                    <th className="pb-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="align-top">
                  {semesters.map((row, idx) => (
                    <tr key={row.id} className="border-t border-gray-200 dark:border-white/10">
                      <td className="py-3 pr-4">
                        <input
                          value={row.name}
                          onChange={(e) =>
                            setSemesters((prev) =>
                              prev.map((s) => (s.id === row.id ? { ...s, name: e.target.value } : s))
                            )
                          }
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                          placeholder={`Semester ${idx + 1}`}
                        />
                      </td>
                      <td className="py-3 pr-4">
                        <input
                          inputMode="numeric"
                          value={row.credits}
                          onChange={(e) => {
                            const v = e.target.value;
                            const num = v === '' ? '' : clampNumber(Number(v), 0, 60);
                            setSemesters((prev) =>
                              prev.map((s) => (s.id === row.id ? { ...s, credits: Number.isFinite(num as number) ? (num as number) : '' } : s))
                            );
                          }}
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                          placeholder="e.g. 18"
                        />
                      </td>
                      <td className="py-3 pr-4">
                        <input
                          inputMode="decimal"
                          value={row.gpa}
                          onChange={(e) => {
                            const v = e.target.value;
                            const num = v === '' ? '' : clampNumber(Number(v), 0, university.scale);
                            setSemesters((prev) =>
                              prev.map((s) => (s.id === row.id ? { ...s, gpa: Number.isFinite(num as number) ? (num as number) : '' } : s))
                            );
                          }}
                          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent px-3 py-2 text-gray-800 dark:text-white/90 placeholder:text-gray-400 outline-none focus:border-primary-300 dark:focus:border-primary-500/40"
                          placeholder={`0.0 - ${university.scale.toFixed(1)}`}
                        />
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSemesters((prev) => prev.filter((s) => s.id !== row.id))}
                          className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                          aria-label="Remove semester"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="h-fit">
            {(() => {
              const pct = percentageFromGpa(cgpaResult.cgpa, university.scale);
              const division = divisionLabelFromPercentage(pct);
              const circumference = 2 * Math.PI * 46;
              const dash = (pct / 100) * circumference;
              const now = new Date();
              const subtitle = `${university.name} • ${now.toLocaleString()}`;

              return (
                <>
                  <div
                    className="rounded-[28px] border border-gray-200/70 dark:border-white/10 p-7 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_520px_at_20%_0%,rgba(6,182,212,0.14),transparent_55%),linear-gradient(180deg,#f8fbff_0%,#f1f7ff_100%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_520px_at_20%_0%,rgba(6,182,212,0.14),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.04)_100%)]"
                  >
                    <div className="text-center">
                      <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                        CGPA Result Card
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
                    </div>

                    <div className="h-px bg-gray-200/60 dark:bg-white/10 my-5" />

                    <div className="flex flex-col items-center">
                      <div className="relative w-[132px] h-[132px]">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                          <defs>
                            <linearGradient id="cgpaGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4f46e5" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="60"
                            cy="60"
                            r="46"
                            stroke="rgba(148,163,184,0.35)"
                            strokeWidth="10"
                            fill="transparent"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="46"
                            stroke="url(#cgpaGrad)"
                            strokeWidth="10"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${dash} ${circumference}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-[34px] leading-none font-extrabold text-gray-900 dark:text-white/90">
                            {format2(cgpaResult.cgpa)}
                          </div>
                          <div className="mt-1 text-[11px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                            CGPA
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-300/30 dark:bg-amber-300/20 text-amber-700 dark:text-amber-200 text-xs font-bold">
                        {gradeLabelFromGpa(cgpaResult.cgpa, university.scale)} - {division}
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {pct.toFixed(1)}%
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Percentage</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {cgpaResult.totalCredits}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Credit Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-extrabold text-gray-900 dark:text-white/90">
                            {cgpaResult.rows.length}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">Semesters</div>
                        </div>
                      </div>

                      <div className="mt-6 w-full overflow-x-auto rounded-2xl border border-gray-200/60 dark:border-white/10">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-left text-gray-600 dark:text-gray-300 bg-gray-200/40 dark:bg-white/5">
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">Semester</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">Credits</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">GPA</th>
                              <th className="px-4 py-3 font-bold uppercase tracking-wider">Weighted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cgpaResult.rows.map((r, i) => (
                              <tr key={r.id} className="border-t border-gray-200/60 dark:border-white/10">
                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white/90">
                                  {i + 1}. {r.name || 'Semester'}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-white/80">
                                  {typeof r.credits === 'number' ? r.credits : 0}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-white/80">
                                  {typeof r.gpa === 'number' ? format2(r.gpa) : '0.00'}
                                </td>
                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-white/90">
                                  {format2(r.weighted)}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-gray-200/70 dark:border-white/10">
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                Total
                              </td>
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                {cgpaResult.totalCredits}
                              </td>
                              <td className="px-4 py-3" />
                              <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white/90">
                                {format2(cgpaResult.totalWeightedGpa)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-5 w-full flex items-center justify-between gap-3 text-[11px] text-gray-400 dark:text-gray-500">
                        <div>
                          Generated by {university.short} GPA &amp; CGPA Calculator | Accurate &amp; Simple
                        </div>
                        <div>{now.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        downloadMarkupHtml(`${university.slug}-cgpa-result-card.html`, buildCgpaCardMarkup())
                      }
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#8b5cf6_0%,#6366f1_45%,#4f46e5_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      Download Result Card
                    </button>
                    <button
                      type="button"
                      onClick={printCgpa}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#34d399_0%,#10b981_45%,#059669_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <PrintIcon className="w-4 h-4" />
                      Print Result
                    </button>
                    <button
                      type="button"
                      onClick={printCgpa}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-[radial-gradient(120%_120%_at_10%_20%,#fb7185_0%,#f43f5e_45%,#e11d48_100%)] shadow-theme-sm hover:opacity-95 transition"
                    >
                      <PdfIcon className="w-4 h-4" />
                      Save as PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => sharePage(`${university.short} CGPA Result`)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white/90 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-primary-300 dark:hover:border-primary-500/40 transition"
                    >
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </>
              );
            })()}
          </aside>
        </div>
      )}

      {activeTab === 'grading' && (
        <section className="mt-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">Grading Scale</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-6">
            Grades and grade points used for calculations on this page.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
            <table className="min-w-[420px] w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-3 font-semibold">Grade</th>
                  <th className="px-4 py-3 font-semibold">Point</th>
                </tr>
              </thead>
              <tbody>
                {university.grading.map((g) => (
                  <tr key={g.grade} className="border-t border-gray-200 dark:border-white/10">
                    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white/90">{g.grade}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-white/80">{format2(g.point)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

