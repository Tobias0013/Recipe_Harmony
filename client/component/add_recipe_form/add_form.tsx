import React, { useState } from 'react';
import url from '../../controller/config';  
import './add_form.css';

function AddRecipe() {
    const [recipeData, setRecipeData] = useState({
        name: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        tags: [],
        calories: '',
        ingredients: [{ name: '', quantity: '', quantity_type: '' }],
        difficulty: '',
        instructions: [{ step: '1', text: ''}],
        review_count: null,
        image: { type: '', url: '', base64: '' }
    });
    let instructionStep = 1;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "tags") {
            const tagsArray = value.split(",").map(tag => tag.trim());
            setRecipeData(prevState => ({
                ...prevState,
                [name]: tagsArray
            }));
            return;
        }

        // Validate if the value is an integer
        if (["prep_time", "cook_time", "servings", "calories", "quantity", "step"].includes(name)) {
            if (!/^\d+$/.test(value)) {
                // If the value is not an integer, show an error message to the user
                alert(`Please enter a valid number for ${name.replace('_', ' ')}.`);
                return;
            }
        }
    
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIngredientsChange = (index, e) => {
        const { name, value } = e.target;
        const ingredients = [...recipeData.ingredients];
        ingredients[index][name] = value;
        setRecipeData(prevState => ({
            ...prevState,
            ingredients
        }));
    };

    const handleInstructionsChange = (index, e) => {
        const { name, value } = e.target;
        const instructions = [...recipeData.instructions];
        instructions[index][name] = value;
        setRecipeData(prevState => ({
            ...prevState,
            instructions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('jwt');
        console.log(recipeData)
        
        return
        try {
            const response = await fetch(`${url}/api/recipes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(recipeData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Recipe added successfully:', data);
                setIsSubmitted(true);
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
        if (!file) {
            return setRecipeData(prevState => ({
                ...prevState,
                image: {
                    type: "",
                    url: '', 
                    base64: "" 
                }
            }));
        }
        const reader = new FileReader();
        console.log(file);
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

    const handleAddInstruction = () => {
        setRecipeData(prevState => ({
            ...prevState,
            instructions: [...prevState.instructions, { step: '', text: '' }]
        }));
    };

    const handleAddIngredient = () => {
        setRecipeData(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { name: '', quantity: '', quantity_type: '' }]
        }));
    };

    

    return (
        <div>
        <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" name="name" value={recipeData.name} onChange={handleChange} className="input-field" />
        </label>
        <label>
            Prep Time:
            <input type="text" name="prep_time" value={recipeData.prep_time} onChange={handleChange} className="input-field" />
        </label>
        <label>
            Cook Time:
            <input type="text" name="cook_time" value={recipeData.cook_time} onChange={handleChange} className="input-field" />
        </label>
        <label>
            Servings:
            <input type="text" name="servings" value={recipeData.servings} onChange={handleChange} className="input-field" />
        </label>
        <label>
                Tags (separated by comma):
                <input type="text" name="tags" value={recipeData.tags.join(", ")} onChange={handleChange} className="input-field" />
            </label>
        <label>
            Calories:
            <input type="text" name="calories" value={recipeData.calories} onChange={handleChange} className="input-field" />
        </label>
        <label>
            Difficulty:
            <select name="difficulty" value={recipeData.difficulty} onChange={handleChange} className="input-field add-recipe-difficulty">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
    </select>
    </label>
        <label>
            Image:
            <input className='add-recipe-image-input' type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
    Ingredients:
    {recipeData.ingredients.map((ingredient, index) => (
        <div key={index}>
            <input type="text" name="name" placeholder="Name" value={ingredient.name} onChange={(e) => handleIngredientsChange(index, e)} className="input-field" />
            <input type="text" name="quantity" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => handleIngredientsChange(index, e)} className="input-field" />
            <input type="text" name="quantity_type" placeholder="Quantity Type" value={ingredient.quantity_type} onChange={(e) => handleIngredientsChange(index, e)} className="input-field" />
            {index === recipeData.ingredients.length - 1 && (
                <button onClick={() => handleAddIngredient()} className="add-button">+</button>
            )}
        </div>
    ))}
</label>
<label>
    Instructions:
    {recipeData.instructions.map((instruction, index) => (
        <div key={index}>
            <input readOnly type="text" name="step" placeholder="Step" value={instruction.step} onChange={(e) => handleInstructionsChange(index, e)} className="input-field" />
            <textarea name="text" placeholder="Instruction" value={instruction.text} onChange={(e) => handleInstructionsChange(index, e)} className="input-field" />
            {index === recipeData.instructions.length - 1 && (
                <button onClick={() => handleAddInstruction()} className="add-button">+</button>
            )}
        </div>
    ))}
</label>
        <button type="submit" className="submit-button">Submit</button>
    </form>
    {isSubmitted && (
            <div className="success-message">
                Recipe added successfully! {/* Display success message */}
            </div>
        )}
    </div>
    
);
}

export default AddRecipe;
