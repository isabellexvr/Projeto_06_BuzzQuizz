
let idsQuizzesUser=[];
if(JSON.parse(localStorage.getItem('idsQuizzes')) !== null){
    idsQuizzesUser = JSON.parse(localStorage.getItem('idsQuizzes'));
};

function pegarQuizzesAPI () {
const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promessa.then(renderizarQuizzesAPI)
}


function renderizarQuizzesAPI(quizzes) {
    const quizzesArr = quizzes.data
    const divquizzContainer = document.querySelector('.allQuizzes .quizz_container')

    for (i = 0; i < quizzesArr.length; i++) {
        let divQuizz = `<div onclick="jogar(${quizzesArr[i].id})" class="quizz">
                            <div class="quizz_content">
                                <img class="" src="${quizzesArr[i].image}" alt="">
                                <div class="gradient">
                                    <div class="quizz_title">
                                        <h1>${quizzesArr[i].title}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        divquizzContainer.innerHTML += divQuizz
    }

}
pegarQuizzesAPI()
function pegarQuizzesUser () {

    for (i=0; i<idsQuizzesUser.length; i++) {
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idsQuizzesUser[i]}`)
        promessa.then(renderizarQuizzesUser)
    }
}

const empty = document.querySelector(".tela1 .emptyQuizzes")
const userQuizzes = document.querySelector(".tela1 .userQuizzes")

    if (idsQuizzesUser.length >= 1) {
        empty.classList.add("hide")
        userQuizzes.classList.remove("hide")



function renderizarQuizzesUser (resposta) {
    const quizz = resposta.data
    const divquizzContainer = document.querySelector('.userQuizzes .quizz_container')

    let divQuizz = `<div onclick="jogar(${quizz.id})" class="quizz">
                        <div class="quizz_content">
                            <img class="" src="${quizz.image}" alt="">
                            <div class="gradient">
                                <div class="quizz_title">
                                    <h1>${quizz.title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>`;
    divquizzContainer.innerHTML += divQuizz
    }
}

function irParaTela3() {
    const tela1 = document.querySelector('.tela1')
    const tela3 = document.querySelector('.tela3')

    tela1.classList.add('hide')
    tela3.classList.remove('hide')
}

function irParaTela2() {
    const tela1 = document.querySelector('.tela1')
    const tela2 = document.querySelector('.tela2')
    const tela3 = document.querySelector('.tela3')


    tela1.classList.add('hide')
    tela3.classList.add('hide')
    tela2.classList.remove('hide')
}


pegarQuizzesUser()