export default function PageHeader({ title, lead, children }) {
  return (
    <section className="border-b border-base-300 bg-base-200">
      <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="section-title">{title}</h1>
          {lead && <p className="section-lead mt-3">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
