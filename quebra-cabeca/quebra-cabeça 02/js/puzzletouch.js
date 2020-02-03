//VARIAVEIS
var sobra = 2;
var pecas = document.querySelectorAll('.movel');
var answer = document.querySelectorAll('.answer');
var confirmarBtn = document.querySelector('.confirmarBtn');

// TAMANHO DAS PEÇAS 
var tamW = [206, 206, 206, 206, 206]
var tamH = [50, 50, 50, 50, 50]
var pY = [0,1,2,3,4]

function numeroAleatorios(){
    while(pY.length < pecas.length){
        var aleatorio = Math.floor(Math.random() * pecas.length);
        if(pY.indexOf(aleatorio) == -1) pY.push(aleatorio);
    }
}
//numeroAleatorios();

// DISTRIBUIÇÃO DAS PEÇAS NA TELA
for(var i=0; i< pecas.length; i++){
    answer[i].setAttribute("style","display:none;");
    answer[i].setAttribute("x", 662.5);
    answer[i].setAttribute("y", 172 + (83 * i));
    pecas[i].setAttribute("width", tamW[i]);
    pecas[i].setAttribute("height", tamH[i]);
    pecas[i].setAttribute("x", Math.floor((Math.random() * 30) + 25));
    pecas[i].setAttribute("y", 90 + (50 * pY[i]));
    pecas[i].setAttribute("ontouchstart", "selecionarElemento(evt)");
}


var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function selecionarElemento(evt){
    elementSelect = reordernar(evt);
    currentX = evt.touches[0].clientX;
    currentY = evt.touches[0].clientY;
    currentPosX = parseFloat(elementSelect.getAttribute("x"));
    currentPosY = parseFloat(elementSelect.getAttribute("y"));
    limparCorrecao();
    elementSelect.setAttribute("ontouchmove", "moverElemento(evt)");
}

function moverElemento(evt){
    var dx = evt.touches[0].clientX - currentX;
    var dy = evt.touches[0].clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.touches[0].clientX;
    currentY = evt.touches[0].clientY;
    elementSelect.setAttribute("ontouchend", "deselecionarElemento(evt)")
    elementSelect.setAttribute("ontoucancel", "deselecionarElemento(evt)")
    unir();
}

function deselecionarElemento(evt){
    if(elementSelect != 0){
        elementSelect.removeAttribute("ontouchmove");
        elementSelect.removeAttribute("ontouchend");
        elementSelect.removeAttribute("ontoucancel");
        elementSelect = 0;
    }
}

function limparCorrecao(){
    var cPecas = document.getElementsByClassName('containerPec');
    for(var i = 0; i < pecas.length; i++){
        cPecas[i].childNodes[1].setAttribute("style", "display: none;");
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

// LOCAL CORRETO DE CADA PEÇA
var origX = [450, 450, 450];
var origY = [156, 240, 324];

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
            cPecas[i].childNodes[1].setAttribute("style", "display:block;");
            cPecas[i].childNodes[1].setAttribute("href", "imagens/correct-symbol.png");
        }
        else if(id <= (pecas.length - 1) - sobra)
        {
            cPecas[i].childNodes[1].setAttribute("style", "display:block;");
            cPecas[i].childNodes[1].setAttribute("href", "imagens/cancel-mark.png");
        }
    }
    if(encaixadas == pecas.length - sobra){
        confirmarBtn.value = 'Tente Novamente';
        confirmarBtn.style.width = '120px';
        confirmarBtn.style.backgroundColor = '#b1b1b1';
        confirmarBtn.style.border = '2px solid red;'
        confirmarBtn.setAttribute('onclick', 'location.reload()')
    }
}