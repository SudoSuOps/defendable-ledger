export default function Records() {
  return (
    <div className="container-pad space-y-8">
      <header>
        <div className="label mb-2">/records</div>
        <h1 className="text-3xl md:text-4xl font-semibold">Public records · books and records.</h1>
        <p className="mt-3 text-cream-200 max-w-2xl">
          Every Tribunal verdict, every Royal Jelly training pair, every DDEED — recorded
          here as the spine produces them. Each record carries its own hash, its parent
          chain link, and its provenance. Verify any record on{" "}
          <a href="/verify">/verify</a>.
        </p>
      </header>

      <section className="panel">
        <div className="label mb-3">status · v0.1</div>
        <p className="text-cream-200">
          The publication pipeline is wiring in. First public records arrive when the
          DefendableRouter spine + SwarmCurator + SwarmJelly start minting verdicts and
          tier-routed pairs into the local ledger and the batch publisher commits them
          here. Ring ring · to the shed.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel">
          <div className="text-gold-400 font-mono uppercase tracking-widest text-sm mb-2">
            Receipts
          </div>
          <p className="text-cream-200 text-sm">
            Issued by DefendableRouter on every intake. Hashed, manifest'd, ready for
            grading.
          </p>
          <div className="label mt-3">arriving v0.2</div>
        </div>
        <div className="panel">
          <div className="text-gold-400 font-mono uppercase tracking-widest text-sm mb-2">
            Verdicts
          </div>
          <p className="text-cream-200 text-sm">
            Issued by Tribunal · SwarmCurator-9B grades each receipt on the 4-dim rubric.
          </p>
          <div className="label mt-3">arriving v0.2</div>
        </div>
        <div className="panel">
          <div className="text-gold-400 font-mono uppercase tracking-widest text-sm mb-2">
            Training Pairs
          </div>
          <p className="text-cream-200 text-sm">
            Extracted by SwarmJelly · routed to Royal Jelly tier · in-house corpus
            compounds.
          </p>
          <div className="label mt-3">arriving v0.2</div>
        </div>
        <div className="panel">
          <div className="text-gold-400 font-mono uppercase tracking-widest text-sm mb-2">
            Deeds
          </div>
          <p className="text-cream-200 text-sm">
            Sealed records · append-only hash-chained · books-and-records of the eco
            system.
          </p>
          <div className="label mt-3">arriving v0.2</div>
        </div>
      </section>
    </div>
  );
}
