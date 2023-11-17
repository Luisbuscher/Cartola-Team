<?php

//FUNÇÃO PARA PUXAR OS DADOS DOS JOGADORES DO BANCO DE DADOS E RETORNAR NO JAVASCRIPT ONDE SERÁ EXECUTADA ESSA FUNCAO:
function getDataPlayers($position)
{
    // Conecta ao banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "Universo05";
    $dbname = "brasileirao";

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
    }

    // Executa a consulta SQL na tabela jogadores;
    $sql = "SELECT nome, posicao, valor, img_jogador, nome_time, img_time, id FROM jogadores WHERE posicao = '$position'";
    $result = mysqli_query($conn, $sql);

    // Transforma os resultados em um array e envia como JSON;
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

// Verifica se foi recebida uma requisição do tipo POST com a variável "action" igual a "chamar_teste".
if (isset($_POST['action']) && $_POST['action'] == 'chamar_teste') {
    // Verifica se foi recebida a variável "posicao".
    if (isset($_POST['posicao'])) {
        $posicao = $_POST['posicao'];
        // Chama a função "teste" passando o valor de "posicao" como parâmetro.
        getDataPlayers($posicao);
    }
}

function getNameTeam()
{
    // Conecta ao banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "Universo05";
    $dbname = "brasileirao";

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
    }

    // Executa a consulta SQL na tabela jogadores;
    $sql = "SELECT nome FROM user_clube";
    $result = mysqli_query($conn, $sql);

    // Transforma os resultados em um array e envia como JSON;
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}


if (isset($_POST['action']) && $_POST['action'] == 'verificarNomeTime') {
    getNameTeam();
}

function saveTeam($camiseta, $escudo, $nome)
{
    // Conecta ao banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "Universo05";
    $dbname = "brasileirao";

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
    }

    // Executa a consulta SQL na tabela jogadores;
    $sql = "INSERT INTO user_clube (nome, camiseta_clube, logo_clube) values ('$nome', '$camiseta', '$escudo')";

    // Executa a declaração SQL
    if (mysqli_query($conn, $sql)) {
        echo "Dados inseridos com sucesso $nome";
    } else {
        echo "Erro ao inserir dados: " . mysqli_error($conn);
    }

    // Fecha a conexão com o banco de dados
    mysqli_close($conn);
}

// Verifica se foi recebida uma requisição do tipo POST com a variável "action" igual a "chamar_teste".
if (isset($_POST['action']) && $_POST['action'] == 'salvar_clube') {
    // Verifica se foi recebida a variável "posicao".
    if (isset($_POST['camiseta']) && isset($_POST['escudo']) && isset($_POST['nome'])) {
        $camiseta = $_POST['camiseta'];
        $escudo = $_POST['escudo'];
        $nome = $_POST['nome'];
        saveTeam($camiseta, $escudo, $nome);
    }
}