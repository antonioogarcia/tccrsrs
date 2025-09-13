// =========================
// Seletores principais
// =========================
const formEndereco = document.querySelector('#formEndereco');
const formPerfil = document.querySelector('#formPerfil');

const cep = document.querySelector('#cep');
const bairro = document.querySelector('#bairro');
const logradouro = document.querySelector('#logradouro');
const numero = document.querySelector('#numero');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const fadeElemento = document.querySelector('#fader');

// =========================
// CEP - Validação e Busca
// =========================

// Permitir apenas números no CEP
cep.addEventListener("keypress", (e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});

// Buscar endereço ao digitar 8 números
cep.addEventListener("keyup", (e) => {
  if (e.target.value.length === 8) pegarEndereco(e.target.value);
});

async function pegarEndereco(cepValor) {
  carregar();
  cep.blur();

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepValor}/json/`);
    const data = await resposta.json();

    if (data.erro) throw new Error("CEP inválido, tente outra vez!");

    logradouro.value = data.logradouro || "";
    cidade.value = data.localidade || "";
    bairro.value = data.bairro || "";
    estado.value = data.uf || "";
  } catch (err) {
    formEndereco.reset();
    mensagemErro(err.message);
  } finally {
    carregar();
  }
}

// =========================
// Loader
// =========================
function carregar() {
  const loaderElemento = document.querySelector('#loader');
  fadeElemento.classList.toggle("hide");
  loaderElemento.classList.toggle("hide");
}

// =========================
// Mensagem de erro
// =========================
function mensagemErro(msg) {
  alert(msg);
}

// =========================
// Função para liberar edição de um input
// =========================
function liberarEdicao(input) {
  if (input && input.hasAttribute("readonly")) {
    input.removeAttribute("readonly");       // libera para edição
    input.classList.add("editing");          // adiciona estilo
    input.focus();                           // foca no campo
    const length = input.value.length;       // pega tamanho do texto
    input.setSelectionRange(length, length); // coloca cursor no final
  }
}

// =========================
// Edição inline via ícone
// =========================
document.querySelectorAll(".edit-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);
    liberarEdicao(input);
  });
});

// =========================
// Edição ao clicar diretamente no input
// =========================
document.querySelectorAll("input[readonly]").forEach(input => {
  input.addEventListener("click", () => {
    liberarEdicao(input);
  });
});

// =========================
// Confirmar alteração ao apertar Enter
// =========================
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !input.hasAttribute("readonly")) {
      e.preventDefault();
      input.setAttribute("readonly", true); // bloqueia novamente
      input.classList.remove("editing");    // remove estilo
    }
  });
});

// =========================
// Formulário principal
// =========================
formPerfil.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Alterações salvas com sucesso!");
});
