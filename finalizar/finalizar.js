// Tela de finalização (finalizar/finalizar.html)
// O acesso ao localStorage fica em ../../localStorage.js (carregado antes deste).

// Proteção: só acessa a finalização quem está logado
if (!getUsuarioLogado()) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "../login/login.html";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

const carrinho = getCarrinho();
const areaCarrinho = document.querySelector("#carrinho");

let total = 0;
areaCarrinho.innerHTML = "";

if (carrinho.length === 0) {
    areaCarrinho.innerHTML = "<p class='vazio'>Nenhum produto no pedido.</p>";
}

carrinho.forEach(item => {
    total += item.preco * item.qtd;

    const div = document.createElement("div");
    div.className = "produto";

    div.innerHTML = `
        <div class="imagem">PC</div>

        <div class="descricao">
            <span>PRODUTO</span>
            <h3>${item.nome}</h3>
            <p>${item.qtd} x ${formatarMoeda(item.preco)}</p>
        </div>

        <strong class="preco">${formatarMoeda(item.preco * item.qtd)}</strong>
    `;

    areaCarrinho.appendChild(div);
});

const totalCompra = document.querySelector("#totalCompra");
if (totalCompra) totalCompra.textContent = formatarMoeda(total);

const itens = carrinho.reduce((s, p) => s + p.qtd, 0);
const menuQtd = document.getElementById("menuQtd");
const menuTotal = document.getElementById("menuTotal");
if (menuQtd) menuQtd.textContent = itens;
if (menuTotal) menuTotal.textContent = formatarMoeda(total);

// Troca "Entrar" por "Sair" quando há usuário logado
(function () {
    let botao = document.querySelector("#entrar, #sair, .menu-entrar");
    if (botao && getUsuarioLogado()) {
        botao.textContent = "Sair";
        botao.addEventListener("click", function () {
            removerUsuarioLogado();
        });
    }
})();

// Botão VOLTAR À LOJA: encerra o pedido, esvazia o carrinho e volta
const botaoVoltar = document.getElementById("finalizarCompra");
botaoVoltar.addEventListener("click", function () {
    limparCarrinho();
    window.location.href = "../inicio/index.html";
});
