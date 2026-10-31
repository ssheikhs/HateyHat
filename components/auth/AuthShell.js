/* eslint-disable @next/next/no-img-element */
export default function AuthShell({ title, subtitle, children, image, caption }) {
  return (
    <section className="container-page grid items-stretch gap-10 py-10 md:py-16 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-md self-center">
        <h1 className="section-title">{title}</h1>
        <p className="section-lead mt-3">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
      <figure className="relative hidden overflow-hidden rounded-box lg:block">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <figcaption className="absolute inset-x-6 bottom-6 rounded-box bg-base-100/90 p-5 backdrop-blur">
          <p className="font-display text-xl font-bold">{caption.title}</p>
          <p className="mt-1 text-base-content/75">{caption.text}</p>
        </figcaption>
      </figure>
    </section>
  );
}
