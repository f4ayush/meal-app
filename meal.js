let mealId = window.location.search.split("=")[1];
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(data => data.json())
    .then(data => {
        meal = data.meals[0];
        populateData(meal)
    })
    .catch(e => console.log(e))


function populateData(meal) {
    document.getElementById("title").textContent = meal.strMeal;
    document.getElementById("instruction").textContent = meal.strInstructions;
    document.getElementById("mealImage").src = meal.strMealThumb;
    let ingredientsList = document.querySelector(".ingredients-list");
    console.log(Object.keys(meal))
    let ingredientKeys = Object.keys(meal).filter(key => key.includes("strIngredient") && meal[key]);
    ingredientKeys.forEach(ingredient => {
        let li = document.createElement('li');
        li.textContent = meal[ingredient];
        li.className = "list-group-item";
        ingredientsList.appendChild(li);
    });
}