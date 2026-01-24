export default function IngredientsList({ ingredients, ingredientItems, displayRecipe, recipeShown }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">{ingredientItems}</ul>

      { ingredients.length >= 4 ? 
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={displayRecipe}>{recipeShown ? "Hide recipe" : "Get a recipe"}</button>
        </div> : null 
      }
    </section>
  )
}