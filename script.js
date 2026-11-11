
/* ==========================
   CONFIGURAÇÕES
========================== */

const aulas = [
    "introducao",
    "cilindro",
    "formulaCilindro",
    "cone",
    "formulaCone",
    "comparacao",
    "exercicios",
    "simulado"
];

let aulaAtual = 0;

let aulasConcluidas = new Set();


/* ==========================
   NAVEGAÇÃO ENTRE AULAS
========================== */

function mostrarAula(id) {

    const indice = aulas.indexOf(id);

    if (indice === -1) return;

    // Marca a aula anterior como concluída
    if (aulaAtual !== indice) {
        aulasConcluidas.add(aulas[aulaAtual]);
    }

    aulaAtual = indice;

    // Esconde todas as aulas
    document.querySelectorAll(".aula").forEach(aula => {
        aula.classList.remove("ativa");
    });

    // Mostra a aula selecionada
    document.getElementById(id).classList.add("ativa");

    // Atualiza menu
    document.querySelectorAll(".sidebar nav button").forEach((botao, i) => {
        botao.classList.toggle("ativo", i === aulaAtual);
    });

    atualizarProgresso();
    atualizarBotoes();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================
   PRÓXIMA E ANTERIOR
========================== */

function proximaAula() {

    if (aulaAtual < aulas.length - 1) {
        mostrarAula(aulas[aulaAtual + 1]);
    }

}

function aulaAnterior() {

    if (aulaAtual > 0) {
        mostrarAula(aulas[aulaAtual - 1]);
    }

}


/* ==========================
   BOTÕES DE NAVEGAÇÃO
========================== */

function atualizarBotoes() {

    const anterior = document.getElementById("anterior");
    const proximo = document.getElementById("proximo");

    anterior.disabled = aulaAtual === 0;

    proximo.disabled = aulaAtual === aulas.length - 1;

}


/* ==========================
   SISTEMA DE PROGRESSO
========================== */

function atualizarProgresso() {

    const porcentagem =
        (aulasConcluidas.size / aulas.length) * 100;

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").textContent =
        Math.round(porcentagem) + "% concluído";

}


/* ==========================
   MOSTRAR RESPOSTAS
========================== */

function mostrarResposta(id) {

    const resposta = document.getElementById(id);

    resposta.classList.toggle("visivel");

}


/* ==========================
   BANCO DE QUESTÕES
========================== */

const questoes = [

    {
        pergunta: "Quantas bases possui um cilindro?",
        alternativas: [
            "Uma",
            "Duas",
            "Três",
            "Quatro"
        ],
        correta: 1,
        explicacao: "O cilindro possui duas bases circulares paralelas."
    },

    {
        pergunta: "Qual é a fórmula do volume do cilindro?",
        alternativas: [
            "V = π × r × h",
            "V = π × r² × h",
            "V = 2 × π × r × h",
            "V = π × r²"
        ],
        correta: 1,
        explicacao: "O volume do cilindro é calculado por π × r² × h."
    },

    {
        pergunta: "Um cilindro possui raio 2 cm e altura 5 cm. Considere π = 3. Qual é o volume?",
        alternativas: [
            "30 cm³",
            "45 cm³",
            "60 cm³",
            "75 cm³"
        ],
        correta: 2,
        explicacao: "V = 3 × 2² × 5 = 60 cm³."
    },

    {
        pergunta: "Quantos vértices possui um cone?",
        alternativas: [
            "Nenhum",
            "Dois",
            "Três",
            "Um"
        ],
        correta: 3,
        explicacao: "O cone possui um único vértice."
    },

    {
        pergunta: "O que é a geratriz de um cone?",
        alternativas: [
            "A altura do cone",
            "O raio da base",
            "O segmento que liga o vértice à borda da base",
            "O diâmetro da base"
        ],
        correta: 2,
        explicacao: "A geratriz liga o vértice à borda da base."
    },

    {
        pergunta: "Qual é a fórmula do volume do cone?",
        alternativas: [
            "V = π × r² × h",
            "V = (π × r² × h) / 3",
            "V = π × r × h",
            "V = 2 × π × r²"
        ],
        correta: 1,
        explicacao: "O volume do cone é um terço do volume de um cilindro de mesma base e altura."
    },

    {
        pergunta: "Se o raio de um círculo é 4 cm, qual é seu diâmetro?",
        alternativas: [
            "2 cm",
            "4 cm",
            "6 cm",
            "8 cm"
        ],
        correta: 3,
        explicacao: "O diâmetro é o dobro do raio: 2 × 4 = 8 cm."
    },

    {
        pergunta: "Qual é a fórmula da área da base de um cilindro?",
        alternativas: [
            "Ab = π × r²",
            "Ab = 2 × π × r",
            "Ab = π × r × h",
            "Ab = π × h²"
        ],
        correta: 0,
        explicacao: "A base do cilindro é um círculo, cuja área é π × r²."
    },

    {
        pergunta: "Um cone tem raio 3 cm e altura 4 cm. Qual é sua geratriz?",
        alternativas: [
            "3 cm",
            "4 cm",
            "5 cm",
            "7 cm"
        ],
        correta: 2,
        explicacao: "g² = 3² + 4² = 25. Portanto, g = 5 cm."
    },

    {
        pergunta: "Um cone e um cilindro possuem a mesma base e altura. O volume do cone representa quanto do volume do cilindro?",
        alternativas: [
            "A metade",
            "Um terço",
            "O dobro",
            "O triplo"
        ],
        correta: 1,
        explicacao: "O volume do cone corresponde a um terço do volume do cilindro."
    }

];


/* ==========================
   INICIAR SIMULADO
========================== */

function iniciarSimulado() {

    const area = document.getElementById("areaSimulado");

    area.innerHTML = "";

    let html = "";

    questoes.forEach((questao, indice) => {

        html += `
            <div class="questao">

                <h3>Questão ${indice + 1}</h3>

                <p>${questao.pergunta}</p>

                ${questao.alternativas.map((alternativa, i) => `
                    <label>
                        <input
                            type="radio"
                            name="questao${indice}"
                            value="${i}"
                        >
                        ${String.fromCharCode(65 + i)}) ${alternativa}
                    </label>
                `).join("")}

                <div id="explicacao${indice}"></div>

            </div>
        `;

    });

    html += `
        <button onclick="corrigirSimulado()">
            Finalizar simulado
        </button>

        <div id="resultado"></div>
    `;

    area.innerHTML = html;

}


/* ==========================
   CORRIGIR SIMULADO
========================== */

function corrigirSimulado() {

    let acertos = 0;

    questoes.forEach((questao, indice) => {

        const selecionada = document.querySelector(
            `input[name="questao${indice}"]:checked`
        );

        const explicacao = document.getElementById(
            `explicacao${indice}`
        );

        if (selecionada && Number(selecionada.value) === questao.correta) {

            acertos++;

            explicacao.innerHTML = `
                <p style="color: #38c98b; margin-top: 12px;">
                    ✓ Correto! ${questao.explicacao}
                </p>
            `;

        } else {

            const respostaCerta = questao.alternativas[questao.correta];

            explicacao.innerHTML = `
                <p style="color: #ff7777; margin-top: 12px;">
                    ✗ Incorreto!
                    Resposta correta: ${respostaCerta}.
                    ${questao.explicacao}
                </p>
            `;

        }

    });

    const porcentagem = (acertos / questoes.length) * 100;

    let mensagem = "";

    if (acertos >= 9) {
        mensagem = "Excelente! Você domina o conteúdo!";
    } else if (acertos >= 7) {
        mensagem = "Muito bem! Você está indo muito bem.";
    } else if (acertos >= 5) {
        mensagem = "Bom começo! Revise alguns conteúdos.";
    } else {
        mensagem = "Continue estudando! Revise as aulas e tente novamente.";
    }

    document.getElementById("resultado").innerHTML = `
        <div class="exemplo">

            <h2>Resultado final</h2>

            <h3>${acertos} de ${questoes.length} acertos</h3>

            <h2>${porcentagem}%</h2>

            <p>${mensagem}</p>

            <button onclick="iniciarSimulado()">
                Refazer simulado
            </button>

        </div>
    `;

    // Impede alterar as respostas depois da correção
    document.querySelectorAll("#areaSimulado input").forEach(input => {
        input.disabled = true;
    });

}


/* ==========================
   INICIALIZAÇÃO
========================== */

mostrarAula("introducao");

atualizarBotoes();


