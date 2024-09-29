// ui.ts
import { manejarVolteoDeCarta, sonPareja, parejaEncontrada } from "./motor";
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

      manejarVolteoDeCarta(tablero, indice);
      var carta = tablero.cartas[indice];
      var card = divCard.querySelector(".card") as HTMLDivElement;
      if (carta.estaVuelta || carta.encontrada) {
        card.classList.add("flipped");
      }
      
      if (tablero.estadoPartida === "DosCartasLevantadas") {
        const indiceA = tablero.indiceCartaVolteadaA!;
        const indiceB = tablero.indiceCartaVolteadaB!;

        if (sonPareja(indiceA, indiceB, tablero)) {
          parejaEncontrada(tablero, indiceA, indiceB);

          renderizarTablero();
    
        } else {

          tableroBloqueado = true;

          setTimeout(() => {
            tablero.cartas[indiceA].estaVuelta = false;
            tablero.cartas[indiceB].estaVuelta = false;

            tablero.indiceCartaVolteadaA = undefined;
            tablero.indiceCartaVolteadaB = undefined;
            tablero.estadoPartida = "CeroCartasLevantadas";

            tableroBloqueado = false;

            renderizarTablero();
          }, 1000); 
        }
      }
    });
  });
};
