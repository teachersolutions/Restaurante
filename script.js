/* =========================================
   VARIÁVEIS PRINCIPAIS
========================================= */

let carrinho = [];

let frete = 0;

let botaoCarrinho = document.getElementById("botao-carrinho");

let fecharCarrinho = document.getElementById("fechar-carrinho");

let carrinhoLateral = document.getElementById("carrinho");

let fundoCarrinho = document.getElementById("fundo-carrinho");

let itensCarrinho = document.getElementById("itens-carrinho");

let quantidadeCarrinho = document.getElementById("quantidade-carrinho");

let subtotalElemento = document.getElementById("subtotal");

let valorFreteElemento = document.getElementById("valor-frete");

let totalElemento = document.getElementById("total");

let bairro = document.getElementById("bairro");

let resultadoFrete = document.getElementById("resultado-frete");

let formularioPedido = document.getElementById("formulario-pedido");

let botoesAdicionar = document.querySelectorAll(".botao-adicionar");


/* =========================================
   ABRIR O CARRINHO
========================================= */

botaoCarrinho.addEventListener("click", function () {

    carrinhoLateral.classList.add("aberto");

    fundoCarrinho.classList.add("ativo");

});


/* =========================================
   FECHAR O CARRINHO
========================================= */

fecharCarrinho.addEventListener("click", function () {

    fecharCarrinhoLateral();

});


fundoCarrinho.addEventListener("click", function () {

    fecharCarrinhoLateral();

});


function fecharCarrinhoLateral() {

    carrinhoLateral.classList.remove("aberto");

    fundoCarrinho.classList.remove("ativo");

}


/* =========================================
   ADICIONAR PRODUTO AO CARRINHO
========================================= */

botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        let nomeProduto = botao.dataset.nome;

        let precoProduto = Number(botao.dataset.preco);

        adicionarProduto(nomeProduto, precoProduto);

    });

});


function adicionarProduto(nomeProduto, precoProduto) {

    let produtoExistente = carrinho.find(function (produto) {

        return produto.nome === nomeProduto;

    });


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        let novoProduto = {

            nome: nomeProduto,

            preco: precoProduto,

            quantidade: 1

        };

        carrinho.push(novoProduto);

    }


    atualizarCarrinho();

    carrinhoLateral.classList.add("aberto");

    fundoCarrinho.classList.add("ativo");

}


/* =========================================
   ATUALIZAR O CARRINHO
========================================= */

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        carrinho.forEach(function (produto, indice) {

            let item = document.createElement("div");

            item.classList.add("item-carrinho");

            item.innerHTML = `
                <div class="item-carrinho-informacoes">

                    <h3>${produto.nome}</h3>

                    <p>
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>

                    <div class="controle-quantidade">

                        <button
                            type="button"
                            onclick="diminuirQuantidade(${indice})"
                        >
                            −
                        </button>

                        <span>
                            ${produto.quantidade}
                        </span>

                        <button
                            type="button"
                            onclick="aumentarQuantidade(${indice})"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    type="button"
                    class="botao-remover"
                    onclick="removerProduto(${indice})"
                >
                    Remover
                </button>
            `;

            itensCarrinho.appendChild(item);

        });

    }


    atualizarValores();

}


/* =========================================
   AUMENTAR QUANTIDADE
========================================= */

function aumentarQuantidade(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();

}


/* =========================================
   DIMINUIR QUANTIDADE
========================================= */

function diminuirQuantidade(indice) {

    carrinho[indice].quantidade--;


    if (carrinho[indice].quantidade <= 0) {

        carrinho.splice(indice, 1);

    }


    atualizarCarrinho();

}


/* =========================================
   REMOVER PRODUTO
========================================= */

function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


/* =========================================
   CALCULAR SUBTOTAL E TOTAL
========================================= */

function atualizarValores() {

    let subtotal = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(function (produto) {

        subtotal += produto.preco * produto.quantidade;

        quantidadeTotal += produto.quantidade;

    });


    let total = subtotal + frete;


    quantidadeCarrinho.textContent = quantidadeTotal;

    subtotalElemento.textContent =
        "R$ " + subtotal.toFixed(2).replace(".", ",");

    valorFreteElemento.textContent =
        "R$ " + frete.toFixed(2).replace(".", ",");

    totalElemento.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");

}


/* =========================================
   CALCULAR FRETE PELO BAIRRO
========================================= */

bairro.addEventListener("change", function () {

    if (bairro.value === "") {

        frete = 0;

        resultadoFrete.textContent =
            "Selecione um bairro para consultar o frete.";

    } else {

        frete = Number(bairro.value);

        let nomeBairro =
            bairro.options[bairro.selectedIndex].text;


        if (frete === 0) {

            resultadoFrete.textContent =
                "Retirada na pizzaria selecionada. Frete grátis.";

        } else {

            resultadoFrete.textContent =
                nomeBairro;
        }

    }


    atualizarValores();

});


/* =========================================
   FINALIZAR O PEDIDO
========================================= */

formularioPedido.addEventListener("submit", function (evento) {

    evento.preventDefault();


    if (carrinho.length === 0) {

        alert("Adicione pelo menos um produto ao carrinho.");

        return;

    }


    if (bairro.value === "") {

        alert("Selecione o bairro ou a retirada na pizzaria.");

        return;

    }


    let nome = document.getElementById("nome").value;

    let telefone = document.getElementById("telefone").value;

    let rua = document.getElementById("rua").value;

    let numero = document.getElementById("numero").value;

    let complemento =
        document.getElementById("complemento").value;

    let pagamento =
        document.getElementById("pagamento").value;

    let observacao =
        document.getElementById("observacao").value;


    let subtotal = 0;

    let textoProdutos = "";


    carrinho.forEach(function (produto) {

        let totalProduto =
            produto.preco * produto.quantidade;

        subtotal += totalProduto;

        textoProdutos +=
            `${produto.quantidade}x ${produto.nome}\n`;

        textoProdutos +=
            `R$ ${totalProduto.toFixed(2).replace(".", ",")}\n\n`;

    });


    let total = subtotal + frete;

    let nomeBairro =
        bairro.options[bairro.selectedIndex].text;


    let mensagem = `
Olá! Gostaria de fazer um pedido.

PEDIDO:

${textoProdutos}

Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}

Frete: R$ ${frete.toFixed(2).replace(".", ",")}

Total: R$ ${total.toFixed(2).replace(".", ",")}

DADOS DO CLIENTE:

Nome: ${nome}

Telefone: ${telefone}

Endereço: ${rua}, ${numero}

Bairro: ${nomeBairro}

Complemento: ${complemento || "Não informado"}

Forma de pagamento: ${pagamento}

Observações: ${observacao || "Nenhuma"}
    `;


    let numeroWhatsApp = "5581984427061";

    let mensagemCodificada =
        encodeURIComponent(mensagem);

    let linkWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.open(linkWhatsApp, "_blank");

});


/* =========================================
   INICIAR VALORES
========================================= */

atualizarCarrinho();












































 













































































  