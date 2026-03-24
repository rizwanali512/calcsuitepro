import Skeleton from '@/components/Skeleton';

export default function LoadingCalculatorPage() {
  return (
    <div className="wrapper py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-2/5" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
