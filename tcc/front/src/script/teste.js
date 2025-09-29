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

  // Scroll automático para o topo da página
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextBtn.addEventListener("click", () => {
  const currentFields = steps[currentStep].querySelectorAll("input, textarea, select");
  let valid = true;

  currentFields.forEach(field => {
    if (field.hasAttribute("required")) {
      if (field.type === "radio") {
        const radios = steps[currentStep].querySelectorAll(`input[name="${field.name}"]`);
        const isChecked = [...radios].some(r => r.checked);
        if (!isChecked) valid = false;
      } else if (!field.value.trim()) {
        valid = false;
      }
    }
  });

  // if (!valid) {
  //   alert("Por favor, preencha todas as perguntas antes de continuar!");
  //   return;
  // }

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

const fotoInput = document.getElementById("fotoAnimal");
const previewContainer = document.getElementById("previewContainer");

const cropModal = document.getElementById("cropModal");
const imageToCrop = document.getElementById("imageToCrop");
const cropBtn = document.getElementById("cropBtn");
const cancelCrop = document.getElementById("cancelCrop");

let cropper;

fotoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    imageToCrop.src = ev.target.result;

    imageToCrop.onload = () => {
      cropModal.style.display = "flex";
      if (cropper) cropper.destroy();
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 4 / 3,
        viewMode: 1,
        autoCropArea: 1
      });
    };
  };
  reader.readAsDataURL(file);
});

cropBtn.addEventListener("click", () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({ width: 400, height: 300 });

    const croppedImg = document.createElement("img");
    croppedImg.src = canvas.toDataURL("image/png");
    croppedImg.style.maxWidth = "150px";
    croppedImg.style.margin = "10px";
    croppedImg.style.borderRadius = "8px";
    croppedImg.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    previewContainer.innerHTML = "";
    previewContainer.appendChild(croppedImg);

    cropModal.style.display = "none";
    cropper.destroy();
    cropper = null;
  }
});

cancelCrop.addEventListener("click", () => {
  cropModal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
});
