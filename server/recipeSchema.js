const mongoose = require("mongoose");
require("./mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  timeToPrepare: { type: Number, required: true },
  ingredients: { type: String, required: true },
  stepsToPrepare: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  comments: [{ type: String }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

function saveNewRecipe(newRecipeRequest) {
  const newRecipe = new Recipe(newRecipeRequest);
  return newRecipe.save();
}

function findTheRecipe(recipeId) {
  return Recipe.findById(recipeId);
}

function getAllRecipes() {
  const pipeline = [
    {
      // Project desired fields (_id, title, shortDescription)
      $project: {
        _id: 1,
        title: 1,
        shortDescription: 1,
        likes: 1,
        dislikes: 1,
        commentsCount: { $size: "$comments" }, // Calculate comments count
      },
    },
  ];
  return Recipe.aggregate(pipeline);
}

module.exports = {
  saveNewRecipe,
  findTheRecipe,
  getAllRecipes,
};
