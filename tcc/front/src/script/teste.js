const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

let currentStep = 0;

function showStep(n) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === n);
  });
  prevBtn.style.display = n === 0 ? "none" : "inline-block";
  nextBtn.textContent = n === steps.length - 1 ? "Enviar" : "Confirmar respostas";
  progressBar.style.width = ((n + 1) / steps.length) * 100 + "%";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    alert("Formulário enviado!"); // aqui vc pode trocar por integração com backend
    document.getElementById("questionarioForm").submit();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

// Iniciar mostrando a primeira etapa
showStep(currentStep);
