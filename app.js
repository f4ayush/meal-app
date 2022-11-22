let searchButton = document.getElementById("search");
let cardContainer = document.querySelector(".card-container");
var timer = 0;
var meals;
var favoriteMeals;

function clearData() {
    cardContainer.innerHTML = "";
}
function populateData(meals) {
    meals.forEach(meal => {
        console.log(meal)
        let card = document.createElement('div');
        card.className = "card m-3";
        card.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="meal image">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <a href="/fullRecipe.html?id=${meal.idMeal}" target="_blank" class="btn btn-primary">Go to Recipe</a>
            <i class="fa-regular fa-heart"></i>
        </div>`;
        cardContainer.append(card);
    });
}
function getMeals(meal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(data => data.json())
        .then(data => {
            clearData();
            meals = data.meals;
            populateData(meals)
        })
        .catch(e => console.log(e))
}
searchButton.addEventListener('keyup', (e) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
        let meal = e.target.value;
        getMeals(meal);
    }, 1000);
})

searchButton.addEventListener('click', (e) => {
    console.log(e.target.value);
})