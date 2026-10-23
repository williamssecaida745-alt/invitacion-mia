

const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const botonAbrir = document.getElementById("abrirInvitacion");
const confirmar = document.getElementById("confirmar");

// Número de WhatsApp con código de país.
// Guatemala: 502 + 8 dígitos.
const numeroWhatsApp = "50235804695";

const fechaEvento = new Date(2026, 10, 7, 15, 0, 0);
let temporizador = null;

// ===================================
// ABRIR LA INVITACIÓN
// ===================================

botonAbrir.addEventListener("click", () => {
  portada.classList.add("oculta");
  invitacion.classList.add("visible");

  actualizarContador();

  if (temporizador === null) {
    temporizador = setInterval(actualizarContador, 1000);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===================================
// CUENTA REGRESIVA
// ===================================

function actualizarContador() {
  const diferencia = fechaEvento.getTime() - Date.now();

  const elementos = {
    dias: document.getElementById("dias"),
    horas: document.getElementById("horas"),
    minutos: document.getElementById("minutos"),
    segundos: document.getElementById("segundos")
  };

  if (diferencia <= 0) {
    Object.values(elementos).forEach((elemento) => {
      if (elemento) {
        elemento.textContent = "00";
      }
    });

    const cuenta = document.getElementById("cuentaRegresiva");

    if (cuenta) {
      cuenta.innerHTML =
        '<p class="mensaje-final">🎉 ¡Llegó el gran día de Mia! 🎂</p>';
    }

    if (temporizador !== null) {
      clearInterval(temporizador);
      temporizador = null;
    }

    return;
  }

  const valores = {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor(diferencia / 3600000) % 24,
    minutos: Math.floor(diferencia / 60000) % 60,
    segundos: Math.floor(diferencia / 1000) % 60
  };

  Object.entries(valores).forEach(([id, valor]) => {
    if (elementos[id]) {
      elementos[id].textContent = String(valor).padStart(2, "0");
    }
  });
}

// ===================================
// CONFIRMACIÓN POR WHATSAPP
// ===================================

confirmar.addEventListener("click", (evento) => {
  evento.preventDefault();

  // Obtener las cantidades seleccionadas.
  const selectorAdultos = document.getElementById("adultos");
  const selectorNinos = document.getElementById("ninos");

  if (!selectorAdultos || !selectorNinos) {
    alert(
      "No se encontraron los selectores de adultos y niños. " +
      "Verifica que estén incluidos en index.html."
    );
    return;
  }

  const adultos = selectorAdultos.value;
  const ninos = selectorNinos.value;

  // Verificar el número de WhatsApp.
  if (!/^502\d{8}$/.test(numeroWhatsApp)) {
    alert(
      "Revisa el número de WhatsApp configurado en script.js."
    );
    return;
  }

  // Crear el mensaje con las cantidades seleccionadas.
  const mensaje =
    "¡Hola! Quiero confirmar mi asistencia al cumpleaños " +
    "número 6 de Mia, el sábado 7 de noviembre de 2026 " +
    "a las 3:00 p. m.\n\n" +
    "👨‍👩‍👧‍👦 Cantidad de adultos: " + adultos + "\n" +
    "🧸 Cantidad de niños: " + ninos + "\n\n" +
    "¡Muchas gracias! 🎂🚀";

  // Preparar el enlace de WhatsApp.
  const urlWhatsApp =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(mensaje);

  // Abrir WhatsApp con el mensaje preparado.
  window.open(urlWhatsApp, "_blank", "noopener,noreferrer");

  // Lanzar confeti al confirmar.
  lanzarConfeti();
});

// ===================================
// CONFETI
// ===================================

function lanzarConfeti() {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const colores = [
    "#ffdf58",
    "#8bd3ff",
    "#ff91b8",
    "#8de0b1",
    "#ffffff"
  ];

  for (let i = 0; i < 55; i++) {
    const pieza = document.createElement("span");

    pieza.className = "confeti-mia";

    pieza.style.setProperty(
      "--x",
      Math.random() * 100 + "vw"
    );

    pieza.style.setProperty(
      "--color",
      colores[Math.floor(Math.random() * colores.length)]
    );

    pieza.style.setProperty(
      "--tiempo",
      1.5 + Math.random() * 1.8 + "s"
    );

    document.body.appendChild(pieza);

    setTimeout(() => {
      pieza.remove();
    }, 3500);
  }
}

