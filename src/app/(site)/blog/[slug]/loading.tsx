import Skeleton from '@/components/Skeleton';

export default function LoadingBlogPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-20">
      <div className="wrapper relative mx-auto max-w-5xl">
        <div className="mb-8 flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-full" />
        </div>

        <header className="mb-10 space-y-4 border-b border-gray-200/80 pb-10 dark:border-white/10">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full max-w-3xl md:h-12" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </header>

        <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/60 md:p-10 lg:p-12">
          <div className="mx-auto max-w-[42rem] space-y-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      </div>
    </main>
  );
}
