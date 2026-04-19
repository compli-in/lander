import { comparisonRows } from "@/data/comparison";

export function IndiaComparison() {
  return (
    <section className="bg-[color:var(--cream)] text-[#0b1220] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--warm)] font-semibold mb-4">
          Why India needs its own platform
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5">Built here, for here.</h2>
        <p className="text-slate-700 max-w-2xl mb-10 leading-relaxed">
          Vanta and Drata were built for US startups. The DPDP Act is not a checkbox you add on — it needs a platform that starts from Indian regulation and extends outward.
        </p>
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Compli versus competitors comparison</caption>
          <thead>
            <tr className="border-b border-slate-300">
              <th scope="col" className="py-3 font-semibold">Dimension</th>
              <th scope="col" className="py-3 font-semibold">Vanta or Drata</th>
              <th scope="col" className="py-3 font-semibold">Compli</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(r => (
              <tr key={r.dimension} className="border-b border-slate-200">
                <td className="py-4 font-medium">{r.dimension}</td>
                <td className="py-4 text-slate-600">{r.vanta}</td>
                <td className="py-4 text-[#0b1220] font-medium">{r.compli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
