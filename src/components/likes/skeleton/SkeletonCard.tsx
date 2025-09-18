export default function SkeletonCard() {
  return (
    <div className="flex items-center py-4">
      <div className="mr-3 h-14 w-14 animate-pulse rounded-lg bg-gray-700"></div>
      <div className="flex flex-grow flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse bg-gray-700"></div>
        <div className="h-3.5 w-2/5 animate-pulse bg-gray-700"></div>
      </div>
    </div>
  );
}
