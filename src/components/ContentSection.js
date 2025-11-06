import { useDispatch, useSelector } from "react-redux";
import { openModal } from "features/recipes/recipesSlice";

import LoadingSpinner from "components/LoadingSpinner";

export default function ContentSection() {
  const dispatch = useDispatch();

  const { recipe, loading } = useSelector((state) => state.user);
  const { nb_part, steps, ingredients, title, image } = recipe || {};

  if (loading || !recipe) return <LoadingSpinner />;

  return (
    <div className="relative isolate overflow-hidden p-6 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {/* Title + Description */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-400">
                Recette pour {nb_part} personne
                {nb_part > 1 ? "s" : ""}
              </p>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                {title}
              </h1>

              <p className="mt-6 text-xl/8 text-gray-500">
                {ingredients.length} ingrédients · {steps.length} étape
                {steps.length > 1 && "s"}
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="-mt-12 -ml-12 p-6 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden text-center">
          <img
            alt={title}
            src={image || "https://placehold.co/600x400?text=No+Image"}
            className="w-[250px] rounded-xl sm:w-228 m-auto"
          />
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition mt-4"
            onClick={() => dispatch(openModal({ steps, ingredients, title }))}
          >
            Visualiser la recette
          </button>
        </div>

        {/* INGREDIENTS + STEPS */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-500 lg:max-w-lg">
              {/* Ingredients */}
              <h2 className="text-2xl font-bold tracking-tight">
                Ingrédients
              </h2>
              <ul className="mt-6 space-y-3 list-disc list-inside">
                {ingredients.map((ing, idx) => (
                  <li key={idx} className="text-gray-500">
                    {ing}
                  </li>
                ))}
              </ul>

              {/* Steps */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight">
                Étapes de préparation
              </h2>
              <ol className="mt-6 space-y-4 list-decimal list-inside">
                {steps.map((step, idx) => (
                  <li key={idx} className="text-gray-500">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
