export function AgenticPreview() {
  return (
    <section className="bg-[color:var(--bg)] text-[color:var(--text)] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] border border-[#1e3a5f] px-3 py-1 rounded-full mb-4">Coming next</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Agentic remediation.</h2>
          <p className="text-[color:var(--text-dim)] max-w-2xl mx-auto">
            Agentic remediation drafts the fix as a pull request, mapped to the same control. Land audit-ready commits without hand-written Terraform hunts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-xl overflow-hidden border border-[color:var(--border)]">
          <aside className="md:col-span-2 bg-[color:var(--bg-card)] p-5 text-sm">
            <div className="text-[color:var(--text-muted)] text-xs mb-3">infra/</div>
            <ul className="space-y-1 font-mono text-xs text-[color:var(--text-dim)]">
              <li>main.tf</li>
              <li>iam.tf</li>
              <li className="text-[color:var(--accent)] bg-[#1e3a5f] px-2 py-1 rounded">s3.tf ●</li>
              <li>rds.tf</li>
            </ul>
          </aside>
          <div className="md:col-span-3 bg-[#0a1020] p-5 font-mono text-xs">
            <div className="text-[color:var(--text-muted)] mb-3">s3.tf · diff</div>
            <pre className="whitespace-pre text-[color:var(--text-dim)]">
{`resource "aws_s3_bucket" "exports" {
  bucket = "customer-exports"
`}<span className="text-[#fca5a5]">{`-  acl    = "public-read"`}</span>{`
`}<span className="text-[#86efac]">{`+  acl    = "private"`}</span>{`
}`}
            </pre>
            <button className="mt-4 bg-[color:var(--pass)] text-[#04221a] text-xs font-semibold px-3 py-1.5 rounded">Apply fix →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
