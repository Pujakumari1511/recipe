import { useEffect, useState } from "react";
import { AccordionItem } from "./AccordionItem";

export const Recipes = ({ setView, setRecipeId }) => {
  const [recipes, setRecepies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openedItem, setOpenedItem] = useState(0);

  const toggleAccordion = (index) => {
    if (index === openedItem) {
      setIsOpen(!isOpen);
    } else if (!isOpen) {
      setIsOpen(true);
    }
    setOpenedItem(index);
  };

  useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((resJson) => {
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

  return (
    <div className="container">
      <h2>List of Recipies</h2>
      <button type="button" class="btn btn-primary" onClick={addNewRecipie}>
        Add new recipie
      </button>
      <div>
        <div class="accordion" id="accordionContainer">
          {recipes.map((recipe, index) => (
            <AccordionItem
              item={recipe}
              setView={setView}
              setRecipeId={setRecipeId}
              isOpen={isOpen && index === openedItem}
              toggleAccordion={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
