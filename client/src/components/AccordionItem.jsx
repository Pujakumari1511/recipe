export const AccordionItem = ({
  item,
  setView,
  setRecipeId,
  isOpen,
  toggleAccordion,
}) => {
  const moreDetails = (recipeId) => {
    setView("DETAILSVIEW");
    setRecipeId(recipeId);
  };

  return (
    <div class="accordion-item">
      <h2 class="accordion-header" onClick={toggleAccordion}>
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${item.id}`}
          aria-expanded={isOpen}
          aria-controls={`${item.id}`}
        >
          {item.title}
        </button>
      </h2>
      <div
        id={`${item.id}`}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        data-bs-parent="#accordionContainer"
      >
        <div class="accordion-body">
          <p>{item.shortDescription}</p>
          <button
            className="btn btn-light"
            onClick={() => moreDetails(item._id)}
          >
            more details...
          </button>
        </div>
      </div>
    </div>
  );
};
