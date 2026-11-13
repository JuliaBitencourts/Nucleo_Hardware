// Tela do carrinho (carrinho/carrinho.html)
// O acesso ao localStorage fica em ../localStorage.js (carregado antes deste).

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

const areaCarrinho = document.querySelector("#carrinho");

function renderizar() {
    const carrinho = getCarrinho();
    areaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        areaCarrinho.innerHTML = "<p class='vazio'>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach((item, indice) => {
        const div = document.createElement("div");
        div.className = "produto";
        div.dataset.indice = indice;

        div.innerHTML = `
            <div class="imagem">PC</div>

            <div class="descricao">
                <span>PRODUTO</span>
                <h3>${item.nome}</h3>
                <p>${formatarMoeda(item.preco)} cada</p>
            </div>

            <div class="quantidade">
                <button class="menos">−</button>
                <strong class="qtd">${item.qtd}</strong>
                <button class="mais">+</button>
            </div>

            <strong class="preco">${formatarMoeda(item.preco * item.qtd)}</strong>

            <button class="remover">Remover</button>
        `;

        areaCarrinho.appendChild(div);
    });

    atualizarResumo();
}

function atualizarResumo() {
    const carrinho = getCarrinho();
    let subtotal = 0;
    let itens = 0;

    carrinho.forEach(item => {
        subtotal += item.preco * item.qtd;
        itens += item.qtd;
    });

    document.querySelector("#total-itens").textContent = itens;
    document.querySelector("#subtotal").textContent = formatarMoeda(subtotal);
    document.querySelector("#total").textContent = formatarMoeda(subtotal);
}

areaCarrinho.addEventListener("click", function (event) {
    const botao = event.target;
    const produto = botao.closest(".produto");
    if (!produto) return;

    const indice = Number(produto.dataset.indice);
    let carrinho = getCarrinho();

    if (botao.classList.contains("mais")) {
        carrinho[indice].qtd += 1;
    }

    if (botao.classList.contains("menos")) {
        carrinho[indice].qtd -= 1;
        if (carrinho[indice].qtd <= 0) {
            carrinho.splice(indice, 1);
        }
    }

    if (botao.classList.contains("remover")) {
        carrinho.splice(indice, 1);
    }

    setCarrinho(carrinho);
    renderizar();
});

document.querySelector(".esvaziar").addEventListener("click", function () {
    if (confirm("Deseja realmente esvaziar o carrinho?")) {
        setCarrinho([]);
        renderizar();
    }
});

document.querySelector(".continuar").addEventListener("click", function () {
    window.location.href = "../inicio/index.html";
});

document.querySelector(".finalizar").addEventListener("click", function () {
    const itens = Number(document.querySelector("#total-itens").textContent);

    if (itens === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Só finaliza se houver um usuário logado
    if (!getUsuarioLogado()) {
        alert("Você precisa estar logado para finalizar a compra.");
        window.location.href = "../login/login.html";
        return;
    }

    window.location.href = "../finalizar/finalizar.html";
});

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

renderizar();
