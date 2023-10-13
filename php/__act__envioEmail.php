<?php
    require_once "./envioEmail.php";

    $resposta = array();

    header("Content-Type: application/json");

    try{
        function validarEmail($email) {
            $email = html_entity_decode($email);
            $conta = "^[a-zA-Z0-9\._-]+@";
            $domino = "[a-zA-Z0-9\._-]+\.";
            $extensao = "[a-zA-Z]{2,4}$^";
            $pattern = $conta.$domino.$extensao;
            if(preg_match($pattern, $email))
                return true;
            return false;
        }

        $email = $_POST['email'];
        if(!validarEmail($email)){
            throw new Exception("Email inválido");
        }

        $nome = $_POST['nome'];
        $mensagem = $_POST['mensagem'];

        $celular = "Não enviado.";
        if(!empty($_POST['celular']))
            $celular = $_POST['celular'];

        $mensagem = "Email: " . $email . " \n<br /> Nome: " . $nome . " \n<br /> Mensagem: " . $mensagem . " \n<br /> Celular: " . $celular;

        (new EmailSender())->enviarEmail("estevaotlnf@gmail.com", "Contato Portifolio", $mensagem);

        $resposta['sucesso'] = "Sucesso";
    }catch (\Throwable $th) {
        $resposta['erro'] = $th->getMessage();
    }

    echo json_encode($resposta);
?>