import { useEffect, useState } from "react";
import { AccordionItem } from "./AccordionItem";

export const Recipes = ({ setView, setRecipeId }) => {
  const [recipes, setRecepies] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson && resJson.length > 0) {
          setRecepies(resJson);
        } else {
          setRecepies([]);
          setView(null);
        }
      });
  }, [setView]);

  const addNewRecipie = () => {
    setView(null);
  };

  /*   const moreDetails = (recipieId) => {
    setView("DETAILSVIEW");
    setRecipeId(recipieId);
  }; */

  return (
    <div className="container">
      <h2>List of Recipies</h2>
      <div>
        <div class="accordion" id="accordionContainer">
          {recipes.map((recipe, index) => (
            <AccordionItem
              item={recipe}
              setView={setView}
              setRecipeId={setRecipeId}
            />
          ))}
          {/* <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Aaloo dum
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>
                  Dum Aloo is a delicious recipe of baby potatoes cooked in a
                  gravy or sauce. This dish is made in various ways in Indian
                  Cuisine. In this post I am sharing 2 such popular variations
                  of dum aloo.
                </p>
                <button
                  className="btn btn-light"
                  onClick={() => moreDetails("Aaloo dum")}
                >
                  more details...
                </button>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Mater Paneer
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Matar Paneer is a filling, delicious and hearty vegetarian
                dinner with tons of North Indian flavors. It’s easy and perfect
                to make when you are in a mood to enjoy something restaurant
                style at home. Also known as Mutter Paneer, this is a rich,
                spicy, creamy and tasty paneer peas curry that your entire
                family will enjoy.
                <a onClick={() => moreDetails("Mater Paneer")}>
                  more details...
                </a>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Chole Bhature
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Chole Bhature also known as Chana Bhatura is one of the most
                popular Punjabi dish liked almost all over India. Chole stands
                for a spiced tangy chickpea curry and Bhatura is a soft and
                fluffy fried leavened bread. Chola Bhatura always make for a
                delicious and filling meal.
                <a onClick={() => moreDetails("Chole Bhature")}>
                  more details...
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <button type="button" class="btn btn-primary" onClick={addNewRecipie}>
        Add new recipie
      </button>
    </div>
  );
};
