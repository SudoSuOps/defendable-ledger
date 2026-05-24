import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-pad">
      <div className="panel max-w-2xl">
        <div className="label mb-2">404</div>
        <h1 className="text-2xl font-semibold">No record at this path.</h1>
        <p className="mt-3 text-cream-200">
          The page you asked for is not in the ledger. Try the home page or paste a hash
          on /verify.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="btn">
            Home →
          </Link>
          <Link to="/verify" className="btn">
            Verify →
          </Link>
        </div>
      </div>
    </div>
  );
}
