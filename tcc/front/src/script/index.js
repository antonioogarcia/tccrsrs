const slider = document.querySelectorAll('.slider');
const setaE = document.getElementById('setaE');
const setaD = document.getElementById('setaD');

let atualImg = 0;

function esconder() {
    slider.forEach(item => item.classList.remove('on'));
}

function mostrar() {
    slider[atualImg].classList.add('on');
}

function proxImg() {
    esconder();
    atualImg = (atualImg + 1) % slider.length;
    mostrar();
}

function voltarImg() {
    esconder();
    atualImg = (atualImg - 1 + slider.length) % slider.length;
    mostrar();
}

setaD.addEventListener('click', proxImg);
setaE.addEventListener('click', voltarImg);
