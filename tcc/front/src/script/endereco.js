const form = document.querySelector('#formEndereco')
const cep = document.querySelector('#cep')
const bairro = document.querySelector('#bairro')
const logradouro = document.querySelector('#logradouro')
const numero = document.querySelector('#numero')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const formInputs = document.querySelectorAll('[data-input]') // <- estava sem o "All"

const fadeElemento = document.querySelector('#fader')
const closeButton = document.querySelector('#close-message') // <- não precisa ser "All", só existe um

// Permitir apenas números no CEP
cep.addEventListener("keypress", (e) => {
    const apenasNumeros = /[0-9]/
    const tecla = String.fromCharCode(e.keyCode) 
    
    if(!apenasNumeros.test(tecla)) {
        e.preventDefault()
        return
    }
})

// Buscar endereço ao digitar 8 números
cep.addEventListener("keyup", (e) => {
    const valorInput = e.target.value

    if (valorInput.length === 8) {
        pegarEndereco(valorInput)
    }
})

const pegarEndereco = async (cepValor) => {
    carregar()
    cep.blur()

    const apiUrl = `https://viacep.com.br/ws/${cepValor}/json/`
    const resposta = await fetch(apiUrl)
    const data = await resposta.json()

    if(data.erro) {
        form.reset()
        carregar()
        mensagemErro("CEP inválido, tente outra vez!")
        return
    }

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    bairro.value = data.bairro
    estado.value = data.uf

    carregar()
}

// Mostrar/esconder loader
const carregar = () => {
    const loaderElemento = document.querySelector('#loader')
    fadeElemento.classList.toggle("hide")
    loaderElemento.classList.toggle("hide")
}

// Mostrar mensagem de erro
const mensagemErro = (msg) => {
    alert(msg)
}
