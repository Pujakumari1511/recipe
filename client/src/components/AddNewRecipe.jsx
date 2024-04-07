export const AddNewRecipe = ({ setView }) => {
  const onSubmit = () => {
    setView("LISTVIEW");
  };
  return (
    <div className="container">
      <h2>Add new Recipe</h2>
      <button type="button" class="btn btn-primary" onClick={onSubmit}>
        Add
      </button>
    </div>
  );
};
