import { useState, useEffect } from "react";
import { ThumbsDown, ThumbsUp } from "./svg/svg";

export const RecipeDetails = ({ recipeId, setView }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isDisabled, setdisabled] = useState(false);
  const [comment, setComment] = useState("");

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
  }, [recipeId, setView]);

  const backToListView = () => {
    setView("LISTVIEW");
  };

  const handleLikeDislike = (isLike) => {
    setdisabled(true);
    const requestBody = {
      isLike: isLike,
    };
    const requestOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    fetch(`/recipe/${recipeId}/like`, requestOption)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson) {
          setRecipeDetails(resJson);
        }
      });
    setdisabled(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const addComment = () => {
    setdisabled(true);
    if (comment != "") {
      const requestOption = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment }),
      };
      fetch(`/recipe/${recipeId}/comment`, requestOption)
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson) {
            setRecipeDetails(resJson);
            setComment("");
          }
        });
    }
    setdisabled(false);
  };

  return (
    <div className="container">
      {recipeDetails ? (
        <div class="row g-0">
          <div class="col-sm-6 col-md-8 border border-primary">
            <div class="row g-0">
              <div class="col-sm-6 col-md-8">
                <h2>{recipeDetails.title}</h2>
              </div>
              <div class="col-6 col-md-4">
                <button
                  type="button"
                  name="like"
                  class="btn btn-outline-success px-2"
                  onClick={() => handleLikeDislike(true)}
                  disabled={isDisabled}
                >
                  <ThumbsUp count={recipeDetails.likes} />
                </button>
                <button
                  type="button"
                  name="dislike"
                  class="btn btn-outline-danger px-2"
                  onClick={() => handleLikeDislike(false)}
                  disabled={isDisabled}
                >
                  <ThumbsDown count={recipeDetails.dislikes} />
                </button>
              </div>
            </div>
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
          <div class="col-6 col-md-4 border border-info">
            <h3>Comments ({recipeDetails.comments.length})</h3>
            <div class="container">
              <div class="row">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Add comment"
                    value={comment}
                    aria-label="Add comment"
                    aria-describedby="button-addon2"
                    onChange={handleChange}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={addComment}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="container">
                  {recipeDetails.comments.toReversed().map((comm) => (
                    <div class="row">
                      <div>{comm}</div>
                    </div>
                  ))}
                </div>
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
