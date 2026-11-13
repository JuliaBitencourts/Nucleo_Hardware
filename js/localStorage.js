/* ============================================================
   localStorage.js — Acesso central ao localStorage do site
   Reúne, em um só lugar, tudo que grava e lê do navegador.
   É incluído em TODAS as telas ANTES do script próprio de cada uma.

   Chaves usadas:
   - "nucleo_admin"           -> conta de administrador (fixa)
   - "nucleo_usuarios"        -> contas cadastradas pelos clientes
   - "nucleo_usuario_logado"  -> quem está logado na sessão atual
   - "produtos"               -> produtos criados no painel
   - "carrinho"               -> itens no carrinho de compras
   ============================================================ */


/* ===== LOGIN / CADASTRO  (tela: login/login.html) =====
   Contas de cliente e a conta de administrador. */

function buscarUsuarios() {
    return JSON.parse(localStorage.getItem("nucleo_usuarios")) || [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("nucleo_usuarios", JSON.stringify(usuarios));
}

function buscarAdmin() {
    return JSON.parse(localStorage.getItem("nucleo_admin"));
}

function inicializarAdmin() {
    const administrador = {
        email: "admin@123.com",
        senha: "123456",
        tipo: "administrador"
    };
    localStorage.setItem("nucleo_admin", JSON.stringify(administrador));
}


/* ===== SESSÃO  (telas: login, inicial, carrinho, finalização, painel) =====
   Guarda, lê e encerra o usuário logado. */

function salvarUsuarioLogado(usuario) {
    localStorage.setItem("nucleo_usuario_logado", JSON.stringify(usuario));
}

function getUsuarioLogado() {
    return JSON.parse(localStorage.getItem("nucleo_usuario_logado"));
}

function removerUsuarioLogado() {
    localStorage.removeItem("nucleo_usuario_logado");
}


/* ===== PRODUTOS  (telas: painel/painel.html e inicio/index.html) =====
   Produtos cadastrados pelo admin e exibidos na loja. */

function getProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


/* ===== CARRINHO  (telas: inicial, carrinho e finalização) =====
   Itens que o cliente adicionou para comprar. */

function getCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function setCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function limparCarrinho() {
    localStorage.removeItem("carrinho");
}
