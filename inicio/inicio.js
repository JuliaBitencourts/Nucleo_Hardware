// Tela inicial (inicio/index.html)
// O acesso ao localStorage fica em ../localStorage.js (carregado antes deste).

function addAoCarrinho(nome, preco) {
    let carrinho = getCarrinho();
    let item = carrinho.find(p => p.nome === nome);

    if (item) {
        item.qtd += 1;
    } else {
        carrinho.push({ nome: nome, preco: preco, qtd: 1 });
    }

    setCarrinho(carrinho);
    atualizarMenu();
}

function atualizarMenu() {
    let carrinho = getCarrinho();
    let qtd = carrinho.reduce((s, p) => s + p.qtd, 0);
    let total = carrinho.reduce((s, p) => s + p.preco * p.qtd, 0);

    let menuQtd = document.getElementById("menuQtd");
    let menuTotal = document.getElementById("menuTotal");

    if (menuQtd) menuQtd.textContent = qtd;
    if (menuTotal) {
        menuTotal.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
}

// Troca "Entrar" por "Sair" quando há usuário logado
function configurarBotaoLogin() {
    let logado = getUsuarioLogado();
    let botao = document.querySelector("#entrar, #sair, .menu-entrar");
    if (!botao) return;

    if (logado) {
        botao.textContent = "Sair";
        botao.addEventListener("click", function () {
            removerUsuarioLogado();
        });
    }
}

// Produtos cadastrados no painel
let produtos = getProdutos();
let lista = document.getElementById("lista-produtos");

if (lista) {
    if (produtos.length === 0) {
        let aviso = document.createElement("p");
        aviso.className = "sem-produtos";
        aviso.textContent = "Nenhum produto cadastrado ainda.";
        lista.appendChild(aviso);
    }

    for (let produto of produtos) {
        let card = document.createElement("div");
        card.className = "card";

        let nomeEl = document.createElement("h3");
        nomeEl.textContent = produto.nome;

        let categoriaEl = document.createElement("p");
        categoriaEl.textContent = "Categoria: " + produto.categoria;

        let precoEl = document.createElement("p");
        precoEl.textContent = "Preço: R$ " + produto.preco.toFixed(2);

        let botaoAdd = document.createElement("button");
        botaoAdd.textContent = "Adicionar";

        botaoAdd.addEventListener("click", function () {
            addAoCarrinho(produto.nome, produto.preco);
            alert("Produto adicionado ao carrinho!");
        });

        card.appendChild(nomeEl);
        card.appendChild(categoriaEl);
        card.appendChild(precoEl);
        card.appendChild(botaoAdd);
        lista.appendChild(card);
    }
}

atualizarMenu();
configurarBotaoLogin();
