import Link from 'next/link';
import Image from 'next/image';
import type { University } from '@/lib/universities';

function getInitials(label: string) {
  const cleaned = label.replace(/[^a-z0-9 ]/gi, ' ').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function UniversityCard({ university }: { university: University }) {
  return (
    <article className="group relative overflow-hidden bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-[22px] shadow-[0px_30px_50px_-32px_rgba(107,110,148,0.04)] hover:shadow-[0px_40px_70px_-40px_rgba(79,70,229,0.22)] hover:border-primary-200 dark:hover:border-primary-500/30 transition flex flex-col">
      <div className="absolute inset-x-0 top-0 h-28">
        {university.featuredImage ? (
          <Image
            src={university.featuredImage}
            alt=""
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(122,90,248,0.18)_0%,rgba(34,197,94,0.10)_40%,transparent_70%)] dark:bg-[radial-gradient(120%_120%_at_20%_0%,rgba(122,90,248,0.22)_0%,rgba(34,197,94,0.10)_40%,transparent_70%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white dark:from-transparent dark:to-[rgba(16,24,40,0.65)]" />
      </div>

      <div className="relative p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="shrink-0 size-11 rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/85 dark:bg-white/5 flex items-center justify-center overflow-hidden">
              {university.logo ? (
                <Image
                  src={university.logo}
                  alt={`${university.short} logo`}
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
              ) : (
                <span className="font-extrabold text-gray-800 dark:text-white/90">
                  {getInitials(university.short)}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white/90 truncate">
                {university.short}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-6 line-clamp-2">
                {university.name}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-full border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-1 text-xs font-bold text-gray-700 dark:text-white/80">
            {university.scale.toFixed(1)} scale
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center justify-center size-6 rounded-full bg-gray-100 dark:bg-white/5">
            <span className="block size-2 rounded-full bg-primary-500" />
          </span>
          <span className="truncate">{university.location}</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            GPA • CGPA • Grading scale
          </div>

          <Link
            href={`/gpa-calculator/${university.slug}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-full bg-primary-500 hover:bg-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          >
            Open
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

