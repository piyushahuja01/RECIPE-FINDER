
import { Link } from "react-router";

function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-4xl border border-accent/20 bg-accent/10 text-6xl shadow-sm">
          🍽️
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-accent">
          Oops! Something went wrong
        </p>

        <h1 className="font-serif text-8xl font-extrabold tracking-tight text-accent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-3 font-serif text-2xl font-bold text-text sm:text-3xl">
          This page is off the menu!
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
          Looks like this recipe got lost in the kitchen. The page you're
          looking for doesn't exist or may have moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-900/10 transition duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v12h14V9" />
            </svg>
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-text transition duration-300 hover:border-accent/50 hover:bg-accent/5"
          >
            Go Back
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted">
          <span aria-hidden="true">🍳</span>
          <span>Let's find something delicious instead.</span>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
