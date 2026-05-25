import { useEffect, useState } from "react";

type IndexEntry = {
  record_id: string;
  natural_id?: string;
  record_type: "RECEIPT" | "VERDICT" | "PAIR" | "DEED" | "GENESIS";
  ledger_seq: number;
  created_at: string;
  issued_by: string;
  host: string;
  record_sha256: string;
  parent_hash: string;
  payload_hash: string;
  path: string;
};

const TYPE_BADGE: Record<string, string> = {
  RECEIPT: "text-cream-100 bg-ink-700 border-cream-300",
  VERDICT: "text-gold-400 bg-ink-700 border-gold-500",
  PAIR: "text-cream-100 bg-ink-700 border-cream-300",
  DEED: "text-gold-400 bg-ink-700 border-gold-500",
  GENESIS: "text-cream-300 bg-ink-700 border-cream-300",
};

function shortHash(h: string): string {
  if (!h || h.length < 12) return h || "";
  return `${h.slice(0, 8)}…${h.slice(-4)}`;
}

export default function Records() {
  const [entries, setEntries] = useState<IndexEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    fetch("/records/index.json")
      .then((r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return r.json();
      })
      .then((data: IndexEntry[]) => {
        const sorted = [...data].sort((a, b) => b.ledger_seq - a.ledger_seq);
        setEntries(sorted);
      })
      .catch((err) => setError(String(err)));
  }, []);

  const filtered =
    entries && filter !== "ALL"
      ? entries.filter((e) => e.record_type === filter)
      : entries;

  const counts: Record<string, number> = { ALL: entries?.length ?? 0 };
  for (const e of entries ?? []) {
    counts[e.record_type] = (counts[e.record_type] ?? 0) + 1;
  }

  return (
    <div className="container-pad space-y-8">
      <header>
        <div className="label mb-2">/records</div>
        <h1 className="text-3xl md:text-4xl font-semibold">Public records · books and records.</h1>
        <p className="mt-3 text-cream-200 max-w-2xl">
          Every Tribunal verdict, every Royal Jelly training pair, every DDEED — recorded
          here as the DefendableRouter spine mints them on smash. Each record carries its
          own hash, its parent chain link, and its provenance. Verify any record on{" "}
          <a href="/verify">/verify</a>.
        </p>
      </header>

      {entries === null && !error && (
        <section className="panel">
          <div className="label">loading…</div>
        </section>
      )}

      {error && (
        <section className="panel">
          <div className="label mb-2 text-red-400">unable to load records/index.json</div>
          <p className="text-cream-200 text-sm">
            The publisher hasn't committed any records yet, or the static asset isn't yet
            built. Status: <span className="hash">{error}</span>
          </p>
        </section>
      )}

      {entries !== null && entries.length === 0 && !error && (
        <section className="panel">
          <div className="label mb-2">status · v0.1</div>
          <p className="text-cream-200">
            The publication pipeline is wired but no records have been published yet.
            First public records arrive when{" "}
            <code className="font-mono text-gold-400">defendablerouter ledger publish</code>{" "}
            runs against this repo. Ring ring · to the shed.
          </p>
        </section>
      )}

      {entries && entries.length > 0 && (
        <>
          <section className="panel">
            <div className="label mb-3">filter</div>
            <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
              {(["ALL", "RECEIPT", "VERDICT", "PAIR", "DEED", "GENESIS"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 border ${
                    filter === t
                      ? "bg-ink-700 text-gold-400 border-gold-500"
                      : "bg-ink-900 text-cream-300 border-ink-600 hover:border-cream-300"
                  }`}
                >
                  {t} {counts[t] !== undefined ? `· ${counts[t]}` : ""}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            {(filtered ?? []).map((e) => (
              <a
                key={e.record_id}
                href={`/${e.path}`}
                className="panel block no-underline hover:border-gold-500 transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest px-2 py-0.5 border ${
                        TYPE_BADGE[e.record_type] ?? TYPE_BADGE.RECEIPT
                      }`}
                    >
                      {e.record_type}
                    </span>
                    <span className="font-mono text-sm text-cream-100">
                      {e.natural_id || e.record_id}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-cream-300">
                    seq {e.ledger_seq} · {e.created_at}
                  </span>
                </div>
                <div className="mt-3 grid gap-1 font-mono text-xs text-cream-300">
                  <div>
                    record sha256: <span className="text-cream-100">{shortHash(e.record_sha256)}</span>
                  </div>
                  <div>
                    payload sha256: <span className="text-cream-100">{shortHash(e.payload_hash)}</span>
                  </div>
                  <div>
                    parent: <span className="text-cream-100">{shortHash(e.parent_hash)}</span>
                  </div>
                  <div>
                    issued by: <span className="text-cream-100">{e.issued_by}</span> · host:{" "}
                    <span className="text-cream-100">{e.host}</span>
                  </div>
                </div>
              </a>
            ))}
          </section>
        </>
      )}

      <section className="panel">
        <div className="label mb-3">about the chain</div>
        <p className="text-cream-200 text-sm">
          Records published here mirror the canonical hash-chained ledger on the
          DefendableRouter spine. Each record's <code className="text-gold-400">parent_hash</code>{" "}
          links to the prior <code className="text-gold-400">record_sha256</code>. Walking
          the chain detects tampering at the exact seq it occurred. Append-only · in-house ·
          sovereign. The cracked ledger compounds.
        </p>
      </section>
    </div>
  );
}
