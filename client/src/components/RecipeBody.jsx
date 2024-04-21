import { AddNewRecipe } from "./AddNewRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { Recipes } from "./Recipes";
import { useState } from "react";

export const RecipeBody = ({ view, setView }) => {
  const [recipeId, setRecipeId] = useState(null);

  if (view === "LISTVIEW") {
    return <Recipes setView={setView} setRecipeId={setRecipeId} />;
  } else if (view === "DETAILSVIEW" && recipeId != null) {
    return <RecipeDetails recipeId={recipeId} setView={setView} />;
  }
  return <AddNewRecipe setView={setView} />;
};
