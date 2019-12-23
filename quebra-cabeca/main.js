var pecas = document.querySelectorAll('.movel');

var tamW = [161, 161, 161, 161, 161, 161, 161, 161, 161]
var tamH = [161, 161, 161, 161, 161, 161, 161, 161, 161]

for(var i=0; i< pecas.length; i++){
    pecas[i].setAttribute("width", tamW[i]);
    pecas[i].setAttribute("height", tamH[i]);
    pecas[i].setAttribute("x", Math.floor((Math.random() * 10) +1));
    pecas[i].setAttribute("y", Math.floor((Math.random() * 450) +1));
    pecas[i].setAttribute("onmousedown", "selecionarElemento(evt)");
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
    currentPosX = parseFloat(elementSelect.getAttribute("x"));
    currentPosY = parseFloat(elementSelect.getAttribute("y"));
    elementSelect.setAttribute("onmousemove", "moverElemento(evt)");
}

function moverElemento(evt){
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout", "deselecionarElemento(evt)")
    elementSelect.setAttribute("onmouseup", "deselecionarElemento(evt)")
    unir();
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
    var cPecas = evt.target.parentNode;
    var cloneCP = cPecas.cloneNode(true);
    var id = cPecas.getAttribute("id");
    container.removeChild(document.getElementById(id));
    container.appendChild(cloneCP);
    
    return container.lastChild.firstChild;
}

var origX = [200, 361, 522, 200, 361, 522, 200, 361, 522];
var origY = [100, 100, 100, 261, 261, 261, 420, 420, 420];

function unir(){
    for(var i = 0; i < pecas.length; i++){
        if(Math.abs(currentPosX-origX[i]) < 15 && Math.abs(currentPosY-origY[i]) < 15){
            elementSelect.setAttribute("x", origX[i]);
            elementSelect.setAttribute("y", origY[i]);
        }
    }
}

function verificar(){
    var encaixadas = 0;
    var cPecas = document.getElementsByClassName('containerPec');
    for(var i = 0; i < pecas.length; i++){
        var posX = parseFloat(cPecas[i].firstChild.getAttribute("x"));
        var posY = parseFloat(cPecas[i].firstChild.getAttribute("y"));
        var id = cPecas[i].getAttribute("id");
        if(origX[id] == posX && origY[id] == posY){
            encaixadas += 1;
            console.log(encaixadas);
        }
    }
    if(encaixadas == 9){alert("CONGRATULATIONS");}
}
