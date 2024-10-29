<?php

require_once "./envioEmail.php";

$resposta = array();

header("Content-Type: application/json");

try {
    function validarEmail($email) {
        $email = html_entity_decode($email);
        $conta = "^[a-zA-Z0-9\._-]+@";
        $domino = "[a-zA-Z0-9\._-]+\.";
        $extensao = "[a-zA-Z]{2,4}$^";
        $pattern = $conta . $domino . $extensao;
        if (preg_match($pattern, $email))
            return true;
        return false;
    }

    function sanitizarDados($dado) {
        // Remove tags HTML e PHP
        $input = strip_tags($dado);

        // Remove caracteres perigosos
        $input = htmlspecialchars($dado, ENT_QUOTES, 'UTF-8');

        return $input;
    }

    $email = sanitizarDados($_POST['email']);
    if (!validarEmail($email)) {
        throw new Exception("Email inválido");
    }

    $nome = sanitizarDados($_POST['nome']);
    $mensagem = sanitizarDados($_POST['mensagem']);

    $celular = "Não enviado.";
    if (!empty(sanitizarDados($_POST['celular']))) {
        $celular = sanitizarDados($_POST['celular']);
    }

    $mensagem = "Email: " . $email . " \n<br /> Nome: " . $nome . " \n<br /> Mensagem: " . $mensagem . " \n<br /> Celular: " . $celular;

    (new EmailSender())->enviarEmail("estevaotlnf@gmail.com", "Contato Portifolio", $mensagem);

    $resposta['sucesso'] = "Sucesso";
} catch (\Throwable $th) {
    $resposta['erro'] = $th->getMessage();
}

echo json_encode($resposta);
