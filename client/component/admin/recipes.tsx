import React, { useState, useEffect } from "react";
import fetchRecipes from "../../controller/fetch/recipes"; // Import the default export

// Define an interface for the recipe object
interface Recipe {
  _id: string;
  name: string;
  cook_time: number;
  tags: string[];
  // Add other properties as needed
}

const Receips = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Specify the type as Recipe | null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, recipes } = await fetchRecipes.get({});
        if (error) {
          throw new Error('Failed to fetch recipes');
        }
        // Set the first recipe from the recipes array
        setRecipe(recipes[0]); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Recipe</h1>
      {recipe && (
        <div>
          <h2>{recipe.name}</h2>
          <p>Cook Time: {recipe.cook_time}</p>
          <p>Tags: {recipe.tags.join(', ')}</p>
          {/* Render other details of the recipe */}
        </div>
      )}
    </div>
  );
};

export default Receips;

