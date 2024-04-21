import { useState } from "react";

export const AddNewRecipe = ({ setView }) => {
  const [newRecipeData, setNewRecipeData] = useState({
    title: "",
    shortDescription: "",
    timeToPrepare: 0,
    ingredients: "",
    stepsToPrepare: "",
  });

  // SUCCESS, FAILED, null
  const [formSaved, setFormSaved] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setNewRecipeData((prevState) => ({ ...prevState, [id]: value }));
    setFormSaved(null);
  };

  const goBack = () => {
    setView("LISTVIEW");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipeData),
    };
    fetch("/newrecipe", requestOption)
      .then((res) => {
        if (res.ok) {
          setFormSaved("SUCCESS");
          setNewRecipeData({
            title: "",
            shortDescription: "",
            timeToPrepare: 0,
            ingredients: "",
            stepsToPrepare: "",
          });
        } else {
          setFormSaved("FAILED");
          console.log(
            `Failed adding recipe. status:${res.status} reason:${res.statusText}`
          );
        }
      })
      .catch((error) => {
        setFormSaved("FAILED");
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Add new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder=""
            value={newRecipeData.title}
            onChange={handleChange}
            required={true}
          />
          <label for="title">Recepie Title</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="shortDescription"
            placeholder=""
            value={newRecipeData.shortDescription}
            onChange={handleChange}
            required={true}
          />
          <label for="shortDescription">Short Description</label>
        </div>
        <div class="mb-3">
          <label for="timeToPrepare">
            Time To Prepare ({newRecipeData.timeToPrepare} in minutes)
          </label>
          <input
            type="range"
            class="form-range"
            id="timeToPrepare"
            min={0}
            max={120}
            step={5}
            value={newRecipeData.timeToPrepare}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div class="row align-items-start">
          <div class="col">
            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                placeholder=""
                id="ingredients"
                style={{ height: 100 }}
                value={newRecipeData.ingredients}
                onChange={handleChange}
                required={true}
              ></textarea>
              <label for="ingredients">Ingredients</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-3 col">
              <textarea
                class="form-control"
                placeholder=""
                id="stepsToPrepare"
                style={{ height: 100 }}
                value={newRecipeData.stepsToPrepare}
                onChange={handleChange}
                required={true}
              ></textarea>
              <label for="stepsToPrepare">Steps To Prepare</label>
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col">
            <button type="submit" value="submit" class="btn btn-primary">
              Add
            </button>
            {formSaved && (
              <span
                className={`badge rounded-pill ${
                  formSaved === "SUCCESS" ? "bg-success" : "bg-danger"
                }`}
              >
                {formSaved === "SUCCESS"
                  ? "Successfully saved recipe"
                  : "Failed to save recipe"}
              </span>
            )}
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" onClick={goBack}>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
