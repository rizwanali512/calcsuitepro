import Link from 'next/link';
import type { University } from '@/lib/universities';

function pctFromGpa(gpa: number, scale: number) {
  if (!Number.isFinite(gpa) || !Number.isFinite(scale) || scale <= 0) return 0;
  return Math.max(0, Math.min(100, (gpa / scale) * 100));
}

export function getUniversityFaq(university: University): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I calculate GPA in ${university.short}?`,
      a: `Add subjects with credit hours and letter grades. The calculator converts grades to points using ${university.short}'s grading scale and computes GPA as total(credit × gradePoint) / total credits.`,
    },
    {
      q: `How do I calculate CGPA for ${university.name}?`,
      a: `Enter each semester’s GPA and total credits. CGPA is computed as total(semester GPA × semester credits) / total credits.`,
    },
    {
      q: `Is the percentage accurate?`,
      a: `The percentage shown is an approximation derived from your GPA relative to the ${university.scale.toFixed(
        1
      )} scale. Universities may use different official mappings for percentage.`,
    },
    {
      q: `Can I download or print my result?`,
      a: `Yes. Use Download Result Card, Print Result, or Save as PDF to export the same result card design.`,
    },
  ];
}

export function UniversitySeoContent({
  university,
  otherUniversities,
}: {
  university: University;
  otherUniversities: University[];
}) {
  const sample = [
    { gpa: 3.9, label: 'Excellent', pct: pctFromGpa(3.9, university.scale) },
    { gpa: 3.4, label: 'Very Good', pct: pctFromGpa(3.4, university.scale) },
    { gpa: 2.7, label: 'Satisfactory', pct: pctFromGpa(2.7, university.scale) },
  ];

  const faqs = getUniversityFaq(university);

  return (
    <section className="mt-12" aria-label="GPA and CGPA guide">
      <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-7">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white/90">
          {university.name} GPA &amp; CGPA Guide
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
          This page includes a GPA calculator, a CGPA calculator for multiple semesters, and the grading scale used for{' '}
          {university.short}. Use it to quickly estimate your performance, track progress, and export result cards.
        </p>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white/90">How GPA is calculated</h3>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              GPA is a weighted average based on credit hours. Subjects with more credit hours contribute more to your
              final GPA.
            </p>
            <div className="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-4">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Formula</div>
              <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white/90">
                GPA = Σ(credit × gradePoint) / Σ(credits)
              </div>
            </div>
            <ol className="mt-4 list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-7">
              <li>Add your subjects.</li>
              <li>Enter credit hours.</li>
              <li>Select letter grades.</li>
              <li>Review GPA, percentage, and the result table.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white/90">How CGPA is calculated</h3>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              CGPA combines semester performance using a credit-weighted average. This prevents low-credit semesters
              from affecting CGPA disproportionately.
            </p>
            <div className="mt-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-4">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Formula</div>
              <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white/90">
                CGPA = Σ(semesterGPA × semesterCredits) / Σ(semesterCredits)
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-7">
              <li>
                <span className="font-semibold text-gray-800 dark:text-white/90">Tip:</span> Use total semester credits
                (not number of courses) for accurate weighting.
              </li>
              <li>
                <span className="font-semibold text-gray-800 dark:text-white/90">Export:</span> Print or save your CGPA
                result card as a PDF for submissions.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white/90">Grading scale</h3>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              These grade points are used on this page for {university.short}. If your department uses a different scale,
              update the data source accordingly.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5">
                    <th className="px-4 py-3 font-semibold">Grade</th>
                    <th className="px-4 py-3 font-semibold">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {university.grading.map((g) => (
                    <tr key={g.grade} className="border-t border-gray-200 dark:border-white/10">
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white/90">{g.grade}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-white/80">{g.point.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white/90">Quick examples</h3>
            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Approximate percentage on a {university.scale.toFixed(1)} scale:
            </p>
            <ul className="mt-4 space-y-3">
              {sample.map((s) => (
                <li
                  key={s.gpa}
                  className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 dark:text-white/90">{s.gpa.toFixed(2)} GPA</div>
                    <div className="text-xs font-bold text-gray-600 dark:text-gray-300">{s.pct.toFixed(1)}%</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white/90">Explore more universities</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {otherUniversities.slice(0, 12).map((u) => (
                  <Link
                    key={u.slug}
                    href={`/gpa-calculator/${u.slug}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white/90 bg-white dark:bg-white/5 hover:border-primary-200 dark:hover:border-primary-500/30 transition"
                  >
                    {u.short}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white/90">FAQ</h3>
          <div className="mt-4 space-y-4">
            {faqs.map((f) => (
              <div key={f.q}>
                <h4 className="font-semibold text-gray-900 dark:text-white/90">{f.q}</h4>
                <p className="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

