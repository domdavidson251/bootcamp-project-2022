import React, {useState, useEffect} from 'react';
import './style.css';
import {Recipe} from './recipeData';
import {useParams} from "react-router-dom";

interface RecipePageProps {
    external?: boolean;
}

export default function RecipePage(props: RecipePageProps) {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        description: "",
        image: "",
        ingredients: [],
        instructions: []
    });
    const [newIngredient, setNewIngredient] = useState('');
    const [allIngredients, setAllIngredients] = useState(recipe.ingredients);
    const [newInstruction, setNewInstruction] = useState('');
    const [allInstructions, setAllInstructions] = useState(recipe.instructions);

    useEffect(() => {
        // make an API call with the url param & setRecipe
        fetch("http://localhost:3001/recipe/" + id?.replace(/ /g, "%20"))
        .then((res) => res.json())
        .then((data) => setRecipe(data));
    }, [id]);

    
    useEffect(() => {
        setAllIngredients(recipe.ingredients);
        setAllInstructions(recipe.instructions);
    }, [recipe]);

    function addIngredient() {
        setAllIngredients([...allIngredients, newIngredient]);
        let address = "http://localhost:3001/recipe/" + id?.replace(/ /g, '%20') + "/ingredient";
        fetch(address, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"newIngredient": newIngredient}),
          });
    }

    function addInstruction() {
        setAllInstructions([...allInstructions, newInstruction]);
        let address = "http://localhost:3001/recipe/" + id?.replace(/ /g, '%20') + "/instruction";
        fetch(address, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"newInstruction": newInstruction}),
          });
    }

    return(
        <div className="flex-container">
            <div className="flex-content">
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <h2>Ingredients</h2>
                <ul>
                    {allIngredients.map(function(name, index) {
                        return <li key={index}>{name}</li>
                    })}
                </ul>
                <input
                    placeholder="A cup of love"
                    value={newIngredient} // add newIngredient as the input's value
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        // this event handler updates the value of newIngredient
                        setNewIngredient(e.target.value);
                    }}
                />
                <button onClick={addIngredient}>
                    Add Ingredient
                </button>
            </div>
            <img className="flex-image" src={recipe.image} alt="food"/>
            <div className="flex-content">
                <h2>Instructions</h2>
                <ol>
                    {allInstructions.map(function(name, index) {
                        return <li key={index}>{name}</li>
                    })}
                </ol>
                <input
                    placeholder="Add milk"
                    value={newInstruction} // add newInstruction as the input's value
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        // this event handler updates the value of newInstruction
                        setNewInstruction(e.target.value);
                    }}
                />
                <button onClick={addInstruction}>
                    Add Instruction
                </button>
            </div>
        </div>
    );
}

RecipePage.defaultProps = {
    external: false
};