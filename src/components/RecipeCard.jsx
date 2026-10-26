
import { Link } from "react-router";
import React from "react";

function RecipeCard({ recipe }) {
  const {
    id,
    prepTimeMinutes,
    cookTimeMinutes,
    image,
    name,
    cuisine,
    difficulty,
    rating,
  } = recipe;

  const totalTime = prepTimeMinutes + cookTimeMinutes;

  const difficultyStyles = {
    Easy: "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    Hard: "bg-rose-100 text-rose-700",
  };

  return (
    <Link
      to={`/recipe/${id}`}
      className="group relative flex h-full flex-col overflow-hidden
        rounded-2xl border border-border bg-card
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:border-accent/50
        hover:shadow-xl focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-accent
        focus-visible:ring-offset-2"
    >

      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-
          from-black/50 via-transparent to-black/10" />

        <span className="absolute left-3 top-3 rounded-full
          bg-white/95 px-3 py-1 text-xs font-semibold
          text-gray-800 shadow-sm backdrop-blur">
          {cuisine}
        </span>

        <span className="absolute bottom-3 right-3 flex
          items-center gap-1 rounded-full bg-white/95
          px-2.5 py-1.5 text-sm font-bold text-gray-900 shadow">
          <svg
            className="h-4 w-4 fill-amber-400"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {Number(rating).toFixed(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase
            tracking-[0.15em] text-muted">
            {cuisine} cuisine
          </span>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1
              text-xs font-semibold
              ${difficultyStyles[difficulty] ??
                "bg-gray-100 text-gray-700"}`}
          >
            {difficulty}
          </span>
        </div>

        <h3 className="mb-4 line-clamp-2 font-serif text-xl
          font-bold leading-snug text-text transition-colors
          group-hover:text-accent">
          {name}
        </h3>

        <div className="mt-auto flex items-center justify-between
          border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <span className="flex h-9 w-9 items-center
              justify-center rounded-full bg-accent/10
              text-accent">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span>
              <span className="block font-bold text-text">
                {totalTime} min
              </span>
              <span className="text-xs">Total time</span>
            </span>
          </div>

          <span className="flex items-center gap-1 font-semibold
            text-accent transition-transform duration-300
            group-hover:translate-x-1">
            View recipe
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
