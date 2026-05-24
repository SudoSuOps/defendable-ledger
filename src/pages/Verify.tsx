import { useState } from "react";

async function sha256(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function canonicalize(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(sortKeys(parsed));
  } catch {
    return input;
  }
}

function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    return Object.keys(o)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys(o[k]);
        return acc;
      }, {});
  }
  return v;
}

export default function Verify() {
  const [input, setInput] = useState("");
  const [claimed, setClaimed] = useState("");
  const [rawHash, setRawHash] = useState("");
  const [canonHash, setCanonHash] = useState("");
  const [busy, setBusy] = useState(false);

  async function compute() {
    setBusy(true);
    try {
      const r = await sha256(input);
      const c = await sha256(canonicalize(input));
      setRawHash(r);
      setCanonHash(c);
    } finally {
      setBusy(false);
    }
  }

  const match =
    claimed.trim().length === 64 &&
    (claimed.trim().toLowerCase() === rawHash ||
      claimed.trim().toLowerCase() === canonHash);

  return (
    <div className="container-pad space-y-8">
      <header>
        <div className="label mb-2">/verify</div>
        <h1 className="text-3xl md:text-4xl font-semibold">Verify a receipt, deed, or pair.</h1>
        <p className="mt-3 text-cream-200 max-w-2xl">
          Paste raw text or a JSON record. Verification runs locally in your browser via
          WebCrypto SHA-256. Nothing is sent to a server. Two hashes are computed: the raw
          bytes and the canonical-JSON form (sorted keys, no whitespace) used by the spine.
        </p>
      </header>

      <section className="panel space-y-4">
        <div>
          <div className="label mb-2">Input · paste record JSON or raw text</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder='{"receipt_id":"DRR-...", "client_id":"mrdefendable.eth", ...}'
            className="w-full bg-ink-900 border border-ink-600 text-cream-100 font-mono text-sm p-3 rounded-sm focus:outline-none focus:border-gold-500"
          />
        </div>
        <div>
          <div className="label mb-2">Claimed hash (optional · 64 hex chars)</div>
          <input
            type="text"
            value={claimed}
            onChange={(e) => setClaimed(e.target.value)}
            placeholder="paste expected sha256 here"
            className="w-full bg-ink-900 border border-ink-600 text-cream-100 font-mono text-xs p-3 rounded-sm focus:outline-none focus:border-gold-500"
          />
        </div>
        <button
          onClick={compute}
          disabled={!input || busy}
          className="btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Hashing..." : "Compute SHA-256"}
        </button>
      </section>

      {(rawHash || canonHash) && (
        <section className="panel space-y-4">
          <div>
            <div className="label mb-2">Raw input SHA-256</div>
            <div className="hash">{rawHash}</div>
          </div>
          <div>
            <div className="label mb-2">Canonical JSON SHA-256 (sorted keys)</div>
            <div className="hash">{canonHash}</div>
          </div>
          {claimed.trim().length > 0 && (
            <div className={`label ${match ? "text-gold-400" : "text-red-400"}`}>
              {match ? "✓ MATCH · hash verified" : "✗ NO MATCH"}
            </div>
          )}
        </section>
      )}

      <section className="panel">
        <div className="label mb-2">how the spine hashes</div>
        <ol className="list-decimal list-inside space-y-1 text-cream-200 text-sm">
          <li>Receipt body serialized to JSON with keys sorted alphabetically · no whitespace · UTF-8.</li>
          <li>Volatile fields (`created_at`, `hashes`) stripped to produce the canonical body.</li>
          <li>SHA-256 of the canonical body → `canonical_receipt_sha256`.</li>
          <li>SHA-256 of the canonical body with the canonical hash inserted → `receipt_sha256`.</li>
          <li>Any verifier reproduces the same digest byte-for-byte. Tampering is detected.</li>
        </ol>
      </section>
    </div>
  );
}
