import { useState } from "react";
import Gemini from "./GeminiRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "../ai";

export default function Form() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const ingredientItems = ingredients.map((ingredient) => (
    <li key={ingredient} className="list-items">
      {ingredient}
      <button
        onClick={() => removeIngredient(ingredient)}
        className="remove-btn"
        aria-label={`Remove ${ingredient} from ingredients list`}
      >
        <span>Remove</span>
      </button>
    </li>
  ));

  const addIngredient = (formData) => {
    const newIngredient = formData.get('ingredient')[0].toUpperCase() + formData.get('ingredient').trim().slice(1).toLowerCase();
    if (newIngredient && ingredients.includes(newIngredient)) {
      alert('Ingredient already added');
    } else {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
  }

  // Remove Ingredient function
  const removeIngredient = (removeIngredient) => {
    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient !== removeIngredient));
  }

  const [recipeShown, setRecipeShown] = useState(false);
  const displayRecipe = async (e) => {
    e.preventDefault();
    setRecipeShown(prevRecipeShown => !prevRecipeShown);
    setLoading(prevLoading => !prevLoading);

    try {
      const generatedRecipe = await getRecipeFromChefClaude(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setRecipe("Sorry, I'm unable to provide a recipe at the moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form action={addIngredient} className="ingredient-form">
        <input 
          type="text" 
          aria-label="Add ingredient" placeholder="e.g pepper"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>
      {ingredients.length > 0 ? 
        <IngredientsList 
          ingredients={ingredients} ingredientItems={ingredientItems} recipeShown={recipeShown} 
          displayRecipe={displayRecipe} removeIngredient={removeIngredient}
        /> : null }
      {ingredients.length > 0 && ingredients.length < 4 ? <p className="info-text">Add at least 4 ingredients to generate a recipe.</p> : null}

      {recipeShown ? <Gemini recipe={recipe} loading={loading} /> : null}
    </main>
  )
}