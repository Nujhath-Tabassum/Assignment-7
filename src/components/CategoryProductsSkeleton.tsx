export default function CategoryProductsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Sorting bar skeleton */}
      <div className="mb-4 flex h-13.75 items-center justify-end rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] px-4">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="ml-2 h-7 w-16 rounded-lg bg-gray-200" />
      </div>

      {/* Product count skeleton */}
      <div className="mb-4 h-4 w-40 rounded bg-gray-200" />

      {/* Product cards skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-h-28.5 rounded-[15px] border border-[#e7e5e1] bg-[#fdfcfb] p-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-3 w-1/3 rounded bg-gray-200" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="h-5 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}