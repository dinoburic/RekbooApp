import { useState } from "react";


export default  function Meals()  {

   const [loadedMeals, setLoadedMeals] = useState([]);

   async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    
    if(!response.ok) {

    }

    const meals = await response.json();
    setLoadedMeals(meals);
}
    
fetchMeals();

    return(
        <ul id="meals">
            {loadedMeals.map(meal => <li id={meal.id}>
                {meal.name}
            </li>)}
        </ul>
    );
}