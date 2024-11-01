window.addEventListener("DOMContentLoaded", function () {
    let btnMenu = document.getElementById("btn-menu");
    let menuMobile = document.getElementById("menu-mobile");

    btnMenu.addEventListener("click", () => {
        menuMobile.classList.add("abrir-menu");
    });

    menuMobile.addEventListener("click", () => {
        menuMobile.classList.remove("abrir-menu");
    });

    // Função para determinar a saudação com base na hora atual
    function obterSaudacao() {
        const agora = new Date();
        const hora = agora.getHours();
        let saudacao;

        if (hora >= 5 && hora < 12) {
            saudacao = "Olá, Bom dia. <br/><span>Bem vindo ao meu portfólio.</span>";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Olá, Boa tarde. <br/><span>Bem vindo ao meu portfólio.</span>";
        } else {
            saudacao = "Olá, Boa noite. <br/><span>Bem vindo ao meu portfólio.</span>";
        }

        return saudacao;
    }

    // Função para atualizar a saudação no elemento HTML
    function atualizarSaudacao() {
        const saudacaoElement = document.getElementById("saudacao");
        if (saudacaoElement) {
            saudacaoElement.innerHTML = obterSaudacao();
        }
    }

    atualizarSaudacao();

    // document.getElementById("formulario-contato").addEventListener("submit", function (e) {
    //     e.preventDefault();

    //     const form = e.target;

    //     const formData = new FormData();

    //     formData.append("nome", form.querySelector('input[name="nome"]').value);
    //     formData.append("email", form.querySelector('input[name="email"]').value);
    //     formData.append("mensagem", form.querySelector('textarea[name="mensagem"]').value);

    //     const celular = form.querySelector('input[name="celular"]');
    //     if (celular) {
    //         formData.append("celular", celular.value);
    //     }

    //     fetch('./php/__act__envioEmail.php', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             exibirMensagem(data);

    //             form.reset();
    //         })
    //         .catch(error => {
    //             // Aqui você pode lidar com erros de requisição
    //             console.error(error);
    //         });
    // });

    document.getElementById('celular').addEventListener('input', function () {
        let value = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 0) {
            value = '(' + value;
            if (value.length > 3) {
                value = value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 15);
            }
        }
        this.value = value;
    });

    // const apiKey = ''; // Substitua pela sua chave de API Brevo

    // document.getElementById('formulario-contato').addEventListener('submit', function (event) {
    //     event.preventDefault();

    //     const form = event.target;

    //     const nome = sanitizarDados(document.getElementById('nome').value);
    //     const mensagem = sanitizarDados(document.getElementById('mensagem').value);
    //     const email = sanitizarDados(document.getElementById('email').value);

    //     // Validação do e-mail
    //     if (!validarEmail(email)) {
    //         exibirMensagem('E-mail inválido. Por favor, insira um e-mail válido.', true);
    //         return; // Interrompe o envio se o e-mail não for válido
    //     }

    //     const data = {
    //         sender: { email: 'estevaotlnf@gmail.com', name: 'Estêvão Leite' },
    //         to: [{ email: 'estevaotlnf@gmail.com', name: 'Estêvão Leite' }],
    //         subject: 'Mensagem do Formulário de Contato',
    //         htmlContent: `
    //         <p><strong>Nome:</strong> ${nome}</p>
    //         <p><strong>E-mail:</strong> ${email}</p>
    //         <p><strong>Mensagem:</strong> ${mensagem}</p>
    //     `
    //     };

    //     fetch('https://api.brevo.com/v3/smtp/email', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'api-key': apiKey
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 exibirMensagem('E-mail enviado com sucesso!', false);
    //                 form.reset();
    //             } else {
    //                 exibirMensagem('Erro ao enviar o e-mail.', true);
    //             }
    //         })
    //         .catch(error => {
    //             exibirMensagem('Erro ao enviar o e-mail.', true);
    //         });
    // });
});

function exibirMensagem(erro, ehErro = false) {
    const span = document.getElementById("saidaEnvio");

    if (ehErro) {
        span.textContent = erro;
        span.classList.add("erro");
    } else {
        span.classList.remove("erro");
        span.textContent = "Obrigado por entrar em contato. Responderei o mais breve possível.";
    }

    span.classList.remove("escondido");

    setTimeout(() => {
        span.classList.add("escondido");
    }, 6000);
}

// Função para validar o e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex básico para validação de e-mail
    return regex.test(email);
}

// Função para sanitizar dados
function sanitizarDados(dado) {
    // Cria um elemento de textarea para utilizar o método .textContent
    const textarea = document.createElement('textarea');
    textarea.textContent = dado; // Atribui o valor ao textContent para escapar HTML
    let sanitizedData = textarea.value; // Obtém o valor sanitizado

    // Remove tags de script
    sanitizedData = sanitizedData.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');

    // Remove caracteres perigosos adicionais (opcional)
    sanitizedData = sanitizedData.replace(/[<>]/g, ''); // Remove < e >

    return sanitizedData;
}