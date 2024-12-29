$(document).ready(() => {
    $(".loading-screen").fadeOut(500)
    $(`.website-content`).animate({ opacity: 1 })
})
// Menu Work
let menuContent = $(".menu-content").css(`width`)
$(".aside-menu").css({ left: `-${menuContent}` })

function openMenu() {
    $(".aside-menu").animate({
        left: `0px`,
    })
    $(`.menu-icon-bar`).removeClass("fa-bars")
    $(`.menu-icon-bar`).addClass("fa-xmark")
    for (let i = 0; i < 5; i++) {
        $(".menu-list-text li")
            .eq(i)
            .animate(
                {
                    top: 0,
                },
                (i + 5) * 100
            )
    }
}
function closeMenu() {
    $(".aside-menu").animate({
        left: `-${menuContent}`,
    })
    $(`.menu-icon-bar`).addClass("fa-bars")
    $(`.menu-icon-bar`).removeClass("fa-xmark")

    for (let i = 0; i < 5; i++) {
        $(".menu-list-text li").eq(i).animate({
            top: 500,
        })
    }
}

$(".fa-bars").click(function (e) {
    if ($(".aside-menu").css(`left`) < `0px`) {
        openMenu()
    } else {
        closeMenu()
    }
})

let app = document.getElementById(`App`)
//fetch data from API
showMealHomePage()
async function showMealHomePage() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s"
    )
    const meals = await response.json()
    let myHtml = ``
    for (let i = 0; i <= 19; i++) {
        myHtml += `
    <!-- card repeat -->
    <div onclick="getMealDetails(${meals.meals[i].idMeal})" class="meal-card col-md-3">
      <div
        class="overflow-hidden position-relative border border-1 border-white rounded-2"
      >
        <div
          class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
        >
          ${meals.meals[i].strMeal}
        </div>
        <img
          src="${meals.meals[i].strMealThumb}"
          alt="meal-img"
          class="img-fluid"
        />
      </div>
    </div>
    <!-- card end -->
    `
    }
    app.innerHTML = myHtml
}

async function getMealDetails(id) {
    closeMenu()
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
    const meal = await response.json()

    let mealIngredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal.meals[0][`strIngredient${i}`]) {
            mealIngredients += `<li class="rounded bg-white text-black p-2">${meal.meals[0][`strMeasure${i}`]
                } ${meal.meals[0][`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.meals[0].strTags?.split(",")
    if (!tags) tags = []
    let mealTags = ``
    for (let i = 0; i < tags.length; i++) {
        mealTags += `
        <li class="rounded bg-white text-black p-2">${tags[i]}</li>`
    }
    let myHtml = `<div class="col-md-4">
    <img
      src="${meal.meals[0].strMealThumb}"
      alt="meal-img"
      class="img-fluid rounded-2"
    />
    <h1 class="pt-3">${meal.meals[0].strMeal}</h1>
  </div>
  <div class="col-md-5">
    <h3>Instructions</h3>
    <p>
        ${meal.meals[0].strInstructions}
    </p>
    <h3>Area : <span>${meal.meals[0].strArea}</span></h3>
    <h3>Category : <span>${meal.meals[0].strCategory}</span></h3>
    <h3>Recipes</h3>
    <ul class="list-unstyled gap-1 d-flex">
        ${mealIngredients}
    </ul>
    <h3>Tags</h3>
    <ul class="list-unstyled gap-1 d-flex">
        ${mealTags}
    </ul>
    <div class="py-1">
      <button class="btn btn-success"><a  class="link-light text-decoration-none " href="${meal.meals[0].strSource}}" target="_blank">Source</a></button>
      <button class="btn btn-danger"><a class="link-light text-decoration-none " href="${meal.meals[0].strYoutube}" target="_blank">Youtube</a></button>
    </div>
  </div>`
    app.innerHTML = myHtml
}
// Cat
async function getAllCat() {
    closeMenu()
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    )
    const mealCat = await response.json()
    let myHtml = ``
    for (let i = 0; i < mealCat.categories.length; i++) {
        myHtml +=` 
        <!-- card repeat -->
        <div onclick="getCatItems('${mealCat.categories[i].strCategory}')" class="meal-card col-md-3">
            <div
                class="overflow-hidden position-relative border border-1 border-white rounded-2"
            >
                <div
                class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
                >
                ${mealCat.categories[i].strCategory}
                </div>
                <img
                src="${mealCat.categories[i].strCategoryThumb}"
                alt="meal-img"
                class="img-fluid"
                />
            </div>
        </div>
        <!-- card end -->
        `
    }
    app.innerHTML = myHtml
}
async function getCatItems(catName){
    closeMenu()
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
    )
    const mealsInCat = await response.json()
    console.log(mealsInCat.meals.length);
    let myHtml = ``
    for (let i = 0; i < mealsInCat.meals.length; i++) {
        myHtml += `
    <!-- card repeat -->
    <div onclick="getMealDetails(${mealsInCat.meals[i].idMeal})" class="meal-card col-md-3">
      <div
        class="overflow-hidden position-relative border border-1 border-white rounded-2"
      >
        <div
          class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
        >
          ${mealsInCat.meals[i].strMeal}
          </div>
        <img
          src="${mealsInCat.meals[i].strMealThumb}"
          alt="meal-img"
          class="img-fluid"
        />
      </div>
    </div>
    <!-- card end -->
    `
    }
    app.innerHTML = myHtml

}

// Area
async function getAllAreas() {
    closeMenu()
    const response = await fetch(
        "https://themealdb.com/api/json/v1/1/list.php?a=list"
    )
    const areas = await response.json()
    let myHtml = ``
    for (let i = 0; i < areas.meals.length; i++) {
        myHtml +=` 
        <!-- card repeat -->
        <div onclick="getMealByArea('${areas.meals[i].strArea}')" class="meal-card col-md-3">
            <div
                class="overflow-hidden position-relative border border-1 border-white rounded-2"
            >
                <div
                class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
                >
                ${areas.meals[i].strArea}
                </div>
                <img
                src="https://placehold.co/600x400?text=${areas.meals[i].strArea}"
                alt="meal-img"
                class="img-fluid"
                />
            </div>
        </div>
        <!-- card end -->
        `
    }
    app.innerHTML = myHtml
}
async function getMealByArea(areaName){
    closeMenu()
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    )
    const areaMeals = await response.json()
    let myHtml = ``
    for (let i = 0; i < areaMeals.meals.length; i++) {
        myHtml += `
    <!-- card repeat -->
    <div onclick="getMealDetails(${areaMeals.meals[i].idMeal})" class="meal-card col-md-3">
      <div
        class="overflow-hidden position-relative border border-1 border-white rounded-2"
      >
        <div
          class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
        >
          ${areaMeals.meals[i].strMeal}
          </div>
        <img
          src="${areaMeals.meals[i].strMealThumb}"
          alt="meal-img"
          class="img-fluid"
        />
      </div>
    </div>
    <!-- card end -->
    `
    }
    app.innerHTML = myHtml

}

// ingredients

async function getAllIngredients() {
    closeMenu()
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    )
    const ingredients = await response.json()
    let myHtml = ``
    for (let i = 0; i < 20; i++) {
        myHtml +=` 
        <!-- card repeat -->
        <div onclick="getMealsByIngredients('${ingredients.meals[i].strIngredient}')" class="meal-card col-md-3">
            <div
                class="overflow-hidden position-relative border border-1 border-white rounded-2"
            >
                <div
                class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
                >
                ${ingredients.meals[i].strIngredient}
                </div>
                <img
                src="https://placehold.co/600x400?text=${ingredients.meals[i].strIngredient}"
                alt="meal-img"
                class="img-fluid"
                />
            </div>
        </div>
        <!-- card end -->
        `
    }
    app.innerHTML = myHtml
}
async function getMealsByIngredients(ingredientName){
    closeMenu()
    console.log(ingredientName)
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
    )
    const ingredientMeals = await response.json()
    let myHtml = ``
    for (let i = 0; i < ingredientMeals.meals.length; i++) {
        myHtml += `
    <!-- card repeat -->
    <div onclick="getMealDetails(${ingredientMeals.meals[i].idMeal})" class="meal-card col-md-3">
      <div
        class="overflow-hidden position-relative border border-1 border-white rounded-2"
      >
        <div
          class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
        >
          ${ingredientMeals.meals[i].strMeal}
          </div>
        <img
          src="${ingredientMeals.meals[i].strMealThumb}"
          alt="meal-img"
          class="img-fluid"
        />
      </div>
    </div>
    <!-- card end -->
    `
    }
    app.innerHTML = myHtml

}

// search
async function searchPage() { 
  closeMenu()
  let myHtml =`
  <div class="col-md-5">
  <input
    type="text"
    oninput="searchByName()"
    class="form-control"
    placeholder="Enter Meal Name"
    id="searchByName"
  />
</div>
<div class="col-md-5">
  <input
    type="text"
    oninput="searchByLetter()"
    class="form-control"
    placeholder="Enter First Letter Of Meal"
    id="searchByLetter"
  />
</div>
<div id="searchApp" class="row g-3"></div>
  `
  app.innerHTML=myHtml
 }

 
async function searchByName(){
  let searchApp = document.querySelector(`#searchApp`)
  let searchByName =document.querySelector(`#searchByName`).value
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`
)
const meals = await response.json()
console.log(meals);
let myHtml = ``
if(meals.meals != null ){
  for (let i = 0; i < meals.meals.length; i++) {
    myHtml += `
<!-- card repeat -->
<div onclick="getMealDetails(${meals.meals[i].idMeal})" class="meal-card col-md-3">
  <div
    class="overflow-hidden position-relative border border-1 border-white rounded-2"
  >
    <div
      class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
    >
      ${meals.meals[i].strMeal}
    </div>
    <img
      src="${meals.meals[i].strMealThumb}"
      alt="meal-img"
      class="img-fluid"
    />
  </div>
</div>
<!-- card end -->
`
}
}else{
  myHtml=``
}
searchApp.innerHTML = myHtml
}

async function searchByLetter(){
  let searchApp = document.querySelector(`#searchApp`)
  let searchByLetter =document.querySelector(`#searchByLetter`).value
  let firstLetter = searchByLetter.charAt(0)
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
)
const meals = await response.json()
console.log(meals);
let myHtml = ``
if(meals.meals != null ){
  for (let i = 0; i < meals.meals.length; i++) {
    myHtml += `
<!-- card repeat -->
<div onclick="getMealDetails(${meals.meals[i].idMeal})" class="meal-card col-md-3">
  <div
    class="overflow-hidden position-relative border border-1 border-white rounded-2"
  >
    <div
      class="card-overlay bg-white position-absolute text-black d-flex align-items-center justify-content-center fs-4 fw-bold"
    >
      ${meals.meals[i].strMeal}
    </div>
    <img
      src="${meals.meals[i].strMealThumb}"
      alt="meal-img"
      class="img-fluid"
    />
  </div>
</div>
<!-- card end -->
`
}
}else{
  myHtml=``
}
searchApp.innerHTML = myHtml
}



function contactUs(){
  closeMenu()
  let myHtml=`          
  <div class="col-md-6">
  <input
  oninput="nameCheck()"
    class="form-control"
    type="text"
    placeholder="Enter Your Name"
    id="userName"
  />
  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
  Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6">
  <input
  oninput="mailCheck()"
    class="form-control"
    type="mail"
    placeholder="Enter Your Mail"
    id="userMail"
  />
  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
    Email not valid *exemple@yyy.zzz
</div>
</div>
<div class="col-md-6">
  <input
  oninput="phoneCheck()"
    class="form-control"
    type="phone"
    placeholder="Enter Your Phone"
    id="userPhone"
  />
<div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
  Enter valid Phone Number
</div>
</div>
<div class="col-md-6">
  <input
    class="form-control"
    oninput="ageCheck()"
    type="number"
    placeholder="Enter Your Age"
    id="userAge"
  />
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
      Enter valid age
  </div>
</div>
<div class="col-md-6">
  <input
    class="form-control"
    oninput="passwordCheck()"
    type="password"
    placeholder="Enter Your password"
    id="userPassword"
  />
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
      Enter valid password *Minimum eight characters, at least one letter and one number:*
  </div>
</div>
<div class="col-md-6">
  <input
  oninput="passwordCheckAgain()"
    class="form-control"
    type="password"
    placeholder="Enter Your password again"
    id="userPasswordAgain"
  />
  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid repassword 
</div>
</div>
<button onclick="afterCheck()" id="submitBtn" class="disabled btn btn-danger ">Submit</button>`
app.innerHTML = myHtml
}

function nameCheck() {
  if (!/^[a-zA-Z ]+$/.test(document.getElementById("userName").value)){
    $('#nameAlert').removeClass(`d-none`);
  }else{
    $('#nameAlert').addClass(`d-none`)

  }
  
}

function mailCheck() {
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("userMail").value)){
    $('#emailAlert').removeClass(`d-none`);

  }else{
    $('#emailAlert').addClass(`d-none`)

  }
  
  
}

function phoneCheck() {
  if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("userPhone").value)){
    $('#phoneAlert').removeClass(`d-none`);

  }else{
    $('#phoneAlert').addClass(`d-none`)

  }
  
}

function ageCheck() {
  if (!/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("userAge").value)){
    $('#ageAlert').removeClass(`d-none`);

  }else{
    $('#ageAlert').addClass(`d-none`)

  }
  
}

function passwordCheck() {
  if (!/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("userPassword").value)){
    $('#passwordAlert').removeClass(`d-none`);

  }else{
    $('#passwordAlert').addClass(`d-none`)

  }
  
}

function passwordCheckAgain() {
  if(document.getElementById("userPasswordAgain").value == document.getElementById("userPassword").value){
    $('#repasswordAlert').addClass(`d-none`);

  }else{
    $('#repasswordAlert').removeClass(`d-none`)

  }
  
}

