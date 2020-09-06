// When a user selects a dish option (don't worry about "Entire Meal" yet) and then clicks the "Let's Cook!" button, the user sees a random dish from the list of possible dishes for that category
// When the dish name appears, the cookpot icon disappears

var form = document.getElementById('form-input');
var letsCookBtn = document.getElementById('submit-btn');
var mealForm = document.getElementById('form-input');
var choiceContainer = document.getElementById('choice');
var icon = document.getElementById('icon');
var randomChoice = document.getElementById('choice-text');
var clearBtn = document.getElementById('clear-btn');


form.addEventListener('click', enableSubmit)

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





var meals = {
    sides: ['Miso','Glazed Carrots','Coleslaw','Garden Salad','Crispy Potatoes','Sweet Potato Tots','Coconut Rice','Caeser Salad','Shrimp Summer Rolls','Garlic Butter Mushrooms','Hush Puppies'],
    mainDish: ['Spaghetti and Meatballs','Pineapple Chicken','Shakshuka','Thai Yellow Curry','Bibimbap','Chicken Parmesean','Butternut Squash Soup','BBQ Chicken Burgers','Ramen','Empanadas','Chicken Fried Rice','Sheet Pan Fajitas','Margarita Pizza'],
    desserts: ['Apple Pie','Lemon Meringue Pie','Black Forest Cake','Banana Bread','Peach Cobbler','Cheesecake','Funfetti Cake','Baklava','Flan','Macarons','Macaroons','Chocolate Cupcakes','Pavlova','Pumpkin Pie','Key Lime Pie','Tart Tatin','Croissants','Eclairs']
}

//event listeners
letsCookBtn.addEventListener('click', generateMealItem)
clearBtn.addEventListener('click', clearContent)

