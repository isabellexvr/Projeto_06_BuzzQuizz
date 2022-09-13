const tela3 = document.querySelector('.tela3'),
formQuizz = tela3.querySelector(".tela-08"),
formQuizzNPerguntas = formQuizz.querySelector("input:nth-child(3)"),
formQuizzNNiveis = formQuizz.querySelector("input:nth-child(4)"),
criaPerguntas = tela3.querySelector(".tela-09"),
criaNiveis = tela3.querySelector(".tela-10"),
acessaQuizz = tela3.querySelector(".tela-11");


let userQuizz = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}

function criarPerguntas(){
	const formQuizzTitulo = formQuizz.querySelector("input:nth-child(1)"),
	formQuizzUrlTitulo = formQuizz.querySelector("input:nth-child(2)");
	if (formQuizzTitulo.value.length >= 20 && formQuizzTitulo.value.length <= 65){
		userQuizz.title = formQuizzTitulo.value;
	}else{
		return alert("Numéro de caracteres do título deve ser entre 20 e 65");
	}
	if(checkUrl(formQuizzUrlTitulo.value)){
		userQuizz.image = formQuizzUrlTitulo.value;
	}else{
		return alert("Url inválida");
	}
	if (formQuizzNPerguntas.value < 3){
		return alert("Quantidade de perguntas no mínimo 3")
	}
	if(formQuizzNNiveis.value < 2){
		return alert("No mínimo 2 níveis")
	}
	renderizarFormPerguntas()
	formQuizz.classList.add('hide')
	criaPerguntas.classList.remove('hide')
}

function finalizarQuizz(){
	for(let i=0; i<formQuizzNNiveis.value; i++){
		const formNivel = criaNiveis.querySelector(`.form-nivel${i+1}`),		
		titulotNivel = formNivel.querySelector(`input:nth-child(2)`),
		acertoMinimo = formNivel.querySelector(`input:nth-child(3)`),
		urlImg = formNivel.querySelector(`input:nth-child(4)`),
		descricaoNivel = formNivel.querySelector("textarea");

		if(titulotNivel.value.length < 20){
			return alert("O título dever ter no mínimo 3 caracteres")
		}
		
		if (!(acertoMinimo.value >= 0) || !(acertoMinimo.value <= 100)){
			return alert("A porcentagem de acertos deve ser entre 0 e 100")
		}
		if(!checkUrl(urlImg.value)){
			return alert("Url inválida");
		}
		if(descricaoNivel.value.length < 20){
			return alert("A descrição dever ter no mínimo 6 caracteres")
		}
		userQuizz.levels[i] = {
			title: titulotNivel.value,
			image: urlImg.value,
			text: descricaoNivel.value,
			minValue: acertoMinimo.value
		}
		console.log(userQuizz.levels)
	}

	postQuizz()
	criaNiveis.classList.add('hide')
	acessaQuizz.classList.remove('hide')
}

function criarNiveis(){	
	
	for(let i=0; i<formQuizzNPerguntas.value; i++){
		const formPergunta = criaPerguntas.querySelector(`.form-pergunta${i+1}`),		
		textoPergunta = formPergunta.querySelector(".text"),
		corPergunta = formPergunta.querySelector(".color"),
		respostaCerta = formPergunta.querySelector(".right"),
		urlRespostaCerta = formPergunta.querySelector(".right-url"),
		respostaErrada1 = formPergunta.querySelector(".wrong1"),
		urlRespostaErrada1 = formPergunta.querySelector(".wrong1-url"),
		respostaErrada2 = formPergunta.querySelector(".wrong2"),
		urlRespostaErrada2 = formPergunta.querySelector(".wrong2-url"),
		respostaErrada3 = formPergunta.querySelector(".wrong3"),
		urlRespostaErrada3 = formPergunta.querySelector(".wrong3-url"),
		CP = corPergunta.value;
		if (textoPergunta.value.length < 20){
			return alert("Numéro de caracteres da pergunta deve ser maior que 20");
		}
		if (CP.length !== 7){
			return alert("cor inválida")
		}else {
			if(CP[0]!=="#"){
				return alert("cor inválida")
			}
			for (let i=1; i <= 6; i++ )
			if (CP[i]>=0 || CP[i] === "A" || CP[i] === "B" || CP[i] === "C" || CP[i] === "D" || CP[i] === "E" || CP[i] === "F" || CP[i] === "a" || CP[i] === "b" || CP[i] === "c" || CP[i] === "d" || CP[i] === "e" || CP[i] === "f"){
			}else{
				return alert("cor inválida")
			}
		}
		if(respostaCerta.value === ""){
			return alert("Campo de resposta deve ser preenchido." )
		}
		if(!checkUrl(urlRespostaCerta.value)){
			return alert("Url inválida");
		}

		userQuizz.questions[i].title = textoPergunta.value;
		userQuizz.questions[i].color = corPergunta.value;
		userQuizz.questions[i].answers[0] = {
			text: respostaCerta.value,
			image: urlRespostaCerta.value,
			isCorrectAnswer: true
		}
		if(respostaErrada1.value !== "" && checkUrl(urlRespostaErrada1.value) ){
			userQuizz.questions[i].answers[1] = {
				text: respostaErrada1.value,
				image: urlRespostaErrada1.value,
				isCorrectAnswer: false
			}
		}else {
			return alert("Precisa preencher pelo menos a primeira resposta incorreta")
		}
		if(respostaErrada2.value !== "" && checkUrl(urlRespostaErrada2.value) ){
			userQuizz.questions[i].answers[2] = {
				text: respostaErrada2.value,
				image: urlRespostaErrada2.value,
				isCorrectAnswer: false
			}
		}
		if(respostaErrada3.value !== "" && checkUrl(urlRespostaErrada3.value) ){
			userQuizz.questions[i].answers[3] = {
				text: respostaErrada3.value,
				image: urlRespostaErrada3.value,
				isCorrectAnswer: false
			}
		}

		console.log(userQuizz)
	}

	console.log(userQuizz)
	renderizarFormNiveis()
	criaPerguntas.classList.add('hide')
	criaNiveis.classList.remove('hide')
}

function renderizarFormPerguntas(){
	criaPerguntas.innerHTML = `<h2>Crie suas perguntas</h2>`;
	for(let i=0; i<formQuizzNPerguntas.value; i++){
	let formPerguntas =  `<div class="perguntas pergunta-0${i+1}">
							<h3>Pergunta ${i+1}</h3> 
							<img data-identifier="expand" class="icon" onclick="showPergunta(${i+1})" src="./imagens/Vector.png" alt="">
						</div>
						<section data-identifier="question-form" class="form-pergunta${i+1} hide">
							<h3>Pergunta ${i+1}</h3>
							<input class="text" type="text" placeholder="Texto da pergunta" />
							<input class="color" type="text" placeholder="Cor de fundo da pergunta" />
							<h3>Resposta correta</h3>
							<input class="right" type="text" placeholder="Resposta correta" />
							<input class="right-url" type="text" placeholder="URL da imagem" />
							<h3>Respostas incorretas</h3>
							<input class="wrong1" type="text" placeholder="Resposta incorreta 1" />
							<input class="wrong1-url" type="text" placeholder="URL da imagem 1" />
							<div class="separador"></div>
							<input class="wrong2" type="text" placeholder="Resposta incorreta 2" />
							<input class="wrong2-url" type="text" placeholder="URL da imagem 2" />
							<div class="separador"></div>
							<input class="wrong3" type="text" placeholder="Resposta incorreta 3" />
							<input class="wrong3-url" type="text" placeholder="URL da imagem 3" />
						</section>`;
			
		criaPerguntas.innerHTML += formPerguntas;
	}
	criaPerguntas.innerHTML += `<button onclick="criarNiveis()">
									Prosseguir pra criar níveis
								</button>`;

}

function renderizarFormNiveis(){
	criaNiveis.innerHTML =`<h2>Agora, decida os níveis</h2>`;
	for(let i=0; i<formQuizzNNiveis.value; i++){
		let formNiveis = `<div class="niveis nivel-0${i+1}">
			<h3>Nivel ${i+1}</h3> <img data-identifier="expand" class="icon" onclick="showNivel(${i+1})" src="./imagens/Vector.png"
				alt="">
		</div>
		<section data-identifier="level" class="form-nivel${i+1} hide">
			<h3>Nível ${i+1}</h3>
			<input type="text" placeholder="Título do nível" />
			<input type="text" placeholder="% de acerto mínima" />
			<input type="text" placeholder="URL da imagem do nível" />
			<textarea cols="30" rows="10" placeholder="Descrição do nível"></textarea>
		</section>`;
		criaNiveis.innerHTML += formNiveis;
	}
	criaNiveis.innerHTML += `<button onclick="finalizarQuizz()">
								Finalizar Quizz
							</button>`;
}

function checkUrl(string) {
	try {
	 let url = new URL(string)
	 return true
   } catch(err) {
	   return false
   }
 }


function acessarQuizz(){
	acessaQuizz.classList.add('hide')
	formQuizz.classList.remove('hide')
}

function showPergunta(p){
	const pergunta = document.querySelector(`.pergunta-0${p}`),
	formPergunta = document.querySelector(`.form-pergunta${p}`);
	pergunta.classList.add('hide')
	formPergunta.classList.remove('hide')
}

function showNivel(n){
	const nivel = document.querySelector(`.nivel-0${n}`),
	formNivel = document.querySelector(`.form-nivel${n}`);
	nivel.classList.add('hide')
	formNivel.classList.remove('hide')
}

function criarQuizz(){
	acessaQuizz.classList.add('hide')
	formQuizz.classList.remove('hide');
	irParaTela3 ();
}

function irParaTela1() {
	document.location.reload(true);
}

function postQuizz(){
	const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', userQuizz);
    promessa.then(quizzCriado);
    promessa.catch(deuErro);
}

function quizzCriado(quizz){
	
	const img = quizz.data.image;
	idsQuizzesUser.push(quizz.data.id);
	console.log("idsQuizzesUser = "+idsQuizzesUser)
	localStorage.setItem('idsQuizzes', JSON.stringify(idsQuizzesUser));
	acessaQuizz.innerHTML = `<h2>Seu quizz está pronto!</h2>
		                    <section>
		                        <img src="${img}" alt="">
								<div class="gradient"></div>
		                        <div class="quizz_title">
		                            <h1>${quizz.data.title}</h1>
		                        </div>
		                    </section>
		                    <button onclick="jogar(${quizz.data.id})">Acessar Quizz</button>
		                    <button onclick="irParaTela1()">Voltar pra home</button>`;
						
}

function deuErro(err){
    console.log(err);
}
