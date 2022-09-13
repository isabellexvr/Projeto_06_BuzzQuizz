let idDoJogo;

function jogar(id) {
    idDoJogo = id;
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`) // trocar o numero fixo pelo id do quizz  
    quizz.then(renderizarQuizz)
    irParaTela2()
}

let perguntas;
let quantasPerguntas;
let níveis;


function renderizarQuizz(quizz) {

    const divTela2 = document.querySelector(".tela2");
    divTela2.innerHTML = "";

    let objetoQuizz = quizz.data

    níveis = objetoQuizz.levels

    perguntas = objetoQuizz.questions

    let addBanner = document.querySelector(".tela2")
    addBanner.innerHTML += `
         <div class="banner">
         <img src="${objetoQuizz.image}"/>
            <div class="gradient">
                <h2>${objetoQuizz.title}</h2>
            </div>
          </div>
    `;

    for (i = 0; i < perguntas.length; i++) {

        let divQuestions = `<div class="questions">
                                <div class="question" style="background-color:${perguntas[i].color}">
                                    <h3>${perguntas[i].title}</h3>
                                </div>
                                <div class="organizar">
                                    <div class="options">
                                    </div>
                                </div>
                                </div>
                            </div>`;
        divTela2.innerHTML += divQuestions

        respostasDaPergunta = perguntas[i].answers

        respostasDaPergunta.sort(embaralhador)

        quantasPerguntas = respostasDaPergunta.length

        respostasDaPergunta.forEach(renderizarPerguntas)
    }


}

function embaralhador() {
    return Math.random() - 0.5;
}

function renderizarPerguntas(item) {

    const divsOptions = document.querySelectorAll(".options");

    let span = `
    <span class="${item.isCorrectAnswer}" onclick="selecao(this)">
                    <img src="${item.image}"/>
                    <p>${item.text}</p>
                </span>`;

    divsOptions[i].innerHTML += span;

}

const perguntasSelecionadas = [];


function selecao(divSelecionada) {

    console.log(divSelecionada.parentNode)

    if (divSelecionada.classList.contains("true")) {
        divSelecionada.classList.add("acertou")
    } else {
        divSelecionada.classList.add("errou")
    }

    const divOrganizar = divSelecionada.parentNode

    for (i = 0; i < quantasPerguntas; i++) {
        const todosSpan = divOrganizar.children[i]
        todosSpan.classList.add("naoSelecionado")
    }

    divSelecionada.classList.remove("naoSelecionado")
    divOrganizar.classList.add("inativa")


    const divsOptions = document.querySelectorAll(".options")

    for (i = 1; i < divsOptions.length; i++) {
        if (divsOptions[i].classList.contains("inativa")) {
            perguntasSelecionadas.push(divsOptions[i])
        }
    }

    setTimeout(scroll,2000)
    fimDeQuizz()
}

function scroll() {
   const opçoes = document.querySelectorAll(".options")

   for (i=0; i<opçoes.length; i++) {
    if (opçoes[i].classList.contains("inativa")) {
        let proxima = opçoes[i+1]
        proxima.scrollIntoView()
    }
   }
}

function fimDeQuizz() {

    const divsOrganizar = document.querySelectorAll(".organizar")

    if (divsOrganizar.length === perguntasSelecionadas.length) {
        const tela2 = document.querySelector(".tela2")

        const acertos = document.querySelectorAll(".acertou")

        let porcentagem = (acertos.length * 100) / perguntasSelecionadas.length

        if (porcentagem > níveis[níveis.length - 1]) {
            let resultado = `<div class="result">
                                    <div class="resultTitle">
                                        <h3>${Math.round(porcentagem)}% de Acerto: ${níveis[níveis.length - 1].title}</h3>
                                    </div>
                                    <div class="resultContent">
                                        <img src="${níveis[níveis.length - 1].image}" />
                                        <p>${níveis[níveis.length - 1].text}</p>
                                    </div>
                                </div>`;
            tela2.innerHTML += resultado
        } else if (porcentagem > níveis[níveis.length - 2]) {
            let resultado = `<div class="result">
                            <div class="resultTitle">
                            <h3>${Math.round(porcentagem)}% de Acerto: ${níveis[níveis.length - 2].title}</h3>
                            </div>
                            <div class="resultContent">
                                <img src="${níveis[níveis.length - 2].image}" />
                                <p>${níveis[níveis.length - 2].text}</p>
                            </div>
                        </div>`;
            tela2.innerHTML += resultado
        } else {
            let resultado = `<div class="result">
                            <div class="resultTitle">
                            <h3>${Math.round(porcentagem)}% de Acerto: ${níveis[0].title}</h3>
                            </div>
                            <div class="resultContent">
                                <img src="${níveis[0].image}" />
                                <p>${níveis[0].text}</p>
                            </div>
    </div>`;
            tela2.innerHTML += resultado
        }

        botoes()
    }

}

function botoes() {

    const tela2 = document.querySelector(".tela2")

    const divsOptions = document.querySelectorAll(".options")

    if (perguntasSelecionadas.length === divsOptions.length) {

        let botoes = `<div class="buttons">
                        <button class="button1" onclick="jogar(${idDoJogo}); rolarPraCima();">Reiniciar Quizz</button>
                        <button class="button2" onclick="irParaTela1()">Voltar para home</button>
                    </div>`
        tela2.innerHTML += botoes

        let botoes2 = document.querySelector(".buttons")
        botoes2.scrollIntoView()
    }
}

function rolarPraCima() {
    window.scrollTo(0, 0);
}