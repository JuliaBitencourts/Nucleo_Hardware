let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let lista = document.getElementById("lista-produtos");

for (let produto of produtos) {
    let card = document.createElement("div");
    card.className = "card";

    let nome = document.createElement("h3");
    nome.textContent = produto.nome;

    let categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + produto.categoria;

    let preco = document.createElement("p");
    preco.textContent = "Preço: R$ " + produto.preco.toFixed(2);

    let botao = document.createElement("button");
    botao.textContent = "Adicionar";

    botao.addEventListener("click", function() {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho.push(produto);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("Produto adicionado ao carrinho!");
    });

    card.appendChild(nome);
    card.appendChild(categoria);
    card.appendChild(preco);
    card.appendChild(botao);
    lista.appendChild(card);
}
