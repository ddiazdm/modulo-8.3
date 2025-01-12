// ui.ts
import { manejarVolteoDeCarta, sonPareja, parejaEncontrada, sePuedeVoltearLaCarta, parejaNoEncontrada } from "./motor";
import { tablero } from "./model";

let tableroBloqueado = false;

export const renderizarTablero = () => {
  const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;

  gridContainer.innerHTML = "";

  tablero.cartas.forEach((carta, indice) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    cardContainer.dataset.indice = indice.toString();

    const card = document.createElement("div");
    card.classList.add("card");


    const cardBack = document.createElement("div");
    cardBack.classList.add("card-face", "card-back");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-face", "card-front");

    const img = document.createElement("img");
    img.src = carta.imagen;
    img.alt = "Imagen de carta";

    cardFront.appendChild(img);
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    cardContainer.appendChild(card);
    gridContainer.appendChild(cardContainer);
  });

  agregarEventosACartas();
};

const agregarEventosACartas = () => {
  const cardContainers = document.querySelectorAll(".card-container");

  cardContainers.forEach((cardContainer) => {
    var divCard = cardContainer as HTMLDivElement;
    divCard.addEventListener("click", () => {
      if (tableroBloqueado) return;

      const indice = parseInt(divCard.dataset.indice!);

      if (sePuedeVoltearLaCarta(tablero, indice)) {
        voltearCarta(indice);
        actualizarintentosUI();

        if (tablero.estadoPartida === "DosCartasLevantadas") {
          tableroBloqueado = true;
          setTimeout(evaluarPareja, 1000);
        }
      }
    });
  });
};

const voltearCarta = (indice: number) => {
  manejarVolteoDeCarta(tablero, indice);
  actualizarVistaCartas();
};

const evaluarPareja = () => {
  const indiceA = tablero.indiceCartaVolteadaA!;
  const indiceB = tablero.indiceCartaVolteadaB!;

  if (sonPareja(indiceA, indiceB, tablero)) {
    parejaEncontrada(tablero, indiceA, indiceB);
    actualizarintentosUI(); 

  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB);
  }

  actualizarVistaCartas();
  tableroBloqueado = false;
};

const actualizarVistaCartas = () => {
  const cardContainers = document.querySelectorAll(".card-container");
  cardContainers.forEach((cardContainer, index) => {
    const card = cardContainer.querySelector(".card") as HTMLDivElement;
    if (tablero.cartas[index].estaVuelta || tablero.cartas[index].encontrada) {
      card.classList.add("flipped");
    } else {
      card.classList.remove("flipped");
    }
  });
};

const actualizarintentosUI = () => {
  const intentosElement = document.getElementById("intentos");
  if (intentosElement) {
    intentosElement.textContent = `Intentos: ${tablero.intentos}`;
  }
};




