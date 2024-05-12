import React, { useState } from 'react';
import url from '../../controller/config';
import './add_form.css';

function AddRecipe() {
    const [recipeData, setRecipeData] = useState({
        name: '',
        prep_time: '',
        cook_time: '',
        author: '',
        servings: '',
        tags: '',
        calories: '',
        ingredients: '',
        difficulty: '',
        instructions: '',
        image: { type: '', url: '', base64: '' }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData)
        try {
            const response = await fetch(`${url}/api/recipes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeData)

            });

            if (response.ok) {
                const data = await response.json();
                console.log('Recipe added successfully:', data);
                // Redirect to another page or show a success message
            } else {
                console.error('Failed to add recipe:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding recipe:', error.message);
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setRecipeData(prevState => ({
                ...prevState,
                image: {
                    type: file.type,
                    url: '', 
                    base64: reader.result as string 
                }
            }));
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="add-recipe-form">
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" className="input-field" id="name" name="name" value={recipeData.name} onChange={handleChange} required /><br />

                <label htmlFor="prep_time">Preparation Time (minutes):</label>
                <input type="number" className="input-field" id="prep_time" name="prep_time" value={recipeData.prep_time} onChange={handleChange} required /><br />

                <label htmlFor="cook_time">Cooking Time (minutes):</label>
                <input type="number" className="input-field" id="cook_time" name="cook_time" value={recipeData.cook_time} onChange={handleChange} required /><br />

                <label htmlFor="author">Author:</label>
                <input type="text" className="input-field" id="author" name="author" value={recipeData.author} onChange={handleChange} required /><br />

                <label htmlFor="servings">Servings:</label>
                <input type="number" className="input-field" id="servings" name="servings" value={recipeData.servings} onChange={handleChange} required /><br />

                <label htmlFor="tags">Tags (comma-separated):</label>
                <input type="text" className="input-field" id="tags" name="tags" value={recipeData.tags} onChange={handleChange} /><br />

                <label htmlFor="calories">Calories:</label>
                <input type="number" className="input-field" id="calories" name="calories" value={recipeData.calories} onChange={handleChange} /><br />

                <label htmlFor="ingredients">Ingredients:</label>
                <textarea className="input-field" id="ingredients" name="ingredients" value={recipeData.ingredients} onChange={handleChange} required /><br />

                <label htmlFor="difficulty">Difficulty:</label>
                <select className="input-field" id="difficulty" name="difficulty" value={recipeData.difficulty} onChange={handleChange} required>
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select><br />

                <label htmlFor="instructions">Instructions:</label>
                <textarea className="input-field" id="instructions" name="instructions" value={recipeData.instructions} onChange={handleChange} required /><br />

                <label htmlFor="review_image">Image:</label>
                <input type="file" accept="image/*" className="input-field" id="review_image" name="review_image" onChange={handleImageChange} />

                <button type="submit" className="submit-button">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe;