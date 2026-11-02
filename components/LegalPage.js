export default function LegalPage({ title, updated, children }) {
  return (
    <article className="container-page max-w-3xl py-14">
      <h1 className="section-title">{title}</h1>
      <p className="mt-2 text-sm text-base-content/60">Last updated {updated}</p>
      <div className="mt-8 space-y-6 text-base-content/85 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </article>
  );
}
