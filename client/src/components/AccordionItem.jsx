import { ThumbsDown, ThumbsUp, Comment } from "./svg/svg";

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
          <div class="row g-0">
            <div class="col-sm-6 col-md-8">{item.title}</div>
            <div class="col-6 col-md-4">
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <span class="badge text-bg-success">
                      <ThumbsUp count={item.likes} />
                    </span>
                  </div>
                  <div class="col">
                    <span class="badge text-bg-danger">
                      <ThumbsDown count={item.dislikes} />
                    </span>
                  </div>
                  <div class="col">
                    <span class="badge text-bg-info">
                      <Comment count={item.commentsCount} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
