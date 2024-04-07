import { useState, useEffect } from "react";

export const RecipeDetails = ({ recipeId, setView }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    //console.log(`fetching recipe ${recipeId}`);
    fetch(`/recipe/${recipeId}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson) {
          setRecipeDetails(resJson);
        } else {
          setView("LISTVIEW");
        }
      });
  }, [recipeId]);

  const backToListView = () => {
    setView("LISTVIEW");
  };

  return (
    <div className="container">
      {recipeDetails ? (
        <div>
          <h2>{recipeDetails.title}</h2>
          <div class="container text-center">
            <div class="row">
              <div class="col-4">Description</div>
              <div class="col-8">
                <p>{recipeDetails.shortDescription}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">Time to prepare (in minutes)</div>
              <div class="col-8">
                <p>{recipeDetails.timeToPrepare}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">Ingredients</div>
              <div class="col-8">
                <p>{recipeDetails.ingredients}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">Steps To Prepare</div>
              <div class="col-8">
                <p>{recipeDetails.stepsToPrepare}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <button type="button" class="btn btn-primary" onClick={backToListView}>
        Back
      </button>
    </div>
  );
};
