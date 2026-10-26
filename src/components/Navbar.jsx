
import React, { useState } from "react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const isHome = location.pathname === "/";

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    window.location.href = `/?search=${encodeURIComponent(query)}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border
      bg-card/90 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center
        justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-11 w-11 items-center
            justify-center rounded-2xl bg-accent text-white
            shadow-md transition-transform duration-300
            group-hover:rotate-6 group-hover:scale-105"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 3v7" />
              <path d="M3.5 3v4a2.5 2.5 0 0 0 5 0V3" />
              <path d="M6 10v11" />
              <path d="M16 3c-2 2-3 4.5-3 8h3v10" />
              <path d="M16 3v8" />
            </svg>
          </span>

          <span className="font-serif text-xl font-bold
            tracking-tight text-text sm:text-2xl">
            Recipe<span className="text-accent">Finder</span>
          </span>
        </Link>

        
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            to="/"
            aria-current={isHome ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm
              font-semibold transition-all duration-200
              ${
                isHome
                  ? "bg-accent/10 text-accent"
                  : "text-text hover:bg-accent/10 hover:text-accent"
              }`}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 10 9-7 9 7" />
                <path d="M5 9v12h14V9" />
                <path d="M9 21v-7h6v7" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </span>
          </Link>

          <Link
            to="/"
            className="hidden rounded-full bg-accent px-4 py-2
              text-sm font-semibold text-white shadow-sm
              transition-all duration-200 hover:-translate-y-0.5
              hover:shadow-md sm:inline-flex"
          >
            Explore Recipes
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
