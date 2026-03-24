type Props = {
  className?: string;
};

export default function Skeleton({ className = '' }: Props) {
  return <div className={`animate-pulse rounded-xl bg-gray-200/70 dark:bg-slate-700/60 ${className}`} />;
}
