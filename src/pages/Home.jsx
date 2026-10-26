import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchRecipes(skipCount = 0, query = "") {
    setLoading(true);
    setErrorMsg("");

    try {
      const url = query.trim()
        ? `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${encodeURIComponent(query.trim())}`
        : `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;

      const { data } = await axios.get(url);

      setRecipes((prev) =>
        skipCount === 0 ? data.recipes || [] : [...prev, ...(data.recipes || [])]
      );
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Recipe fetch error:", error);
      setErrorMsg("Unable to load recipes. Please try again.");

      if (skipCount === 0) {
        setRecipes([]);
        setTotal(0);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const query = searchParams.get("search")?.trim() || "";
    setSearchQuery(query);
    fetchRecipes(0, query);
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("query") || "").trim();

    setSearchQuery(query);
    setSearchParams(query ? { search: query } : {});
    fetchRecipes(0, query);
  }

  function clearSearch() {
    setSearchQuery("");
    setSearchParams({});
    fetchRecipes(0, "");
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient from-orange-100/70 via-background to-amber-50/60 dark:from-orange-950/20 dark:via-background dark:to-amber-950/10" />

        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-10">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-accent/20 bg-card/80 px-4 py-2 text-sm font-semibold text-accent shadow-sm backdrop-blur">
              Your daily dose of delicious
            </span>

            <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
              Cooking made
              <span className="block text-accent">
                simple &amp; delicious.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted sm:text-lg lg:mx-0">
              Discover mouthwatering recipes, explore world cuisines, and find
              inspiration for your next unforgettable meal.
            </p>

            <form
              onSubmit={handleSearch}
              className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-orange-900/5 transition-all focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 lg:mx-0"
            >
              <label htmlFor="home-recipe-search" className="sr-only">
                Search recipes
              </label>

              <svg
                className="ml-2 h-5 w-5 shrink-0 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                id="home-recipe-search"
                name="query"
                type="search"
                defaultValue={searchQuery}
                placeholder="Search pizza, pasta, sushi..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-text outline-none placeholder:text-muted sm:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 sm:px-6"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start">
              <span className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                Easy-to-follow recipes
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                Global cuisines
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-3 rounded-4xl bg-gradient from-orange-300/30 to-amber-200/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-4xl border border-white/50 bg-card p-2 shadow-2xl shadow-orange-950/10">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
                alt="Fresh colorful meal served with vegetables"
                className="h-56 w-full rounded-3xl object-cover sm:h-72 lg:h-80"
              />

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-700">
                  Made with love
                </p>
                <h2 className="mt-1 font-serif text-lg font-bold text-gray-900 sm:text-xl">
                  Something delicious awaits
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Find your next favorite dish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="recipes"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Find your inspiration
            </p>

            <h2 className="font-serif text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {searchQuery ? "Search Results" : "Explore Recipes"}
            </h2>

            <p className="mt-2 text-sm text-muted sm:text-base">
              {loading
                ? "Finding delicious recipes for you..."
                : searchQuery
                  ? `${total} recipes found for "${searchQuery}"`
                  : "Handpicked inspiration for your next delicious meal."}
            </p>
          </div>

          {!loading && recipes.length > 0 && (
            <span className="w-fit rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent">
              {recipes.length} shown
            </span>
          )}
        </div>

        {searchQuery && !loading && !errorMsg && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                recipes.length > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {recipes.length > 0 ? "✓" : "!"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-text">
                {recipes.length > 0 ? "Recipes found!" : "No recipes found"}
              </p>
              <p className="wrap-break-word text-sm text-muted">
                {recipes.length > 0
                  ? `${total} results for "${searchQuery}"`
                  : `We couldn't find "${searchQuery}". Try another keyword.`}
              </p>
            </div>

            <button
              type="button"
              onClick={clearSearch}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-accent transition hover:bg-accent/10"
            >
              Clear
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">{errorMsg}</p>
            <button
              onClick={() => fetchRecipes(0, searchQuery)}
              className="mt-4 rounded-xl bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-accent-hover"
            >
              Try Again
            </button>
          </div>
        )}

        {loading && recipes.length === 0 && !errorMsg && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-52 animate-pulse bg-accent/10" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-1/3 animate-pulse rounded-full bg-accent/10" />
                  <div className="h-6 w-3/4 animate-pulse rounded-full bg-accent/10" />
                  <div className="h-4 w-1/2 animate-pulse rounded-full bg-accent/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !errorMsg && recipes.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-card px-5 py-12 text-center sm:py-16">
            <h3 className="font-serif text-2xl font-bold text-text">
              No recipes found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-muted">
              {searchQuery
                ? `We couldn't find any recipes matching "${searchQuery}". Try another search.`
                : "Try searching for your favorite dish."}
            </p>

            <button
              onClick={clearSearch}
              className="mt-6 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
            >
              Explore All Recipes
            </button>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {recipes.length < total && recipes.length > 0 && !errorMsg && (
          <div className="mt-10 text-center">
            <button
              type="button"
              disabled={loading}
              onClick={() => fetchRecipes(recipes.length, searchQuery)}
              className="inline-flex items-center gap-3 rounded-xl border border-accent/30 bg-card px-8 py-3.5 font-semibold text-accent shadow-sm transition hover:-translate-y-1 hover:border-accent hover:bg-accent/5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading recipes..." : "Load More Recipes"}
              {!loading && <span aria-hidden="true">↓</span>}
            </button>

            <p className="mt-3 text-xs text-muted">
              Showing {recipes.length} of {total} recipes
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <h2 className="font-serif text-lg font-bold text-text">
              Good food brings people together.
            </h2>
            <p className="mt-1 text-sm text-muted">
              Find inspiration for your next home-cooked meal.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;