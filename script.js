let cardContainer = document.querySelector("main");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Falha ao buscar dados: ", erro);
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)||
        dado.descrição.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    for (let dado of dados) {
        let article = document.createElement("article");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Ano de lançamento:</strong> ${dado.ano}</p>
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}
