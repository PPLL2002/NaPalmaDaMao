function showResposta(evt, texto, img, tamanho){
    //VERIFICAR SE TEM ALGUM POPUP ABERTO, CASO TENHA FECHA O POPUP
    if(document.getElementById('resposta') != null){
        closeResposta();
    }
    //CRIA A DIV
    var divisor = document.createElement("DIV");
    var closeDivisor = document.createElement("A");
    if(img){
        var conteudo = document.createElement("IMG")
        conteudo.setAttribute('src',texto);
        conteudo.setAttribute('width', tamanho);
    }
    else{
        var conteudo = document.createElement("SPAN")
        conteudo.innerHTML = texto;
    }
    closeDivisor.innerHTML = 'X'; 
    closeDivisor.style.fontFamily = 'verdana';
    closeDivisor.style.display = 'block';
    closeDivisor.style.width = '10px';
    closeDivisor.style.position = 'relative';
    closeDivisor.style.cursor = 'pointer';
    divisor.setAttribute('id', 'resposta');
    divisor.style.left = evt.target.parentNode.offsetLeft + 'px';
    //ADICIONA O EVENTO DE CLICK A DIV
    closeDivisor.setAttribute('onclick', 'closeResposta()');
    divisor.appendChild(closeDivisor);
    divisor.appendChild(conteudo);
    document.body.appendChild(divisor);
    closeDivisor.style.left = (divisor.clientWidth - 35) + 'px';
    divisor.style.top = (evt.target.offsetTop + 50) + 'px';
}

function closeResposta(){
    var node = document.getElementById("resposta");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}