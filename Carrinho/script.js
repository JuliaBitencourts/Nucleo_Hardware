function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarCarrinho() {

    const produtos = document.querySelectorAll(".produto");

    let subtotal = 0;
    let itens = 0;

    produtos.forEach(produto => {

        const preco = Number(produto.dataset.preco);
        const quantidade = Number(
            produto.querySelector(".qtd").textContent
        );

        subtotal += preco * quantidade;
        itens += quantidade;

        produto.querySelector(".preco").textContent =
            formatarMoeda(preco * quantidade);

    });

    document.querySelector("#total-itens").textContent = itens;

    document.querySelector("#subtotal").textContent =
        formatarMoeda(subtotal);

    document.querySelector("#total").textContent =
        formatarMoeda(subtotal);
}

document.querySelector("#carrinho").addEventListener("click", function(event) {

    const botao = event.target;

    if (botao.classList.contains("mais")) {

        const produto = botao.closest(".produto");
        const quantidade = produto.querySelector(".qtd");

        quantidade.textContent = Number(quantidade.textContent) + 1;

        atualizarCarrinho();
    }

    if (botao.classList.contains("menos")) {

        const produto = botao.closest(".produto");
        const quantidade = produto.querySelector(".qtd");

        let valor = Number(quantidade.textContent);

        if (valor > 0) {
            quantidade.textContent = valor - 1;
            atualizarCarrinho();
        }
    }

    if (botao.classList.contains("remover")) {

        const produto = botao.closest(".produto");

        produto.remove();

        atualizarCarrinho();
    }

});

document.querySelector(".esvaziar").addEventListener("click", function() {

    const confirmar = confirm("Deseja realmente esvaziar o carrinho?");

    if (confirmar) {

        document.querySelector("#carrinho").innerHTML = "";

        atualizarCarrinho();
    }

});

document.querySelector(".finalizar").addEventListener("click", function() {

    const total = document.querySelector("#total").textContent;
    const itens = Number(document.querySelector("#total-itens").textContent);

    if (itens === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // vai para a página de confirmação
    window.location.href = "Finalizar Compra/index.html";

});

document.querySelector(".continuar").addEventListener("click", function() {

    alert("Aqui você poderá voltar para a página de produtos!");

});

botaoFinalizar.addEventListener("click", function() {

    window.location.href = "../index.html";

});   

atualizarCarrinho();