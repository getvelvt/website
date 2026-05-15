import { Link } from "@tanstack/react-router";

const linkClass =
  "block transition-colors hover:text-foreground cursor-pointer";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1400px] flex-col gap-6 border-t border-border px-6 py-12 md:flex-row md:items-end md:justify-between">
      <div>
        <Link to="/" className="font-display text-3xl text-foreground hover:opacity-90">
          Velvt
        </Link>
        <p className="mt-2 max-w-md text-[13px] text-muted-foreground">
          A sealed observer for people who suspect they're not as focused as they think.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <div className="space-y-2">
          <div className="text-dim">product</div>
          <Link to="/spec" className={linkClass}>
            Spec
          </Link>
          <Link to="/changelog" className={linkClass}>
            Changelog
          </Link>
          <Link to="/roadmap" className={linkClass}>
            Roadmap
          </Link>
        </div>
        <div className="space-y-2">
          <div className="text-dim">privacy</div>
          <Link to="/local-first" className={linkClass}>
            Local-first
          </Link>
          <Link to="/audit" className={linkClass}>
            Audit
          </Link>
          <Link to="/source" className={linkClass}>
            Source
          </Link>
        </div>
        <div className="space-y-2">
          <div className="text-dim">company</div>
          <Link to="/about" className={linkClass}>
            About
          </Link>
          <Link to="/press" className={linkClass}>
            Press
          </Link>
          <Link to="/contact" className={linkClass}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
