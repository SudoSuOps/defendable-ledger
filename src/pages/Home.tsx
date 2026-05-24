import { Link } from "react-router-dom";

const doctrine = [
  ["Language", "becomes Assignment"],
  ["Assignment", "becomes Receipt"],
  ["Receipt", "becomes Verdict"],
  ["Verdict", "becomes Deed"],
  ["Deed", "becomes Books and Records"],
  ["Books and Records", "become Trust"],
];

const rails = [
  {
    name: "Receipt",
    issued_by: "DefendableRouter",
    desc: "Client meaning hashed into a canonical receipt object · the spine.",
  },
  {
    name: "Verdict",
    issued_by: "Tribunal · SwarmCurator-9B",
    desc: "Receipt graded on the 4-dimension rubric · accuracy · CRE judgment · format · score.",
  },
  {
    name: "Training Pair",
    issued_by: "SwarmJelly",
    desc: "Pair extracted from the receipt · routed to Royal Jelly tier · in-house corpus grows.",
  },
  {
    name: "Deed",
    issued_by: "DefendableLedger",
    desc: "Verdict + pair + receipt sealed into an append-only hash-chained record · books and records.",
  },
];

const tiers = [
  { name: "Apex", note: "highest signal · operator-grade ground truth" },
  { name: "Honey", note: "strong production-ready pairs" },
  { name: "Jelly", note: "solid corpus material" },
  { name: "Pollen", note: "broad coverage · breadth pairs" },
  { name: "Propolis", note: "edge cases · failure modes · repair lift" },
];

export default function Home() {
  return (
    <div className="container-pad space-y-16">
      <section>
        <div className="label mb-3">defendableledger.com</div>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          The cracked ledger of the{" "}
          <span className="text-gold-400">DefendableOS</span> ecosystem.
        </h1>
        <p className="mt-6 max-w-3xl text-cream-200 text-lg">
          Sovereign · in-house · hash-verifiable. Every Router receipt, every Tribunal
          verdict, every SwarmJelly training pair, every Deed — recorded here. No external
          chain. No hosted-LLM tax. The house owns the rail end to end.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/records" className="btn">
            View Records →
          </Link>
          <Link to="/verify" className="btn">
            Verify a Hash →
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="label mb-4">the doctrine</div>
        <div className="grid gap-2 font-mono text-sm md:text-base">
          {doctrine.map(([a, b], i) => (
            <div key={i} className="flex flex-wrap gap-2">
              <span className="text-gold-400">{a}</span>
              <span className="text-cream-300">{b}.</span>
            </div>
          ))}
        </div>
        <div className="label mt-6">The language lives in the blocks.</div>
      </section>

      <section>
        <div className="label mb-3">the rails</div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Four rails. One receipt. Every call.
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {rails.map((r) => (
            <div key={r.name} className="panel">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-gold-400 font-mono uppercase tracking-widest text-sm">
                  {r.name}
                </div>
                <div className="font-mono text-xs text-cream-300">{r.issued_by}</div>
              </div>
              <p className="text-cream-200">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="label mb-3">royal jelly tiers</div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Every pair has a tier. The corpus compounds.
        </h2>
        <div className="grid gap-3 md:grid-cols-5">
          {tiers.map((t) => (
            <div key={t.name} className="panel">
              <div className="text-gold-400 font-mono uppercase tracking-widest text-sm mb-2">
                {t.name}
              </div>
              <p className="text-cream-300 text-sm">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="label mb-3">status</div>
        <h3 className="text-xl font-semibold mb-2">v0.1 · cracked open</h3>
        <p className="text-cream-200">
          DefendableRouter spine is live. SwarmCurator-9B is on the fleet. SwarmJelly
          tiering and DefendableLedger publication are wiring in. First public records
          arriving shortly. Ring ring · to the shed.
        </p>
      </section>
    </div>
  );
}
