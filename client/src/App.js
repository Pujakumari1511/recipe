import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecipeHeader } from "./components/RecipeHeader";
import { RecipeBody } from "./components/RecipeBody";
import { useState } from "react";

function App() {
  // LISTVIEW: for listing existing recipies,
  // DETAILSVIEW: for selected recipie,
  const [view, setView] = useState("LISTVIEW");
  return (
    <div className="App">
      <RecipeHeader />
      <RecipeBody view={view} setView={setView} />
    </div>
  );
}

export default App;
