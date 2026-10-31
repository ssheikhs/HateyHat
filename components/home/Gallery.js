/* eslint-disable @next/next/no-img-element */
const photos = [
  { id: "photo-1758599668429-121d54188b9c", caption: "Park cleanup, Saturday morning" },
  { id: "photo-1599059813005-11265ba4b4ce", caption: "Sorting the food bank shelves" },
  { id: "photo-1598335624134-5bceb5de202d", caption: "First sapling of the season" },
  { id: "photo-1593113598332-cd288d649433", caption: "Loading fresh produce for families" },
  { id: "photo-1783028104792-8506735c0383", caption: "Relief tent, ready by noon" },
  { id: "photo-1488521787991-ed7bbaae773c", caption: "After-school learning circle" },
  { id: "photo-1542601906990-b4d3fb778b09", caption: "Seedlings for the river bank" },
  { id: "photo-1582213782179-e0d53f98f2ca", caption: "Same team, next event" },
];

export default function Gallery() {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <h2 className="section-title">From past events</h2>
        <p className="section-lead mt-3">
          A few moments from cleanups, food drives and plantations organized by the community.
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {photos.map((photo) => (
          <li key={photo.id}>
            <figure className="group relative aspect-square overflow-hidden rounded-box bg-base-200">
              <img
                src={`https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=600&h=600&q=70`}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-sm font-medium text-white">
                {photo.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
