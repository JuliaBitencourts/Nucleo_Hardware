// 1. pega o botão pelo mesmo id que está no HTML
const botaoVoltar = document.getElementById("finalizarCompra");

// 2. fica escutando o clique nele
botaoVoltar.addEventListener("click", function () {

    // 3. o que acontece no clique: volta para a página da loja
    window.location.href = "../index.html";

});
