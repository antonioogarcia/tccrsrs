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

// nextBtn.addEventListener("click", () => {
//   if (currentStep < steps.length - 1) {
//     currentStep++;
//     showStep(currentStep);
//   } else {
//     alert("Formulário enviado!");
//     const form = document.querySelector("form"); 
//     if (form) form.submit();
//   }
// });

nextBtn.addEventListener("click", () => {
  const currentFields = steps[currentStep].querySelectorAll("input, textarea, select");
  let valid = true;

  currentFields.forEach(field => {
    if (field.hasAttribute("required")) {
      if (field.type === "radio") {
        // valida radio pelo name
        const radios = steps[currentStep].querySelectorAll(`input[name="${field.name}"]`);
        const isChecked = [...radios].some(r => r.checked);
        if (!isChecked) valid = false;
      } else if (!field.value.trim()) {
        valid = false;
      }
    }
  });

  if (!valid) {
    alert("Por favor, preencha todas as perguntas antes de continuar!");
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    alert("Formulário enviado!");
    const form = document.querySelector("form"); 
    if (form) form.submit();
  }
});


prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

showStep(currentStep);

// =====================
// Preview da imagem
// =====================
const fotoInput = document.getElementById("fotoAnimal");
const previewImg = document.getElementById("previewImg");

if (fotoInput && previewImg) {
  fotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        previewImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}
