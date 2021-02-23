let res = ['_','_','_','_','_','_','_','_','_'];
let quantity = localStorage.getItem('quantityM');
let name = localStorage.getItem("aliasM");
let combinations = false;
var aux;

function start(){
    document.getElementById("checkcombinaciones").checked = false;
    recovername();
    display = document.getElementById("display");
    let width = document.getElementsByClassName('quiniela')[0].offsetWidth;
    document.getElementById("quiniela").style.height = width*0.9375 + "px";
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    if (quantity)
        document.querySelector('.botonenviar span').textContent = quantity;
    let results = localStorage.getItem("resultsM");
    if (results){
        results = results.split("*");
        for (var i = 0; i < quantity; i++){
            if (results[i] && results[i] != undefined){
                display.innerHTML += `<div>`+ results[i] + `</div>`;} 
            else
                break;
        }
    document.getElementById("total").innerHTML = "Total: $" + quantity*20 +"\n";
    if (display.childElementCount > 0)
    display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;
}  
}

function selection(element){
    let index = parseInt(element.id.slice(1)) - 1;
    let container = document.getElementById("text");
    if (!element.style.backgroundColor){
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.style.backgroundColor = "rgb(250, 30, 30)";
    }
    else{
        if(combinations){
        element.style.backgroundColor = "";
        console.log(res[index].length);
        if (res[index] != "_" && res[index].length>1)
            res[index] = res[index].split(element.id.slice(0,1)).join('');
        else    
            res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join("\xa0\xa0");
}

function validation(element){
    let index = parseInt(element.id.slice(1));
    document.getElementById("L"+index).style.backgroundColor = null;
    document.getElementById("E"+index).style.backgroundColor = null;
    document.getElementById("V"+index).style.backgroundColor = null;
}

function number(){
    quantity = localStorage.getItem("quantityM");
    if (quantity)
        localStorage.setItem('quantityM', ++quantity);
    else{
        localStorage.setItem('quantityM', 1);
        quantity = localStorage.getItem("quantityM");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('aliasM', name);
}

function result(){
    results = localStorage.getItem("resultsM");
    name = document.getElementById("nombre").value;
    name  = name.split('*').join('');
    if (results){
        if (aux > 1)
        localStorage.setItem('resultsM', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*");
        else
            localStorage.setItem('resultsM', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
        }
        else
        {
            if (aux > 1)
            localStorage.setItem('resultsM',res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" +  "*");
            else    
                localStorage.setItem('resultsM',res.join("\xa0\xa0") + "\xa0\xa0" + name+ "*");}       
}

function send(){
    if (!quantity || quantity < 1)
        save();
    if (quantity > 0){
    let whatsapptext = res.join("%20%20")
    whatsapptext = encodeURI(localStorage.getItem("resultsM"));
    whatsapptext = whatsapptext.split('*').join('%0D').replace(/#/g,"");
    window.location.href = "https://wa.me/523317816346?text="+whatsapptext;}
}

function save(){
    name = document.getElementById("nombre").value;
    if (res.join("\xa0\xa0").includes("_"))
        alert("Debes llenar todas las casillas");
    else if (!name){
        alert("Debes elegir un nombre");
        document.getElementById("nombre").focus();
        return 0;}
    else{
        if (combinations)
            calculate();
        else
            number();

        result();
        updatedisplay();
        clean();}
}

function deleteall(){
    if(confirm("Se borrará todo")){
        localStorage.setItem("quantityM","");
        localStorage.setItem("resultsM","");
        localStorage.setItem("aliasM","");
        location.reload();

    }
}

function clean(){
    res = ['_','_','_','_','_','_','_','_','_']
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    spans = document.querySelectorAll(".quiniela span");
    for (var i=0; i<27;i++)
        spans[i].style.backgroundColor = "";
    document.getElementById("costo").innerHTML = "Costo: $0";
    document.getElementById("numquinielas").innerHTML = "0 Quiniela(s)";
}

function updatedisplay(){
    if (aux == undefined)
        aux=0;

    let display = document.getElementById("display");
    if (display.childElementCount > 0)
        display.lastElementChild.removeChild(display.lastElementChild.lastElementChild);

    if (aux > 1)
        display.innerHTML += `<div>` +  res.join("\xa0\xa0") + "\xa0\xa0" + name + " (" + aux + ")" + "*\xa0\xa0" + `</div>`;
    else
        display.innerHTML += `<div>` +  res.join("\xa0\xa0") + "\xa0\xa0" + name + "*\xa0\xa0" + `</div>`;

    document.getElementById("total").innerHTML = "Total: $" + quantity*20;

    if (display.childElementCount > 0)
    display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;
    aux = 1;
}

function recovername(){
    name = localStorage.getItem("aliasM");
    if (name !=  null && name !="null")
        document.getElementById("nombre").value = name;
}

function clearname(){
    document.getElementById("nombre").value = "";
}

function allowcombination(){
    if (!combinations) 
        combinations = confirm("¿Desea registrar quinielas multiples?");
    else
        combinations= false;
    document.getElementById("checkcombinaciones").checked = combinations;
    clean();
}

function calculate(){
    aux = 1;
    for (var i=0;i<9;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem("quantityM");
    if (quantity){
        localStorage.setItem('quantityM', parseInt(quantity)+aux);
        quantity = localStorage.getItem('quantityM');}
    else{
        localStorage.setItem('quantityM', aux);
        quantity = localStorage.getItem("quantityM");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('aliasM', name);
}

function random(){
    clean();
    let container = document.getElementById("text");
    let partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < 9; i++){
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].style.backgroundColor = "rgb(250, 30, 30)";
        res[i] = ["L","E","V"][r];
    }
    container.innerHTML = res.join("\xa0\xa0");
    costoactual();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function costoactual(){
    if (true){
        let aux2 = 1;
        for (var i=0;i<9;i++){
             aux2*= res[i].length;
        }
        document.getElementById("costo").innerHTML = "Costo: $" + aux2*20;
        document.getElementById("numquinielas").innerHTML = aux2 + " Quiniela(s)"
    }
}
function remove(){
    if (quantity > 0){
        x = localStorage.getItem("resultsM");
        x = removeLastLine(x);
        localStorage.setItem("resultsM", x);
        results = x.split("*");

        let display = document.getElementById('display');
        last = display.lastElementChild.textContent;
        last = last.split("\xa0\xa0");
        last [0] = last[0].split('\n').join('');

        let aux3 = 1;
        for (var i=0;i<9;i++){
            aux3*= last[i].length;
            }
        quantity -= aux3;

        if (display.childElementCount < 2)
            localStorage.setItem("resultsM","");

        display.removeChild(display.lastElementChild);

        document.querySelector('.botonenviar span').textContent = quantity;
        document.getElementById("total").innerHTML = "Total: $" + quantity*20 +"\n";

        localStorage.setItem('quantityM', quantity);

        if (display.lastElementChild != null && display.childElementCount > 0)
            display.lastElementChild.innerHTML += `<button id="undo" onclick="remove()"><ion-icon name="arrow-undo-outline"></ion-icon></button>`;

}
}

function removeLastLine(){
    if(x.lastIndexOf("\n")>0) {
        return x.substring(0, x.lastIndexOf("\n"));
    } else {
        return x;
    }
}

window.addEventListener("load",start,false);