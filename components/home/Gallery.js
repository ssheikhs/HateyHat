/* eslint-disable @next/next/no-img-element */
import { galleryPhotos, photos } from "@/lib/photos";

export default function Gallery() {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <h2 className="section-title">Volunteers across Bangladesh</h2>
        <p className="section-lead mt-3">
          From relief drives at Dhaka University to winter clothes in the north and cleanups on Saint Martin&apos;s Island,
          this is the work HateyHat helps organize.
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {galleryPhotos.map((photo) => (
          <li key={photo.src}>
            <figure className="group relative aspect-square overflow-hidden rounded-box bg-base-200">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-12 text-sm font-medium leading-snug text-white">
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <details className="mt-6 text-sm text-base-content/60">
        <summary className="cursor-pointer w-fit">Photo credits</summary>
        <p className="mt-2">Photos of community work across the site, used under their open licences.</p>
        <ul className="mt-2 space-y-1">
          {Object.values(photos).map((photo) => (
            <li key={photo.page}>
              <a href={photo.page} target="_blank" rel="noopener noreferrer" className="link link-hover">
                {photo.caption}
              </a>{" "}
              — {photo.credit}, {photo.license}, via Wikimedia Commons
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
