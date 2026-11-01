/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { LuMapPin, LuUsers } from "react-icons/lu";
import { dateParts, daysUntil } from "@/lib/format";
import { FALLBACK_IMAGE } from "@/lib/photos";
import { imageUrl } from "@/lib/imageUrl";

export { FALLBACK_IMAGE };

export default function EventCard({ event, footer }) {
  const { day, month, weekday, time } = dateParts(event.eventDate);

  return (
    <article className="ticket flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-base-200">
        <img
          src={imageUrl(event.thumbnail)}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
        <span className="badge badge-accent absolute left-4 top-4 border-0 font-semibold">{event.eventType}</span>
        <span className="badge absolute right-4 top-4 border-0 bg-base-100/90">{daysUntil(event.eventDate)}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-xl font-bold">{event.title}</h3>
        <p className="flex items-start gap-2 text-base-content/75">
          <LuMapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        {typeof event.participantsCount === "number" && (
          <p className="flex items-center gap-2 text-sm text-base-content/65">
            <LuUsers className="h-4 w-4 shrink-0" />
            {event.participantsCount === 0
              ? "Be the first to join"
              : `${event.participantsCount} ${event.participantsCount === 1 ? "volunteer" : "volunteers"} going`}
          </p>
        )}
      </div>

      <div className="ticket-perforation" />

      <div className="flex items-center gap-4 bg-base-200/60 px-5 py-4">
        <div className="text-center" aria-label={`${weekday} ${day} ${month}`}>
          <p className="date-stub-day text-4xl text-primary">{day}</p>
          <p className="text-sm font-semibold">{month}</p>
        </div>
        <div className="min-w-0 flex-1 text-sm text-base-content/70">
          <p className="font-semibold text-base-content">{weekday}</p>
          <p>{time}</p>
        </div>
        {footer ?? (
          <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm rounded-full px-4">
            View Event
          </Link>
        )}
      </div>
    </article>
  );
}
