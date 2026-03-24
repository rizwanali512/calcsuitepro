import Skeleton from '@/components/Skeleton';

export default function LoadingCategoryPage() {
  return (
    <div className="wrapper py-14 md:py-28">
      <div className="max-w-3xl mb-10 space-y-3">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-28 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
