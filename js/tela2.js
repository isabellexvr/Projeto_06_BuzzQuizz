let obj
let quizz
let perguntas
let questions = []
let options = []

function jogar(id) {
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`) // trocar o numero fixo pelo id do quizz  
    quizz.then(renderizaquizz)
    irParaTela2()
}

function renderizaquizz(quizz) {
    console.log(quizz.data); //tras um quizz especifico

    obj = quizz.data;

    let addBanner = document.querySelector(".tela2")
    addBanner.innerHTML += `
         <div class="banner">
         <img src="${obj.image}"/>
            <div class="gradient">
                <h2>${obj.title}</h2>
            </div>
          </div>
    `

    perguntas = obj.questions;

    for (let i = 0; i < obj.questions.length; i++) {

        let questions = document.querySelector(".tela2")
        questions.innerHTML += `
        <div class="questions">
            <div class="question" style="background-color:${perguntas[i].color}">
                <h3>${perguntas[i].title}</h3>
            </div>
            <div class="options"></div>
        </div>
        `
    }
    addOptions()
}

function addOptions() {


    for (i = 0; i < perguntas.length; i++) {

        answers = perguntas[i].answers
        let a = perguntas[i].answers
        console.log(a)

        let options = document.querySelectorAll(".options")

        for (let i = 0; i < options.length; i++) {
            for (i = 0; i < a.length; i++) {
                options[i].innerHTML += `
            <span>
                <img src="${a[i].image}" />
                <p>${a[i].text}</p>
            </span>
            `
            }

        }
    }
}

function misturar() { return Math.random() - 0.5 }

function reiniciarQuizz() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}
