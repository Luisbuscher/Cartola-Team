const elementos = document.querySelectorAll('.players');//TODOS OS OBJETOS NA ESCALAÇÃO;
var elementoButton = document.querySelectorAll('.buttonBuy');
var playerSelected; var jogadoresNoElenco = [];

// Adiciona um evento de clique em cada elemento
elementos.forEach(elemento => {
  elemento.addEventListener('click', function(evento) {
    // Obtém o elemento que foi clicado usando o objeto de evento
    const itemClicado = evento.target;
    playerSelected = itemClicado.id;
    console.log(playerSelected);
    
    clearPlayers();
    $(document).ready(function() {
      $.ajax({
          url: "/Cartola/server/server.php",
          type: "POST",
          data: {
              action: 'chamar_teste',
              posicao: `${itemClicado.classList[0]}`
          },
          success: function(response) {
            document.getElementById('comprarJogadores').innerHTML = '';
            sendAddPlayer(response);
          }
      });
    });
  });
});

function habilitarButton(idProucurado){
  let indice = jogadoresNoElenco.indexOf(idProucurado);
  if (indice !== -1) {
    jogadoresNoElenco.splice(indice, 1);
    console.log("O id " + idProucurado + " foi removido do array.");
    document.getElementById(`${idProucurado}`).disabled = false;
    document.getElementById(`${idProucurado}`).style.backgroundColor = '#1eaa4d';
  }
}

//ADICIONA UM EVENTO DE CLIQUE EM TODO O DOCUMENTO E VERIFICA SE O ELEMENTO CLICADO TEM A CLASSE "buttonBuy";
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('buttonBuy')) {
    const itemPlayer = document.getElementById(`${playerSelected}`);
    const itemClicado = event.target;
    itemPlayer.style.backgroundImage = `url('${itemClicado.classList[1]}')`;
    habilitarButton(itemPlayer.getAttribute("data-idPlayer"));
    itemPlayer.setAttribute('data-idPlayer', `${itemClicado.id}`);//A data "idPLayer" recebe o id do novo jogador que irá para a posição;
    jogadoresNoElenco.push(itemClicado.id);
    document.getElementById(`${itemClicado.id}`).disabled = true;//Desabilita o botão do jogador comprado, pra não comprar novamente o mesmo;
    document.getElementById(`${itemClicado.id}`).style.backgroundColor = 'gray';
  }
});

//LIMPA TODA A TABELA DE JOGADORES;
function clearPlayers(){
  let jogadores = document.getElementById('comprarJogadores');
  jogadores.innerHTML = '';
}

//ENVIA OS VALORES PEGOS NO BANCO DE DADOS PARA A FUNÇÃO DE ADICIONAR JOGADORES COLOCANDO UM POR UM NA LISTA UTILIZANDO O FOR:
function sendAddPlayer(data){
  data = JSON.parse(data);//Passa o valor recebido para Json;
  console.log(data.length);
  for(let i = 0; i < data.length; i++){
    adicionarJogador(data[i].img_time, data[i].img_jogador, data[i].nome, data[i].valor, data[i].id);
  }
}

function adicionarJogador(imgTime, imgPlayer, namePlayer, valor, id) {
  // seleciona o elemento pai onde a nova div será adicionada
  const comprarJogadores = document.querySelector(".comprarJogadores");

  // cria um novo elemento div
  const novaDivJogadores = document.createElement("div");

  // adiciona as classes ao novo elemento div
  novaDivJogadores.classList.add("jogadores");

  // cria um novo elemento img com o src da imagem do clube
  const imgClube = document.createElement("img");
  imgClube.setAttribute(
      "src",
      `${imgTime}`
  );
  imgClube.style.width = "9%";
  imgClube.style.height = "80%";
  imgClube.style.marginTop = "10px";
  imgClube.style.marginLeft = "5%";

  // cria um novo elemento img com o src da imagem do jogador
  const imgJogador = document.createElement("img");
  imgJogador.setAttribute(
      "src",
      `${imgPlayer}`
  );
  imgJogador.style.width = "15%";
  imgJogador.style.height = "100%";
  imgJogador.style.marginTop = "0%";
  imgJogador.style.marginBottom = "0%";
  imgJogador.style.marginLeft = "7%";

  // cria um novo elemento h1 com o nome do jogador
  const nomeJogador = document.createElement("h1");
  nomeJogador.style.fontSize = "14pt";
  nomeJogador.style.marginLeft = "5%";
  nomeJogador.textContent = `${namePlayer}`;
  nomeJogador.style.width = "20%";
  nomeJogador.style.wordWrap = "break-word";

  // cria um novo elemento button para o botão de compra
  const buttonComprar = document.createElement("button");
  buttonComprar.classList.add("buttonBuy");
  buttonComprar.classList.add(`${imgPlayer}`);
  buttonComprar.setAttribute("id", `${id}`);
  buttonComprar.style.width = "25%";
  buttonComprar.style.height = "80%";
  buttonComprar.style.alignSelf = "center";
  buttonComprar.style.backgroundColor = "#1eaa4d";
  buttonComprar.style.marginLeft = "8%";
  if(jogadoresNoElenco.includes(id)){ buttonComprar.disabled = true; buttonComprar.style.backgroundColor = 'gray' };//CASO O JOGADOR JA ESTIVER NO ELENCO, O BOTÃO DE COMPRA DELE JA VEM DESABILITADO;

  // cria um novo elemento h2 para o preço
  const precoJogador = document.createElement("h2");
  precoJogador.style.fontSize = "120%";
  precoJogador.textContent = `R$${valor}`;

  // adiciona os elementos como filhos da nova div "jogadores"
  novaDivJogadores.appendChild(imgClube);
  novaDivJogadores.appendChild(imgJogador);
  novaDivJogadores.appendChild(nomeJogador);
  buttonComprar.appendChild(precoJogador);
  novaDivJogadores.appendChild(buttonComprar);

  // adiciona a nova div "jogadores" como filho da div "comprarJogadores"
  comprarJogadores.appendChild(novaDivJogadores);
}