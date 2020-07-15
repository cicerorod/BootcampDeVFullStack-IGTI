const API_URL = "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";

const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");
const userWrap = document.querySelector("#loadedUsers");
const staticsTitleDiv = document.querySelector("#staticsTitleDiv");
const staticsDiv = document.querySelector("#staticsDiv");

let loadedUsers = [];
let foundUsers = [];
let favoriteUsers = [];

let userStatics = {
    "found": 0,
    "male": 0,
    "female": 0,
    "sum": 0,
    "avarage": 0,
    "favorites": 0
}

let states = [
    {"state": "Acre", "abr": "AC"},
    {"state": "Alagoas", "abr": "AL"},
    {"state": "Amapá", "abr": "AP"},
    {"state": "Amazonas", "abr": "AM"},
    {"state": "Bahia", "abr": "BA"},
    {"state": "Ceará", "abr": "CE"},
    {"state": "Distrito Federal", "abr": "DF"},
    {"state": "Espírito Santo", "abr": "ES"},
    {"state": "Goiás", "abr": "GO"},
    {"state": "Maranhão", "abr": "MA"},
    {"state": "Mato Grosso", "abr": "MT"},
    {"state": "Mato Grosso do Sul", "abr": "MS"},
    {"state": "Minas Gerais", "abr": "MG"},
    {"state": "Pará", "abr": "PA"},
    {"state": "Paraíba", "abr": "PB"},
    {"state": "Paraná", "abr": "PR"},
    {"state": "Pernambuco", "abr": "PE"},
    {"state": "Piauí", "abr": "PI"},
    {"state": "Rio de Janeiro", "abr": "RJ"},
    {"state": "Rio Grande do Norte", "abr": "RN"},
    {"state": "Rio Grande do Sul", "abr": "RS"},
    {"state": "Rondônia", "abr": "RO"},
    {"state": "Roraima", "abr": "RR"},
    {"state": "Santa Catarina", "abr": "SC"},
    {"state": "São Paulo", "abr": "SP"},
    {"state": "Sergipe", "abr": "SE"},
    {"state": "Tocantins", "abr": "TO"}
];

window.addEventListener("load", start);

function start(){
    initStaticsBar();
    getUsers();

    searchBar.addEventListener("keyup", (e) => {
        const searchValue = e.target.value;

        enableSearchButton();
        
        if(e.key === 'Enter' && searchValue.length > 0){
            findUsers(searchValue);
            renderUsers();
            updateStatics();
            renderStatics();
        }
    });

    searchButton.addEventListener("click", (e) => {
        const searchValue = searchBar.value;

        findUsers(searchValue);
        renderUsers();
        updateStatics();
        renderStatics();
    });

    let formElement = document.querySelector("form");
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    let maleFilter = document.querySelector("#maleFilter");
    maleFilter.addEventListener("click", (e) => {
        let el = e.target;

        if(el.classList.contains("selected")){
            el.classList.remove("selected");
            el.classList.remove("blue");
            el.classList.add("indigo");
            
            foundUsers = loadedUsers;
        }else{
            el.classList.add("selected");
            el.classList.add("blue");
            el.classList.remove("indigo");
            
            findUsers("male");
        }

        renderUsers();
        updateStatics();
        renderStatics();
    });

    let femaleFilter = document.querySelector("#femaleFilter");
    femaleFilter.addEventListener("click", (e) => {
        let el = e.target;

        if(el.classList.contains("selected")){
            el.classList.remove("selected");
            el.classList.remove("blue");
            el.classList.add("indigo");
            
            foundUsers = loadedUsers;
        }else{
            el.classList.add("selected");
            el.classList.add("blue");
            el.classList.remove("indigo");

            findUsers("female");
        } 

        renderUsers();
        updateStatics();
        renderStatics();
    });

    let favoriteFilter = document.querySelector("#favoriteFilter");
    favoriteFilter.addEventListener("click", (e) => {
        let el = e.target;

        if(el.classList.contains("selected")){
            el.classList.remove("selected");
            el.classList.remove("blue");
            el.classList.add("indigo");
            
            foundUsers = loadedUsers;
        }else{
            el.classList.add("selected");
            el.classList.add("blue");
            el.classList.remove("indigo");

            findUsers("favorite");
        }

        renderUsers();
        updateStatics();
        renderStatics();
    });

    const showStaticsButton = document.querySelector("#showStaticsButton");
    showStaticsButton.addEventListener("click", (e) => {
        let el = e.target;

        if(el.classList.contains("selected")){
            el.classList.remove("selected");
            staticsDiv.classList.add("hide-on-small-only");
            staticsTitleDiv.classList.add("hide-on-small-only");
        }else{
            el.classList.add("selected");
            staticsDiv.classList.remove("hide-on-small-only");
            staticsTitleDiv.classList.remove("hide-on-small-only");
        }
    });      
}

/**
 * load all user from the API and load the formated data to
 * user array
 */
async function getUsers(){
    try{
        const response = await fetch(API_URL);
        const rawData = await response.json();
        const data = rawData.results.map((user, index) => {
            return userFactory(user);
        });

        loadedUsers = data;
        foundUsers = data;

        enableSearchButton(true);
        loadFavoriteUser();
        renderUsers();
        updateStatics();
        renderStatics();
        
    }catch(err){
        console.error("Erro ao tentar carregar os usuarios da API: " + API_URL, err);
    }
   
    printInfo();
}

/**
 * filter user array
 */
function findUsers(searchValue){
    let filterUsers;

    if(searchValue == "male" || searchValue == "female"){
        filterUsers = loadedUsers.filter((user) => {
            return user.gender.toLowerCase() == searchValue;
        });
    }else if(searchValue == "favorite"){
        filterUsers = loadedUsers.filter((user) => {
            return favoriteUsers.includes(user.id);
        });
    }else{
        filterUsers = loadedUsers.filter((user) => {
            return user.userName.toLowerCase().includes(searchValue.toLowerCase());
        });
    }   
    
    if(filterUsers.length == 0){
        filterUsers = loadedUsers.filter((user) => {
            return user.email.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
    
    console.log(filterUsers);

    foundUsers = filterUsers;
    searchBar.value = '';
}

function updateStatics(){    
    userStatics.male = 0;
    userStatics.female = 0;
    userStatics.sum = 0;
    userStatics.avarage = 0;
    
    foundUsers.forEach((user, index) => {
        if(user.gender == "male"){
            userStatics.male++;
        }

        if(user.gender == "female"){
            userStatics.female++;
        }

        userStatics.sum = userStatics.sum + user.age;
    });
    
    userStatics.avarage = userStatics.sum / foundUsers.length;
    userStatics.avarage =  parseFloat(userStatics.avarage).toFixed(2);

    userStatics.found = foundUsers.length;

    userStatics.favorites = favoriteUsers.length;
}

/**
 * create a new user object with formated data
 */
function userFactory(user){
    return {
        "id": user.login.uuid,
        "gender": user.gender,
        "userName": `${user.name.first} ${user.name.last}`,
        "location": user.location,
        "email": user.email,
        "age": user.dob.age,
        "picture": user.picture
    }
}

function saveFavoriteUsers(){
    window.localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
}

function loadFavoriteUser(){
    favoriteUsers = JSON.parse(window.localStorage.getItem("favoriteUsers"));

    if(favoriteUsers === null){
        favoriteUsers = [];
    }
}


/**
 * dom manipulations
 */
function enableSearchButton(){
    if(searchBar.value.length > 0){
        searchButton.classList.remove("disabled");
    }else{
        searchButton.classList.add("disabled");;
    }    
}

function showLoadingSpinner(show){
    const loadSpiner = document.querySelector("#loadingSpinner");

    if(show){
        loadingSpinner.setAttribute("style", "display: block");
    }else{
        loadingSpinner.setAttribute("style", "display: none");
    }
}

function createUserCard(user){
    let cardWrapEl = `
    <div class="col s6 l3 xl2">
        <div class="card">
            <div class="card-image">
                <img src="${user.picture.large}">
                <ul class="user-icons">
                    <li class="icon center">${user.gender == "male" ? '<i class="fas fa-mars"></i>' : '<i class="fas fa-venus"></i>'} </li>
                    <li class="icon center">
                        <i id="${user.id}" class="material-icons favorite ${favoriteUsers.includes(user.id) ? "favorited" : ""}">
                        ${favoriteUsers.includes(user.id) ? "favorite" : "favorite_border"}
                        </i>
                    </li>
                    <li class="icon center"><i class="material-icons">chat</i></li>
                </ul>
            </div>
            <div class="card-content">
                <span class="card-title grey-text text-darken-4 center">${user.userName}</span>
                <ul>
                    <li>Age: ${user.age}</li>
                    <li>State: ${getStateAbreviation(user.location.state)}</li>
                </ul>
            </div>
        </div>
    </div>
    `;

    return cardWrapEl;
}

function getStateAbreviation(stateToFilter){
    let abreviation = states.filter((item) => {
        return item.state == stateToFilter;
    });

    return abreviation[0].abr;
}

function initStaticsBar(){
    let itens = document.querySelectorAll(".fixed-action-btn");
    let instance = M.FloatingActionButton.init(itens, {
        hoverEnabled: true
    });
}

function renderUsers(){
    showLoadingSpinner(true);
    userWrap.innerHTML = "";
    console.log(foundUsers);
    foundUsers.forEach((user, index) => {
        userWrap.innerHTML = userWrap.innerHTML + createUserCard(user);
    });

    showLoadingSpinner(false);

    let favorites = document.querySelectorAll('.favorite');
    favorites.forEach((fav) => {
        fav.addEventListener('click', (e) => {
            let id = fav.id;

            if(fav.classList.contains("favorited")){
                fav.classList.remove("favorited");
                fav.textContent = "favorite_border";
                
                favoriteUsers = favoriteUsers.filter((userId) => {
                    return userId != id;
                })

            }else{
                fav.classList.add("favorited");
                fav.textContent = "favorite";

                favoriteUsers.push(id);
            }

            saveFavoriteUsers();
            updateStatics();
            renderStatics();
        })
    })
}

function renderStatics(){
    let userStaticsWrap = document.querySelector("#staticsWrap");

    let element = `
        <td>${userStatics.found}</td>
        <td>${userStatics.male}</td>
        <td>${userStatics.female}</td>
        <td>${userStatics.sum}</td>
        <td>${userStatics.avarage}</td>
        <td>${userStatics.favorites}</td>
    `;

    userStaticsWrap.innerHTML = '';
    userStaticsWrap.innerHTML = element;
}

/**
 * print on console debug information
 */
function printInfo(){
    console.log("loadedUsers: ");
    console.log(loadedUsers);
}
