var pecas = document.querySelectorAll('.movel');
var rotation = [];

// TAMANHO DAS PEÇAS 
var tamW = [92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92]
var tamH = [115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115]

// DISTRIBUIÇÃO DAS PEÇAS NA TELA
for(var i=0; i< pecas.length; i++){
    pecas[i].style.width = tamW[i] + 'px';
    pecas[i].style.height = tamH[i] + 'px';
    pecas[i].style.backgroundImage = "url('imagens/p_" + (i + 1) + ".png')";
    rotation[i] = Math.floor(Math.random() * 4) * 90;
    pecas[i].style.transform = "rotate(" + rotation[i] + "deg)";
    pecas[i].style.left = Math.floor((Math.random() * 10) + 1) + "px";
    pecas[i].style.top = Math.floor((Math.random() * 450) + 1) + "px";
    pecas[i].setAttribute("onmousedown", "selecionarElemento(event)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function selecionarElemento(evt){
    elementSelect = reordernar(evt);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentPosX = parseFloat(elementSelect.style.left);
    currentPosY = parseFloat(elementSelect.style.top);
    elementSelect.setAttribute("onmousemove", "moverElemento(event)");
}

function moverElemento(evt){
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.style.left = currentPosX + "px";
    elementSelect.style.top = currentPosY + "px";
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout", "deselecionarElemento(event)")
    elementSelect.setAttribute("onmouseup", "deselecionarElemento(event)")
    unir();
}

function girarElemento(e){
    if(e.key == "ArrowRight" && elementSelect != 0) {
        var id = elementSelect.getAttribute("id");
        rotation[id] += 90; 
        elementSelect.style.transform = "rotate(" + rotation[id] + "deg)";
    }
    if(e.key == "ArrowLeft" && elementSelect != 0) {
        var id = elementSelect.getAttribute("id");
        rotation[id] -= 90; 
        elementSelect.style.transform = "rotate(" + rotation[id] + "deg)";
    }
}

function deselecionarElemento(evt){
    verificar();
    if(elementSelect != 0){
        elementSelect.removeAttribute("onmousemove");
        elementSelect.removeAttribute("onmouseout");
        elementSelect.removeAttribute("onmouseup");
        elementSelect = 0;
    }
}

var container = document.getElementById('container');

function reordernar(evt){
    var cPecas = evt.target;
    var cloneCP = cPecas.cloneNode(true);
    var id = cPecas.getAttribute("id");
    container.removeChild(document.getElementById(id));
    container.appendChild(cloneCP);
    return container.lastChild;
}

// LOCAL CORRETO DE CADA PEÇA
var origX = [200, 292, 383, 474, 200, 292, 383, 474, 200, 292, 383, 474, 200, 292, 383, 474];
var origY = [50, 50, 50, 50, 165, 165, 165, 165, 280, 280, 280, 280, 393, 393, 393, 393];

function unir(){
    for(var i = 0; i < pecas.length; i++){
        if(Math.abs(currentPosX-origX[i]) < 15 && Math.abs(currentPosY-origY[i]) < 15){
            elementSelect.style.left = origX[i] + "px";
            elementSelect.style.top = origY[i] + "px";
        }
    }
}

function verificar(){
    var encaixadas = 0;
    var cPecas = document.getElementsByClassName('contPecas');
    for(var i = 0; i < pecas.length; i++){
        var posX = parseFloat(cPecas[i].style.left);
        var posY = parseFloat(cPecas[i].style.top);
        var id = cPecas[i].getAttribute("id");
        if(origX[id] == posX && origY[id] == posY && Number.isInteger(rotation[id]/360)){
            encaixadas += 1;
        }
    }
    if(encaixadas == pecas.length){
        for(var i = 0; i < pecas.length; i++){
        }
        alert("CONGRATULATIONS");
    }
}