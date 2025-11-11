document.addEventListener("DOMContentLoaded", function() {
  const quizContainer = document.getElementById("quiz-container");
  const submitBtn = document.getElementById("submit-btn");
  const info = document.getElementById("info");
  let respondeu = false;

  // Perguntas do quiz
  const perguntas = [
    {
      pergunta: "Qual é a capital do Brasil?",
      opcoes: ["Brasília", "Rio de Janeiro", "São Paulo", "Belo Horizonte"],
      respostaCorreta: "Brasília"
    },
    {
      pergunta: "How many characters have in the story?",
      opcoes: [1, 2, 3, 4],
      respostaCorreta: 4
    },
    {
      pergunta: "Qual o log de 10 na base 10?",
      opcoes: [1, 2, 0, 10],
      respostaCorreta: 1
    },
    {
      pergunta: "Qual a raiz quadrada de 144?",
      opcoes: [13, 14, 11, 12, 16],
      respostaCorreta: 12
    },
    {
      pergunta: "Quantos tributos são necessários para invocar um monstro de nível 7?",
      opcoes: [7, 2, 1],
      respostaCorreta: 2
    },
    // Novas perguntas
    {
      pergunta: "Quem pintou a Mona Lisa?",
      opcoes: ["Leonardo da Vinci", "Michelangelo", "Pablo Picasso", "Van Gogh"],
      respostaCorreta: "Leonardo da Vinci"
    },
    {
      pergunta: "Qual planeta é conhecido como o Planeta Vermelho?",
      opcoes: ["Vênus", "Júpiter", "Marte", "Saturno"],
      respostaCorreta: "Marte"
    },
    {
      pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
      opcoes: [1969, 1975, 1959, 1981],
      respostaCorreta: 1969
    },
    {
      pergunta: "Qual é o maior oceano do planeta Terra?",
      opcoes: ["Atlântico", "Pacífico", "Índico", "Ártico"],
      respostaCorreta: "Pacífico"
    },
    {
      pergunta: "Qual linguagem é usada para estilizar páginas web?",
      opcoes: ["HTML", "CSS", "Python", "C++"],
      respostaCorreta: "CSS"
    }
  ];

  // Função que mostra as perguntas na tela
  function mostrarPerguntas() {
    let html = "";
    perguntas.forEach(function(p, index) {
      html += `
        <div id="card-pergunta${index}" class="mb-3">
          <p><b>${index + 1}.</b> ${p.pergunta}</p>
          <div id="opcoes${index}"></div>
        </div>
      `;
    });
    quizContainer.innerHTML = html;

    // adiciona as opções de resposta
    perguntas.forEach((p, index) => {
      const opcoesDiv = document.getElementById("opcoes" + index);
      p.opcoes.forEach((op) => {
        opcoesDiv.innerHTML += `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="pergunta${index}" value="${op}">
            <label class="form-check-label">${op}</label>
          </div>
        `;
      });
    });
  }

  // Função pra mostrar mensagem (alerta)
  function mostrarAlerta(index, tipo, msg) {
    if (index < 0) {
      info.style.display = "block";
      info.className = "alert alert-" + tipo;
      info.innerHTML = msg;
    } else {
      const divPergunta = document.getElementById("card-pergunta" + index);
      const alerta = document.createElement("div");
      alerta.className = "alert alert-" + tipo + " mt-2";
      alerta.innerText = msg;
      divPergunta.appendChild(alerta);
    }
  }

  // Função que verifica as respostas
  function verificarRespostas() {
    let pontos = 0;

    if (!respondeu) {
      respondeu = true;
      perguntas.forEach((p, i) => {
        const selecionada = document.querySelector(`input[name="pergunta${i}"]:checked`);
        if (selecionada) {
          if (selecionada.value == p.respostaCorreta) {
            pontos++;
            mostrarAlerta(i, "success", "Certa resposta!");
          } else {
            mostrarAlerta(i, "danger", "Errou! 😢");
          }
        }
      });
      mostrarAlerta(-1, "info", `Você fez ${pontos} de ${perguntas.length} pontos.`);
    } else {
      mostrarAlerta(-1, "warning", "Você já respondeu o quiz 😅");
    }
  }

  // Quando clicar no botão
  submitBtn.addEventListener("click", verificarRespostas);

  // Mostra as perguntas quando abrir a página
  mostrarPerguntas();
});
