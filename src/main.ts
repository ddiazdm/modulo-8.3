
import {  renderizarTablero} from './ui';
import { tablero } from "./model";
import { iniciaPartida} from './motor';



const startButton = document.getElementById("start") as HTMLButtonElement;

startButton.addEventListener("click", () => {
  iniciaPartida(tablero);
  renderizarTablero();
});