export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f4f3ef] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-green-600" />

          <p className="text-sm font-medium text-gray-600">
            লোড হচ্ছে...
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}