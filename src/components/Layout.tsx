import { Link, NavLink } from "react-router-dom";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/records", label: "Records" },
  { to: "/verify", label: "Verify" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-ink-600 bg-ink-900/95 backdrop-blur sticky top-0 z-10">
        <div className="container-pad flex items-center justify-between py-5">
          <Link to="/" className="no-underline">
            <div className="font-mono">
              <div className="text-cream-100 text-lg tracking-wide">
                Defendable<span className="text-gold-400">Ledger</span>
              </div>
              <div className="label">the cracked ledger</div>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `font-mono text-sm uppercase tracking-widest no-underline ${
                    isActive ? "text-gold-400" : "text-cream-300 hover:text-cream-100"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16">{children}</main>

      <footer className="border-t border-ink-600 mt-12">
        <div className="container-pad py-8 grid gap-4 md:grid-cols-3 text-sm text-cream-300 font-mono">
          <div>
            <div className="label mb-2">canonical</div>
            <div>defendableledger.com</div>
            <div>streetledger.eth · ENS legacy</div>
          </div>
          <div>
            <div className="label mb-2">eco system</div>
            <div>
              <a href="https://mrdefendable.com">mrdefendable.com</a> · FACE
            </div>
            <div>
              <a href="https://defendableos.com">defendableos.com</a> · SYSTEM
            </div>
            <div>
              <a href="https://defendablerouter.com">defendablerouter.com</a> · SPINE
            </div>
          </div>
          <div>
            <div className="label mb-2">doctrine</div>
            <div>Operator-grade.</div>
            <div>Books and records.</div>
            <div>To the shed.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
