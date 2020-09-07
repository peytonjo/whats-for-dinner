// When a user selects a dish option (don't worry about "Entire Meal" yet) and then clicks the "Let's Cook!" button, the user sees a random dish from the list of possible dishes for that category
// When the dish name appears, the cookpot icon disappears

var form = document.getElementById('form-input');
var letsCookBtn = document.getElementById('submit-btn');
var mealForm = document.getElementById('form-input');
var choiceContainer = document.getElementById('choice');
var icon = document.getElementById('icon');
var randomChoice = document.getElementById('choice-text');
var clearBtn = document.getElementById('clear-btn');
var addRecipeBtn = document.getElementById('show-footer-btn');
var newRecipeFooter = document.getElementById('new-recipe-footer');
var newRecipeForm = document.getElementById('new-recipe-form');
var newRecipeBtn = document.getElementById('new-recipe-btn');



function enableSubmit() {
    letsCookBtn.disabled = false;
}

function generateMealItem(event){
    event.preventDefault()
    var randomMeal;
    var mealsListName = getMealSelection();
    
    if (mealsListName === 'Entire Meal') {
        randomMeal = getEntireMeal();
    } else {
        randomMeal = getRandomMeal(mealsListName, meals);
    }
    randomChoice.innerHTML = randomMeal;
    switchDisplay(choiceContainer, icon)
}

function getMealSelection(){
    for(var i = 0; i < mealForm.length; i++){
        if(mealForm[i].checked){
            return mealForm[i].value
        }
    }
}

function getRandomMeal(mealsListName, mealsData){
    var mealList = mealsData[mealsListName];
    var randomChoice = mealList[Math.floor(Math.random() * mealList.length)]

    return randomChoice;
}

function getEntireMeal(){
    return `${getRandomMeal('mainDish', meals)} with a side of ${getRandomMeal('sides', meals)} and ${getRandomMeal('desserts', meals)} for dessert!`
}
//display random generated food on the 'transparent-box'

function switchDisplay(showElement, hideElement){
    showElement.classList.remove('hidden')
    hideElement.classList.add('hidden')
}

function clearContent(){
    randomChoice.innerHTML = '';
    switchDisplay(icon, choiceContainer)
    form.reset();
    letsCookBtn.disabled = true;
}

function showNewMealForm(){
    newRecipeFooter.classList.remove('hidden');
}

function submitNewRecipe(event){
    event.preventDefault()
    var inputValues = getNewMealValues();
    if(meals[inputValues[0]]){
        meals[inputValues[0]].push(inputValues[1])
        console.log(meals[inputValues[0]])
    }
}

function getNewMealValues(){
    var inputValues = [];
    for(var i = 0; i < newRecipeForm.length; i++){
        if(newRecipeForm[i].value){
            var lowerCasedInput = (newRecipeForm[i].value).toLowerCase();
            inputValues.push(lowerCasedInput)
        }
    }
    return inputValues;
}




var meals = {
    side: ['Miso','Glazed Carrots','Coleslaw','Garden Salad','Crispy Potatoes','Sweet Potato Tots','Coconut Rice','Caeser Salad','Shrimp Summer Rolls','Garlic Butter Mushrooms','Hush Puppies'],
    mainDish: ['Spaghetti and Meatballs','Pineapple Chicken','Shakshuka','Thai Yellow Curry','Bibimbap','Chicken Parmesean','Butternut Squash Soup','BBQ Chicken Burgers','Ramen','Empanadas','Chicken Fried Rice','Sheet Pan Fajitas','Margarita Pizza'],
    dessert: ['Apple Pie','Lemon Meringue Pie','Black Forest Cake','Banana Bread','Peach Cobbler','Cheesecake','Funfetti Cake','Baklava','Flan','Macarons','Macaroons','Chocolate Cupcakes','Pavlova','Pumpkin Pie','Key Lime Pie','Tart Tatin','Croissants','Eclairs']
}

//event listeners
letsCookBtn.addEventListener('click', generateMealItem)
clearBtn.addEventListener('click', clearContent)
form.addEventListener('click', enableSubmit)
addRecipeBtn.addEventListener('click', showNewMealForm)
newRecipeBtn.addEventListener('click', submitNewRecipe)

