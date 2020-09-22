/* GABARITO ----------------------------------*/
var R = [2, 3, 20, 0, 6, 27, 47, -23, 12, -8];
/* -------------------------------------------*/

//Variável com o tamanho do gabarito
var nQuestoes = R.length;

// Variáveis correspondente as respostas
var acertos = 0;
var erros = 0;
var vazias = 0;

//Mensagens
var m01 = document.getElementById("m01");
var m02 = document.getElementById("m02");
var m03 = document.getElementById("m03");

function ocultarMensagens(){
    m01.style.display = "none";
    m02.style.display = "none";
    m03.style.display = "none";
}

//Verifica se a resposta está correta e insere a correcao
function verificarRespostas(){
    for(let i = 1; i <= nQuestoes; i++){
        var elemento = document.querySelector("span#rs0"+i);   
        var resposta = document.getElementById("0"+i);
        elemento.innerHTML = "";
        var img = document.createElement("img");
        elemento.appendChild(img);
        if(resposta.value != ""){
            if(R[i-1] == resposta.value){
                img.setAttribute("src", "imagens/correct-symbol.png");
                resposta.disabled = true;
                acertos++;
            }
            else{
                img.setAttribute("src", "imagens/cancel-mark.png");
                erros++;
            }
        }
        else if(resposta.value == " " || resposta.value == "") vazias++;
    }
}
//EXIBIR MENSAGEM
function exibirMensagem(){
    ocultarMensagens();
    // Não digitou em todas as caixas
    if(vazias > 0){
        m01.style.display = "block";
    }
    //Acertou todas
    else if(acertos == nQuestoes){
        m02.style.display = "block";
    }
    // Digitou em todas as caixas, mas não acertou todas
    else{
        m03.style.display = "block";
    }
}


//Limpar a resposta
function limparRespostas(){
    for(let i = 1; i <= nQuestoes; i++){
        var caixa = document.getElementById("0"+i);
        if(caixa.value == R[i-1])caixa.disabled = true;
        else{
            caixa.disabled = false;
            var avaliacao = document.getElementById("rs0"+i);
            avaliacao.innerHTML = "";
            caixa.value = "";
        } 
    }
}

var verificar = document.querySelector("input#confirmar");
var tenteNovamente = document.querySelector("input#tente-novamente");
var refazer = document.querySelector("input#refazer");

tenteNovamente.onclick = function(){
    limparRespostas();
    ocultarMensagens();
    verificar.style.display = "inline-block"
    tenteNovamente.style.display = "none";
}

refazer.onclick = function(){
    for(let i = 1; i <= nQuestoes; i++){
        var caixa = document.getElementById("0"+i);
        caixa.disabled = false;
        var avaliacao = document.getElementById("rs0"+i);
        avaliacao.innerHTML = "";
        caixa.value = "";
    }
    ocultarMensagens();
    verificar.style.display = "inline-block"
    tenteNovamente.style.display = "none";
    refazer.style.display = "none";
}

verificar.onclick = corrigir;

function corrigir(){
    acertos = 0;
    erros = 0;
    vazias = 0;
    verificarRespostas();
    if(acertos != nQuestoes){
        tenteNovamente.style.display = "inline-block";
        verificar.style.display = "none";
    }
    if(acertos == nQuestoes){
        refazer.style.display = "inline-block";
        verificar.style.display = "none";
    }
    exibirMensagem();
    travarTodas();
}

function travarTodas(){
    for(let i = 1; i <= nQuestoes; i++){
        var caixa = document.getElementById("0"+i);
        caixa.disabled = true;
    }
}

var inputs = document.querySelectorAll("input[type='text']");

inputs.forEach(element => {
    element.addEventListener("keydown", (e) =>{
        if(e.keyCode == 13)corrigir();
    })
});