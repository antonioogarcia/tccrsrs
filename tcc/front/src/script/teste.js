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
  window.scrollTo({ top: 0, behavior: "smooth" });
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

  // 🔹 Verificação da bio
  const bioField = steps[currentStep].querySelector('textarea[name="bio"]');
  if (bioField) {
    const bioLength = bioField.value.trim().length;
    if (bioLength < 100) {
      alert("A bio está muito curta, descreva melhor o cachorro.");
      return;
    }
  }

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

// 🖼️ Upload múltiplo de fotos
const fotoInput = document.getElementById("fotoAnimal");
const previewContainer = document.getElementById("previewContainer");

const cropModal = document.getElementById("cropModal");
const imageToCrop = document.getElementById("imageToCrop");
const cropBtn = document.getElementById("cropBtn");
const cancelCrop = document.getElementById("cancelCrop");

let cropper;
let filesQueue = []; // Fila de imagens a serem cortadas
let isCropping = false;

fotoInput.addEventListener("change", (e) => {
  filesQueue = Array.from(e.target.files);
  if (filesQueue.length > 0 && !isCropping) {
    abrirProximaImagem();
  }
});

function abrirProximaImagem() {
  if (filesQueue.length === 0) {
    isCropping = false;
    return;
  }

  isCropping = true;
  const file = filesQueue.shift();
  const reader = new FileReader();

  reader.onload = (ev) => {
    imageToCrop.src = ev.target.result;

    // Aguarda imagem carregar antes de abrir modal e criar cropper
    imageToCrop.onload = () => {
      cropModal.style.display = "flex";

      // Destroi qualquer cropper anterior
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }

      // Cria novo cropper
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 4 / 3,
        viewMode: 1,
        autoCropArea: 1,
      });
    };
  };

  reader.readAsDataURL(file);
}

// Quando o usuário confirma o corte
cropBtn.addEventListener("click", () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({ width: 400, height: 300 });

    const croppedImg = document.createElement("img");
    croppedImg.src = canvas.toDataURL("image/png");
    croppedImg.style.maxWidth = "150px";
    croppedImg.style.margin = "10px";
    croppedImg.style.borderRadius = "8px";
    croppedImg.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    previewContainer.appendChild(croppedImg);

    // Fecha modal e prepara próxima imagem
    cropModal.style.display = "none";
    cropper.destroy();
    cropper = null;

    abrirProximaImagem();
  }
});

// Quando o usuário cancela o corte
cancelCrop.addEventListener("click", () => {
  cropModal.style.display = "none";
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  abrirProximaImagem();
});'1                   /'

// 🐶 Select de raças
async function carregarRacas() {
  const select = document.getElementById("raca");
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    select.innerHTML = "";

    const srdOption = document.createElement("option");
    srdOption.value = "SRD";
    srdOption.textContent = "SRD (Sem Raça Definida)";
    select.appendChild(srdOption);

    const racas = Object.keys(data.message);

    const populares = [
      "labrador", "golden retriever", "poodle", "bulldog",
      "shih tzu", "rottweiler", "pastor alemão", "beagle",
      "yorkshire", "border collie", "pug", "pinscher"
    ];

    populares.forEach(raca => {
      const option = document.createElement("option");
      option.value = raca;
      option.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
      select.appendChild(option);
    });

    racas.forEach(raca => {
      const option = document.createElement("option");
      option.value = raca;
      option.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar raças:", error);
    select.innerHTML = "<option>Erro ao carregar raças</option>";
  }
}

carregarRacas();
