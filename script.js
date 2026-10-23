
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const botonAbrir = document.getElementById("abrirInvitacion");
const confirmar = document.getElementById("confirmar");

// Escribe aquí el número con código de país, solo números.
// Guatemala: 502 seguido de los 8 dígitos.
// Ejemplo de formato: 502XXXXXXXX
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

  // Desplazarse suavemente al inicio de la invitación.
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
      elemento.textContent = "00";
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
    elementos[id].textContent = String(valor).padStart(2, "0");
  });
}

// ===================================
// CONFIRMACIÓN POR WHATSAPP
// ===================================

const mensaje =
  "¡Hola! Quiero confirmar mi asistencia al cumpleaños " +
  "número 6 de Mia, el sábado 7 de noviembre de 2026 " +
  "a las 3:00 p. m. ¡Muchas gracias! 🎂🚀";

if (/^502\d{8}$/.test(numeroWhatsApp)) {
  confirmar.href =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(mensaje);

  confirmar.target = "_blank";
  confirmar.rel = "noopener noreferrer";
} else {
  confirmar.addEventListener("click", (evento) => {
    evento.preventDefault();

    alert(
      "Para confirmar por WhatsApp, primero configura " +
      "el número en el archivo script.js."
    );
  });
}

// ===================================
// CONFETI AL CONFIRMAR ASISTENCIA
// ===================================

confirmar.addEventListener("click", () => {
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
});
