
import {
    buscarUsuarios,
    salvarUsuarios,
    buscarAdmin,
    inicializarAdmin,
    salvarUsuarioLogado
} from "./localStorage.js";


const abaEntrar = document.getElementById("aba-entrar");
const abaCadastro = document.getElementById("aba-cadastro");

const formEntrar = document.getElementById("form-entrar");
const formCadastro = document.getElementById("form-cadastro");

const tituloForm = document.getElementById("titulo-form");
const mensagemSucesso = document.getElementById("mensagem-sucesso");


// Inicializar administrador
inicializarAdmin();


// Alternar para a aba Entrar
abaEntrar.addEventListener("click", function () {

    formEntrar.style.display = "block";
    formCadastro.style.display = "none";

    tituloForm.textContent = "Entrar";

    abaEntrar.classList.add("aba-ativa");
    abaEntrar.classList.remove("aba-inativa");

    abaCadastro.classList.add("aba-inativa");
    abaCadastro.classList.remove("aba-ativa");

    mensagemSucesso.style.display = "none";

});


// Alternar para a aba Cadastro
abaCadastro.addEventListener("click", function () {

    formEntrar.style.display = "none";
    formCadastro.style.display = "block";

    tituloForm.textContent = "Criar conta";

    abaCadastro.classList.add("aba-ativa");
    abaCadastro.classList.remove("aba-inativa");

    abaEntrar.classList.add("aba-inativa");
    abaEntrar.classList.remove("aba-ativa");

    mensagemSucesso.style.display = "none";

});


// Cadastro de usuário
formCadastro.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email-cadastro").value.trim().toLowerCase();
    const senha = document.getElementById("senha-cadastro").value;
    const confirmaSenha = document.getElementById("confirma-cadastro").value;

    const erroEmail = document.getElementById("erro-email-cadastro");
    const erroSenha = document.getElementById("erro-senha-cadastro");
    const erroConfirma = document.getElementById("erro-confirma-cadastro");

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    erroConfirma.textContent = "";
    mensagemSucesso.style.display = "none";

    try {

        if (email === "") {
            throw "Informe seu e-mail!";
        }

        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            throw "Digite um e-mail válido!";
        }

        if (senha === "") {
            throw "Informe sua senha!";
        }

        if (senha.length < 6) {
            throw "A senha precisa ter pelo menos 6 caracteres!";
        }

        if (confirmaSenha === "") {
            throw "Confirme sua senha!";
        }

        if (senha !== confirmaSenha) {
            throw "As senhas não coincidem!";
        }

        const usuarios = buscarUsuarios();

        const usuarioExiste = usuarios.find(function (usuario) {
            return usuario.email === email;
        });

        if (usuarioExiste) {
            throw "Este e-mail já está cadastrado!";
        }

        const admin = buscarAdmin();

        if (admin && admin.email === email) {
            throw "Este e-mail não está disponível!";
        }

        const novoUsuario = {
            email: email,
            senha: senha
        };

        usuarios.push(novoUsuario);

        salvarUsuarios(usuarios);

        mensagemSucesso.innerHTML = "Conta criada com sucesso! <a href='#' id='link-login'>Entre na sua conta.</a>";
        mensagemSucesso.style.display = "block";

        formCadastro.reset();

        document.getElementById("link-login").addEventListener("click", function (event) {
            event.preventDefault();
            abaEntrar.click();
        });

    } catch (erro) {

        if (erro === "Informe seu e-mail!" ||
            erro === "Digite um e-mail válido!" ||
            erro === "Este e-mail já está cadastrado!" ||
            erro === "Este e-mail não está disponível!") {

            erroEmail.textContent = erro;

        } else if (erro === "Informe sua senha!" ||
                   erro === "A senha precisa ter pelo menos 6 caracteres!") {

            erroSenha.textContent = erro;

        } else {

            erroConfirma.textContent = erro;

        }

    }

});


// Login de usuário
formEntrar.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email-entrar").value.trim().toLowerCase();
    const senha = document.getElementById("senha-entrar").value;

    const erroEmail = document.getElementById("erro-email-entrar");
    const erroSenha = document.getElementById("erro-senha-entrar");

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    mensagemSucesso.style.display = "none";

    try {

        if (email === "") {
            throw "Informe seu e-mail!";
        }

        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            throw "Digite um e-mail válido!";
        }

        if (senha === "") {
            throw "Informe sua senha!";
        }

        const admin = buscarAdmin();

        if (admin && admin.email === email && admin.senha === senha) {

            salvarUsuarioLogado({
                email: admin.email,
                tipo: "administrador"
            });

            window.location.href = "produtos.html";
            return;
        }

        const usuarios = buscarUsuarios();

        const usuarioEncontrado = usuarios.find(function (usuario) {
            return usuario.email === email && usuario.senha === senha;
        });

        if (usuarioEncontrado) {

            salvarUsuarioLogado({
                email: usuarioEncontrado.email,
                tipo: "cliente"
            });

            window.location.href = "index.html";

        } else {

            throw "E-mail ou senha incorretos!";

        }

    } catch (erro) {

        if (erro === "Informe seu e-mail!" ||
            erro === "Digite um e-mail válido!") {

            erroEmail.textContent = erro;

        } else {

            erroSenha.textContent = erro;

        }

    }

});

  //LOCALSTORAGE COLOCAR NA OUTRA PAGINA
 // Buscar usuários cadastrados
export function buscarUsuarios() {

    return JSON.parse(localStorage.getItem("nucleo_usuarios")) || [];

}


// Salvar usuários cadastrados
export function salvarUsuarios(usuarios) {

    localStorage.setItem("nucleo_usuarios", JSON.stringify(usuarios));

}


// Buscar administrador
export function buscarAdmin() {

    return JSON.parse(localStorage.getItem("nucleo_admin"));

}


// Inicializar administrador padrão
export function inicializarAdmin() {

    const administrador = {
        email: "admin@123.com",
        senha: "123456",
        tipo: "administrador"
    };

    if (!localStorage.getItem("nucleo_admin")) {

        localStorage.setItem("nucleo_admin", JSON.stringify(administrador));

    }

}


// Salvar usuário logado
export function salvarUsuarioLogado(usuario) {

    localStorage.setItem("nucleo_usuario_logado", JSON.stringify(usuario));

}
