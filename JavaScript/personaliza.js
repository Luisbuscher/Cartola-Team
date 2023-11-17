const objetoPrincipal = document.getElementById('objetoPrincipal'); //Div onde está o objeto principal;
const selectCores = document.getElementById('selectCores'); //Botão para mudar para a "aba" cores;
const selectEstilos = document.getElementById('selectEstilos'); //Botão para mudar para a "aba" estilos;
const buttonCores = document.getElementsByClassName('cores'); //Todos botãos de cores;
const avancar = document.getElementById('avancar'); //Botao de avancar;
const anterior = document.getElementById('return'); //Botao de voltar;
var corSelecionada, sessao=0; //Variavel para armazenar a cor que foi clicada no botão das cores e para saber em qual sessao está;
var camisetaSelecionada, escudoSelecionado;//Variaveis que vão salvar as modificações feitas na camiseta e no escudo;

// Seleciona todos os objetos SVG na página
const camisetaSVG = document.querySelectorAll(".camiseta");

// Adiciona um listener de evento "load" a cada objeto SVG
camisetaSVG.forEach((objetoSVG) => {
  objetoSVG.addEventListener("load", function () {
    // Seleciona o elemento SVG dentro do objeto
    const svg = objetoSVG.contentDocument.querySelector("svg");
    
    // Adiciona um listener de evento "click" ao elemento SVG
    svg.addEventListener("click", function () {
      // Código que deve ser executado quando o elemento é clicado
      const id = objetoSVG.id;
      //console.log(`Objeto SVG clicado: ${id}`);
      objetoPrincipal.data = `/Cartola/img/camisetas/${id}`;
    });
  });
});

// Seleciona todos os objetos SVG na página
const escudoSVG = document.querySelectorAll(".escudo");

// Adiciona um listener de evento "load" a cada objeto SVG
escudoSVG.forEach((objetoSVG) => {
  objetoSVG.addEventListener("load", function () {
    // Seleciona o elemento SVG dentro do objeto
    const svg = objetoSVG.contentDocument.querySelector("svg");
    
    // Adiciona um listener de evento "click" ao elemento SVG
    svg.addEventListener("click", function () {
      // Código que deve ser executado quando o elemento é clicado
      const id = objetoSVG.id;
      //console.log(`Objeto SVG clicado: ${id}`);
      objetoPrincipal.data = `/Cartola/img/escudos/${id}`
    });
  });
});

selectCores.addEventListener('click', () => {
  const camiseta = document.getElementsByClassName('camiseta'); 
  const cores = document.getElementsByClassName('cores');
  const escudo = document.getElementsByClassName('escudo');

  for (let i = 0; i < camiseta.length; i++) {
    camiseta[i].style.display = 'none';
  }
  for (let i = 0; i < escudo.length; i++) {
    escudo[i].style.display = 'none';
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].style.display = 'block';
  }
})

selectEstilos.addEventListener('click', () => {
  const camiseta = document.getElementsByClassName('camiseta');
  const cores = document.getElementsByClassName('cores');
  const escudo = document.getElementsByClassName('escudo');

  if(sessao == 0){
    for (let i = 0; i < camiseta.length; i++) {
      camiseta[i].style.display = 'block';
    }
  }else{
    for (let i = 0; i < escudo.length; i++) {
      escudo[i].style.display = 'block';
    }
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].style.display = 'none';
  }
  corSelecionada = '';
})

// Convertendo HTMLCollection para Array, pois estava dando erro ao utilizar ele diretamente no forEach;
Array.from(buttonCores).forEach(botao => {
  botao.addEventListener('click', () => {
    const cor = botao.style.backgroundColor;
    corSelecionada = cor;
  });
});

objetoPrincipal.addEventListener('load', () => {
  const svg = objetoPrincipal.contentDocument.querySelector('svg')

  svg.addEventListener("click", function (evento) {
    // Seleciona o elemento específico do SVG que foi clicado
    const elementoClicado = evento.target;
    // Modifica a cor da parte clicada com mouse;
    elementoClicado.style.fill = corSelecionada;

    //console.log("Você clicou em:", elementoClicado);
    //console.log(objetoPrincipal);
    if(sessao == 0){
      camisetaSelecionada = document.querySelector("object#objetoPrincipal").contentDocument.querySelector("svg"); //Salva o svg completo da camiseta cada vez que faz uma modificação caso esteja na sessao "0" que é da camiseta;
    }else{
      escudoSelecionado = document.querySelector("object#objetoPrincipal").contentDocument.querySelector("svg");  //Salva o svg completo do escudo cada vez que faz uma modificação caso esteja na sessao "1" que é do escudo;
    }
  });
})

avancar.addEventListener('click', () => {
  if(sessao == 1){
    verificarNomeDoTime()
  }
  const camiseta = document.getElementsByClassName('camiseta');
  const cores = document.getElementsByClassName('cores');
  const escudo = document.getElementsByClassName('escudo');
  const divNomeDoTime = document.getElementById('divNomeDoTime');

  for (let i = 0; i < camiseta.length; i++) {
    camiseta[i].style.display = 'none';
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].style.display = 'none';
  }
  for (let i = 0; i < escudo.length; i++) {
    escudo[i].style.display = 'block';
  }
  avancar.innerHTML = 'SALVAR';
  objetoPrincipal.data = `/Cartola/img/escudos/escudo1.svg`;
  divNomeDoTime.style.display = 'block';
  anterior.disabled = false; anterior.style.backgroundColor = 'rgb(214, 54, 54)'; //Habilita o botão para voltar e muda sua cor para vermelho;
  corSelecionada = ''; sessao = 1; //Sessão 0 significa que está na primeira sessão, sessão 1 significa que está na segunda sessão;
})

anterior.addEventListener('click', () => {
  const camiseta = document.getElementsByClassName('camiseta');
  const cores = document.getElementsByClassName('cores');
  const escudo = document.getElementsByClassName('escudo');
  const divNomeDoTime = document.getElementById('divNomeDoTime');

  for (let i = 0; i < camiseta.length; i++) {
    camiseta[i].style.display = 'block';
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].style.display = 'none';
  }
  for (let i = 0; i < escudo.length; i++) {
    escudo[i].style.display = 'none';
  }

  avancar.innerHTML = 'AVANÇAR';
  objetoPrincipal.data = `/Cartola/img/camisetas/camiseta.svg`;
  anterior.disabled = true; anterior.style.backgroundColor = 'grey'; //Desabilita o botão para voltar e muda sua cor para cinza;
  corSelecionada = ''; sessao = 0; //Sessão 0 significa que está na primeira sessão, sessão 1 significa que está na segunda sessão;
  divNomeDoTime.style.display = 'none';
})

//VERIFICA NO BANCO DE DADOS SE O NOME DO TIME JA EXISTE:
function verificarNomeDoTime(){
  let name = document.getElementById('nameTeam').value
  if(name.length < 4){ return alert('NOME INVÁLIDO') }

  $(document).ready(function(){
    $.ajax({
      url: '/Cartola/server/server.php',
      type: 'POST',
      data: {
        action: 'verificarNomeTime'
      },
      success: function(response){
        response = JSON.parse(response);
        for(let i = 0; i < response.length; i++){
          if(response[i].nome == name){
            return alert('NOME DO TIME JÁ UTILIZADO');
          }
        }
        saveEdit(name);
      }
    })
  })
}

//ENVIA OS DADOS PARA O BANCO DE DADOS
function saveEdit(nameTeam){
  const serializer = new XMLSerializer(); // Cria um objeto XMLSerializer
  var svgObject = camisetaSelecionada; // Seleciona o objeto SVG
  let camisetaSVG = serializer.serializeToString(svgObject); // Converte o objeto em uma string
  svgObject = escudoSelecionado;
  let escudoSVG = serializer.serializeToString(svgObject);
  $(document).ready(function() {
    $.ajax({
        url: "/Cartola/server/server.php",
        type: "POST",
        data: {
            action: 'salvar_clube',
            camiseta: `${escudoSVG}`,
            escudo: `${camisetaSVG}`,
            nome: `${nameTeam}`
        },
        success: function(response) {
          alert(response)
          window.location.href = '/Cartola/html/index.html';
          // Impede o usuário de voltar para a página anterior
          history.pushState(null, null, location.href);
          return window.onpopstate = function () {
              history.go(1);
          };
        }
    });
  });
}