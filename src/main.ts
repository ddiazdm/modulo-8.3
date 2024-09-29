interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const arrayCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png", 
  }
];

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffleArray(array);
console.log(shuffledArray);

const cards = document.querySelectorAll(".card"); 

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped"); 
  });
});
