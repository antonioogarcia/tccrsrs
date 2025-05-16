const slider = document.querySelectorAll('.slider');
const setaE = document.getElementById('setaE');
const setaD = document.getElementById('setaD');

let atualImg = 0;

function esconder() {
    slider.forEach(item => item.classList.remove('on'))
};

function mostrar() {
    slider[atualImg].classList.add('on')
};

function proxImg() {
    esconder()
    if(atualImg === slider.length -1) {
        atualImg = 0
    } else {
        atualImg++
    }
    mostrar()
}

function voltarImg() {
    esconder()
    if(atualImg === 0) {
        atualImg = slider.length -1
    } else {
        atualImg--
    }
    mostrar()
}

setaD.addEventListener('click', proxImg)
setaE.addEventListener('click', voltarImg)