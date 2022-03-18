// Criando uma lista de tarefas

// Selecionando nossas 'class' no nosso código HTML
const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

// Criando a Tag <li> no nosso código
function criaLi() {
  const li = document.createElement("li");
  return li;
}

// Adicionando evento para que ao pressionarmos a tecla ENTER, criemos uma tarefa
// no navegador, conforme a nossa lista de tarefas, enter tem keycode(numeração) 13
inputTarefa.addEventListener("keypress", function (e) {
  if (e.keycode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

// Esta função é para que a caixa de texto esvazie sozinha após incluirmos
// uma tarefa no navegador
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus(); // este evento faz com que o cursor fique piscando na caixa de texto
}

// Esta função é para criar o botão apagar após incluirmos uma tarefa
function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "apagar"); // quando queremos setar o atributo ref de um li
  botaoApagar.setAttribute("title", "Apagar essa tarefa");
  li.appendChild(botaoApagar);
}

// Criando a função para que ao digitarmos um texto na nossa caixa de texto do navegador
// criemos assim uma tarefa
function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

// Criando o evento 'click' no nosso botão 'Adicionar nova tarefa'
btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

// Esta função é para salvar as tarefas em Local Storage
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas); //JSON.stringify converte um elemento
  // javascript para uma string
  localStorage.setItem("tarefas", tarefasJSON);
}

// Esta função é para adicionar as tarefas ao Local Storage
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas); //JSON.parse converte de volta para um objeto
  //javascript
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
