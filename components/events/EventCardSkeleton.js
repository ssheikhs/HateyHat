export default function EventCardSkeleton() {
  return (
    <div className="ticket flex h-full flex-col overflow-hidden" aria-hidden="true">
      <div className="skeleton aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton h-4 w-2/5" />
      </div>
      <div className="ticket-perforation" />
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="skeleton h-12 w-12" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-3 w-12" />
        </div>
        <div className="skeleton h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
