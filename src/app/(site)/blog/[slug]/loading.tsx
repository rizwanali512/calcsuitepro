import Skeleton from '@/components/Skeleton';

export default function LoadingBlogPage() {
  return (
    <main className="wrapper py-14 md:py-24">
      <article className="mx-auto max-w-5xl">
        <header className="mb-8 text-center space-y-4">
          <Skeleton className="h-5 w-48 mx-auto" />
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </header>
        <div className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </article>
    </main>
  );
}
