window.addEventListener("load", initPage);

let registeredUsers = [];

function initPage() {
    console.log("pagina carregada com sucesso");

    preventFormSubmit();
    activeInput();
    renderUsers();
}

function preventFormSubmit(){
    let formElement = document.querySelector("form");
    
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

function activeInput(){
    let inputElement = document.querySelector("#txtUserName");
    
    inputElement.focus();
    inputElement.addEventListener("keyup", (e) => {
        if(e.key === 'Enter'){
            addUser(e.target.value);
            e.target.value = "";
        }
    })
}

function addUser(userName){
    registeredUsers.push(userName);    
    renderUsers(userName);   

    console.log("Adicionado o usuario: " + userName);
}

function renderUsers(userName){
    let registeredUsersWrap = document.querySelector("#registeredUsers tbody");
   
    registeredUsersWrap.innerHTML = "";

    if(registeredUsers.length == 0){
        let rowElement = document.createElement("tr");
        let userNameCel = document.createElement("td");
        let actionCel = document.createElement("td");

        registeredUsersWrap.appendChild(rowElement);
        rowElement.appendChild(userNameCel);
        rowElement.appendChild(actionCel);

        userNameCel.textContent = "Não há usuarios cadastrados!";
    }

    registeredUsers.forEach((user, index) => {
        let rowElement = document.createElement("tr");
        let userNameCel = document.createElement("td");
        let actionCel = document.createElement("td");

        registeredUsersWrap.appendChild(rowElement);
        rowElement.id = "user" + index;
        rowElement.appendChild(userNameCel);
        rowElement.appendChild(actionCel);

        userNameCel.textContent = user;
        userNameCel.classList.add("user-name");
        
        actionCel.appendChild(createUpdateButton(index));
        actionCel.appendChild(createDeleteButton(index));

        actionCel.classList.add("user-action");
    })

    
}

function createDeleteButton(userID){
    let actionButton = document.createElement("button");
    
    actionButton.textContent = "X";
    actionButton.addEventListener("click", (e) => {        
        console.log("Usuario: " + registeredUsers[userID] + " excluido!");
        console.log("index:" + userID);
        registeredUsers.splice(userID, 1);

        renderUsers();
    })

    return actionButton;
}

function createUpdateButton(index){
    let updateButton = document.createElement("button");
    
    updateButton.textContent = "EDIT";
    updateButton.addEventListener("click", (e) => {
        let userRow = document.querySelector("#user" + index);
        let userNameCel = userRow.querySelector(".user-name");
        let currentUsername = userNameCel.textContent;

        if(userNameCel.textContent == ''){
            let updateInput = userNameCel.querySelector("input");
            userNameCel.removeChild(updateInput);
            userNameCel.textContent = registeredUsers[index];
        }else{
            let updateInput = document.createElement("input");
            updateInput.setAttribute("type", "text");
            updateInput.value = currentUsername;
            
            userNameCel.textContent = '';
            userNameCel.append(updateInput);
    
            updateInput.addEventListener("keyup", (e) => {
                if(e.key === 'Enter'){
                    updateUser(e.target.value, index);
                }
            })
        }        
    });    

    return updateButton;
}

function updateUser(userName, index){
   registeredUsers[index] = userName;
   renderUsers();
}

function showRegisterUsersInfo(){
    console.log("Usuarios Registrados:");
    registeredUsers.forEach((user, index) => {
        console.log(index + " - " + user);
    });
}