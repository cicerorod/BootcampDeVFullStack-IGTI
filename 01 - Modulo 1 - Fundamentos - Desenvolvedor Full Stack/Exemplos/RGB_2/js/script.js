window.addEventListener("load", initPage);

let rSlider = document.querySelector("#rSlider");
let gSlider = document.querySelector("#gSlider");
let bSlider = document.querySelector("#bSlider");
let savedColors = [];

function initPage(){ 
    let rTxtField = document.querySelector("#rTxtField");
    let gTxtField = document.querySelector("#gTxtField");
    let bTxtField = document.querySelector("#bTxtField");
    let saveBtn = document.querySelector("#saveColor");
    savedColors = [];

    rSlider.value = 0;
    gSlider.value = 0;
    bSlider.value = 0;

    rTxtField.value = rSlider.value;
    rSlider.addEventListener("input", (e) => {
        rTxtField.value = e.target.value;
        updateColor();
    })

    gTxtField.value = rSlider.value;
    gSlider.addEventListener("input", (e) => {
        gTxtField.value = e.target.value;
        updateColor();
    });

    bTxtField.value = rSlider.value;
    bSlider.addEventListener("input", (e) => {
        bTxtField.value = e.target.value;
        updateColor();
    });

    saveBtn.addEventListener("click", saveColor);
    //window.localStorage.clear();
    updateColor();
    loadSavedColors();
    renderSavedColors();
}

//atualiza a cor da div com base nos valores dos slides
function updateColor(){
    let rgb = "(" + rSlider.value + ", "+ gSlider.value + ", " + bSlider.value + ");";
    let colorSample = document.querySelector("#colorSample");
    //seta o atributo para alterar a cor da div
    colorSample.setAttribute("style", "background-color: rgb" + rgb);
}

//cria os elementos para as cores que foram salvas 
function renderSavedColors(){
    let savedColorsWrap = document.querySelector("#savedColors");
    //apaga todos os elementos 
    savedColorsWrap.innerHTML = '';
    
    //cria um elemento para cada cor salva
    savedColors.forEach((color, index) =>{
        let colorElement = document.createElement("div");
        let rgb = "(" + color.r + ", "+ color.g + ", " + color.b + ");";
        
        colorElement.setAttribute("style", "background-color: rgb" + rgb);
        colorElement.setAttribute("id", "color-" + index);
        colorElement.classList.add("saved-color");
        savedColorsWrap.appendChild(colorElement);
        
        //altera o valor dos slider com o valor salva da cor 
        //e renderiza a div de amostra
        colorElement.addEventListener("click", (e) => {
            let color = savedColors[index];
            console.log(color);
            rSlider.value = color.r;
            gSlider.value = color.g;
            bSlider.value = color.b;

            updateColor();
        });
    });
}

//carrega as cores salvas no localStorage para o array
function loadSavedColors(){
    savedColors = JSON.parse(window.localStorage.getItem("savedColors"));
    
    if(savedColors === null){
        savedColors = [];
    }
}

//salva a cor no localStorage e no array
function saveColor(){
    let rgb = {"r": rSlider.value, "g": gSlider.value, "b": bSlider.value};

    if(savedColors.length <=100){
        savedColors.push(rgb);
        window.localStorage.setItem("savedColors", JSON.stringify(savedColors));
    }else{
        console.log("Limite maximo de cores salvas");
    }

    renderSavedColors();
}