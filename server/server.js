const express = require("express");
const path = require("path");
//const fs = require("fs");
const {
  saveNewRecipe,
  findTheRecipe,
  getAllRecipes,
} = require("./recipeSchema");

const app = express();
const port = process.env.PORT || 5000;

//const recipes = JSON.parse(fs.readFileSync("server/recipes.json"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client", "build")));

app.get("/", (req, res) => {
  console.log("Request URL:", req.url);
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.get("/recipes", (req, res) => {
  console.log("Request URL:", req.url);
  getAllRecipes()
    .then((recipes) => {
      // Send all recipes' data with status 200
      res.status(200).json(recipes);
    })
    .catch((error) => {
      // Handle errors during database interaction
      console.error("Error fetching recipes:", error);
      res.status(500).send("Internal server error");
    });
});

app.get("/recipe/:id", (req, res) => {
  console.log("Request URL:", req.url);
  const recipeId = req.params.id;
  findTheRecipe(recipeId).then((recipe) => {
    if (recipe) {
      // Recipe found, send data with status 200
      res.status(200).json(recipe);
    } else {
      // Recipe not found, send error with status 404
      res.status(404).send("Recipe not found");
    }
  });
});

app.post("/newrecipe", (req, res) => {
  console.log("Request URL:", req.url);
  saveNewRecipe(req.body)
    .then((recipe) => {
      console.log("new recipe saved successfully with id:", recipe._id);
      res.status(201).json(recipe);
    })
    .catch((error) => {
      console.log("failed to save new recipe", error);
      res.status(400).send("Error saving recipe");
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
