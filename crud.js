const totalProdutos = document.getElementById("totalProdutos");
const totalUnidades = document.getElementById("totalUnidades");
const estoqueBaixo = document.getElementById("estoqueBaixo");
const valorEstoque = document.getElementById("valorEstoque");

function atualizarRelatorio(){

    let unidades = 0;
    let baixos = 0;
    let valor = 0;

    produtos.forEach(function(produto) {
        
        unidades += produto.estoque;

        valor += produto.preco * produto.estoque;

        if (produto.estoque <= 5) {
            baixos++;
        }

    });

    totalProdutos.textContent = produtos.length;

    totalUnidades.textContent = unidades;

    estoqueBaixo.textContent = baixos;

    valorEstoque.textContent = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


}

const nome = document.getElementById("nomeProduto");
const categoria = document.getElementById("categoriaProduto");
const preco = document.getElementById("precoProduto");
const estoque = document.getElementById("estoqueProduto");

const botao = document.getElementById("btnAdicionar");
const lista = document.getElementById("listaProdutos");

let produtos = [];

botao.addEventListener("click", function() {

    const nomeDigitado = nome.value;
    const categoriaDigitada = categoria.value;
    const precoDigitado = Number(preco.value);
    const estoqueDigitado = Number(estoque.value);

    if (nomeDigitado === "" || precoDigitado <= 0) {
        alert("Digite um preço válido!");
        return;
    } 
    
    if (preco.value === "" || precoDigitado <= 0) {
        alert ("Digite um preço válido!");
        return;
    }

    if (estoque.value === "" || estoqueDigitado < 0 || !Number.isInteger(estoqueDigitado)){
        alert("Digite uma quantidade de estoque válida!");
        return;
    }

    const novoProduto = {
        nome: nomeDigitado,
        categoria: categoriaDigitada,
        preco: precoDigitado,
        estoque: estoqueDigitado
    };

    produtos.push(novoProduto);

    salvarProdutos();
    mostrarProdutos();

    nome.value = "";
    categoria.value = "";
    preco.value = "";
    estoque.value = "";

});

function mostrarProdutos() {

    lista.innerHTML = "";

    produtos.forEach(function(produto, indice) {

        let situacao = "";

        if (produto.estoque <=5) {
            situacao = '<span class="baixo">Baixo</span>';
        }

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.estoque} ${situacao}</td>
            <td>
                <button onclick="removerProduto(${indice})">
                    Remover
                </button>
            </td>
        `;

        lista.appendChild(linha);

        atualizarRelatorio();

    });

} 

function removerProduto(indice) {

    produtos.splice(indice, 1);

    salvarProdutos();
    mostrarProdutos();

}

function salvarProdutos() {

    localStorage.setItem("produtos", JSON.stringify(produtos));

}

function carregarProdutos() {

    const dadosSalvos = localStorage.getItem("produtos");

    if (dadosSalvos) {
        produtos = JSON.parse(dadosSalvos);
    }

    mostrarProdutos();

}

carregarProdutos();
