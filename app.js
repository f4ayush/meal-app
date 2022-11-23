let searchButton = document.getElementById("search");
let cardContainer = document.querySelector(".card-container");
var timer = 0;
var meals;


function clearData() {
    cardContainer.innerHTML = "";
}

function populateData(meals) {
    meals.forEach(meal => {
        console.log(meal)
        let card = document.createElement('div');
        let isFavorite = meal.isFavorite;
        card.className = "card m-3";
        card.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="meal image">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <a href="/fullRecipe.html?id=${meal.idMeal}" target="_blank" class="btn btn-primary">Go to Recipe</a>
            <i class="fa-regular fa-heart heart"  data-is-favorite="${isFavorite}" data-meal-id="${meal.idMeal}"></i>
        </div>`;
        cardContainer.append(card);
    });
}

function updateFavorites(mealId, isFavorite) {
    let favorites = localStorage.getItem('favorites');
    favorites = JSON.parse(favorites) || [];
    if (isFavorite) {
        // add to localStorage
        let favoriteMeal = meals.filter(meal => meal.idMeal == mealId)
            .map(meal => {
                meal.isFavorite = true
                return meal;
            });
        console.log(favoriteMeal, meals, mealId)
        favorites.push(...favoriteMeal);
    } else {
        // remove from localStorage
        favorites = favorites.filter(meals => meals.idMeal != mealId);
    }

    favorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', favorites);
}

cardContainer.addEventListener('click', (event) => {
    console.log(event.target.className);
    if (event.target.className.includes('heart')) {

        console.log(event.target.dataset.isFavorite == "true")
        if (event.target.dataset.isFavorite == "true") {
            // remove from localStorage
            updateFavorites(event.target.dataset.mealId, false);
            event.target.style.color = "black";
            event.target.dataset.isFavorite = "false"
        } else {
            // add to local storage
            updateFavorites(event.target.dataset.mealId, true);
            event.target.dataset.isFavorite = "true"
            event.target.style.color = "red";
        }
    }
})

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
    }, 500);
})

