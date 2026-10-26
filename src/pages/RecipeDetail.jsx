
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchRecipe() {
      setLoading(true);
      setErrorMsg("");
      setRecipe(null);

      try {
        const { data } = await axios.get(
          `https://dummyjson.com/recipes/${id}`
        );

        if (!cancelled) {
          setRecipe(data);
        }
      } catch {
        if (!cancelled) {
          setErrorMsg("Could not load recipe details. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecipe();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-5 w-32 rounded bg-accent/10" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="h-72 rounded-3xl bg-accent/10 sm:h-96" />
            <div className="space-y-5 py-4">
              <div className="h-5 w-28 rounded bg-accent/10" />
              <div className="h-10 w-3/4 rounded bg-accent/10" />
              <div className="h-5 w-1/2 rounded bg-accent/10" />
              <div className="h-24 rounded-2xl bg-accent/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorMsg || !recipe) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12">
        <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-text">
            Recipe unavailable
          </h1>

          <p className="mt-3 text-muted">
            {errorMsg || "This recipe could not be found."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Link
          to="/"
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent/40 hover:text-accent"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Recipes
        </Link>

        <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-72 w-full rounded-2xl object-cover sm:h-105 lg:h-120"
            />
          </div>

          <div className="py-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Recipe Details
            </p>

            <h1 className="mt-3 font-serif text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
              {recipe.name}
            </h1>

            <p className="mt-4 leading-7 text-muted">
              Explore this {recipe.cuisine?.toLowerCase()} recipe and follow
              the instructions to prepare it at home.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
                <svg
                  className="h-5 w-5 fill-amber-400"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>

                <span className="font-bold text-text">
                  {recipe.rating}
                </span>

                <span className="text-sm text-muted">
                  ({recipe.reviewCount} reviews)
                </span>
              </div>

              <span className="rounded-xl bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
                {recipe.cuisine}
              </span>

              <span className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted">
                {recipe.difficulty}
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Prep time",
                  value: `${recipe.prepTimeMinutes} min`,
                },
                {
                  label: "Cook time",
                  value: `${recipe.cookTimeMinutes} min`,
                },
                {
                  label: "Servings",
                  value: recipe.servings,
                },
                {
                  label: "Calories",
                  value: `${recipe.caloriesPerServing} kcal`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
                >
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="mt-2 font-bold text-text">{item.value}</p>
                </div>
              ))}
            </div>

            {recipe.mealType?.length > 0 && (
              <div className="mt-6 rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-text">Meal Type</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.mealType.map((meal) => (
                    <span
                      key={meal}
                      className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
                    >
                      {meal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="h-fit rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Preparation
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-text sm:text-3xl">
              Ingredients
            </h2>

            <p className="mt-2 text-sm text-muted">
              Everything you need to prepare this recipe.
            </p>

            <ul className="mt-6 space-y-3">
              {recipe.ingredients?.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-border p-3.5 transition hover:border-accent/30"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm leading-6 text-text">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Cooking Guide
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-text sm:text-3xl">
              Instructions
            </h2>

            <p className="mt-2 text-sm text-muted">
              Follow each step to prepare your dish.
            </p>

            <div className="mt-6 space-y-4">
              {recipe.instructions?.map((step, index) => (
                <div
                  key={`${index}-${step}`}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-accent/30 hover:shadow-sm sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-text">
                      Step {index + 1}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 rounded-3xl bg-gradient from-accent to-orange-400 px-6 py-8 text-center text-white shadow-lg sm:px-10">
          <h2 className="font-serif text-2xl font-bold">
            Ready to start cooking?
          </h2>

          <p className="mt-2 text-sm text-white/90">
            Gather your ingredients and enjoy preparing your meal.
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-accent transition hover:-translate-y-0.5 hover:bg-orange-50"
          >
            Explore More Recipes
          </Link>
        </div>
      </div>
    </main>
  );
}
