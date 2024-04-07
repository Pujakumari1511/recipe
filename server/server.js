const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

const recipes = JSON.parse(fs.readFileSync("server/recipes.json"));

app.use(express.static(path.join(__dirname, "../client", "build")));

app.get("/recipes", (req, res) => {
  console.log(req.url);
  const recipesHeader = recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    shortDescription: recipe.shortDescription,
  }));
  res.status(200).json(recipesHeader);
  recipesHeader;
});

app.get("/recipe/:id", (req, res) => {
  console.log(req.url);
  const recipeId = req.params.id;
  const recipe = recipes.find((item) => item.id === parseInt(recipeId));
  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).send("Recipe not found");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
