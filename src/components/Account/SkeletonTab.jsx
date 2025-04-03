export const FullPageSkeleton = () => (
  <div className="p-4 space-y-8">
    <div className="h-12 bg-gray-100 rounded w-full"></div>
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-100 rounded"></div>
      ))}
    </div>
    <div className="h-64 bg-gray-100 rounded"></div>
  </div>
);

export const TabSkeleton = () => (
  <div className="p-4 space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
    ))}
  </div>
);
