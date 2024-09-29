import { barajarCartas, voltearLaCarta, sonPareja, parejaEncontrada } from "./motor";
import { Carta, Tablero } from "./model";

describe("barajarCartas", () => {
  it("debería barajar las cartas", () => {
    const cartas = [
      { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: false },
      { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      { idFoto: 3, imagen: "url3", estaVuelta: false, encontrada: false },
      { idFoto: 4, imagen: "url4", estaVuelta: false, encontrada: false },
      { idFoto: 5, imagen: "url5", estaVuelta: false, encontrada: false },
      { idFoto: 6, imagen: "url6", estaVuelta: false, encontrada: false },
    ];

    const cartasBarajadas = barajarCartas([...cartas]);

    expect(cartasBarajadas.length).toBe(cartas.length);

    expect(cartasBarajadas).not.toEqual(cartas);

    const cartasOriginalesIds = cartas.map((carta) => carta.idFoto).sort();
    const cartasBarajadasIds = cartasBarajadas
      .map((carta) => carta.idFoto)
      .sort();
    expect(cartasBarajadasIds).toEqual(cartasOriginalesIds);
  });
});

describe("VoltearCarta", () => {
  it("debería voltear la carta", () => {
    const cartas: Carta[] = [
      { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: false },
      { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      { idFoto: 3, imagen: "url3", estaVuelta: false, encontrada: false },
      { idFoto: 4, imagen: "url4", estaVuelta: false, encontrada: false },
      { idFoto: 5, imagen: "url5", estaVuelta: false, encontrada: false },
      { idFoto: 6, imagen: "url6", estaVuelta: false, encontrada: false },
    ];
    const tablero: Tablero = {
      cartas,
      estadoPartida: "CeroCartasLevantadas",
    };
    const indiceCarta = 0;

    voltearLaCarta(tablero, indiceCarta);

    expect(tablero.cartas[indiceCarta].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe("UnaCartaLevantada");
    expect(tablero.indiceCartaVolteadaA).toBe(indiceCarta);

    it("debería lanzar un error al intentar voltear una tercera carta", () => {
      const cartas: Carta[] = [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: false },
        { idFoto: 3, imagen: "url3", estaVuelta: false, encontrada: false },
      ];

      const tablero: Tablero = {
        cartas,
        estadoPartida: "DosCartasLevantadas",
        indiceCartaVolteadaA: 0,
        indiceCartaVolteadaB: 1,
      };

      const indiceTerceraCarta = 2;

      expect(() => voltearLaCarta(tablero, indiceTerceraCarta)).toThrow(
        "No puedes voltear más de dos cartas a la vez"
      );
    });
  });
});

describe("sonPareja", () => {
  it("debería devolver true si las cartas son pareja", () => {
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
    };

    expect(sonPareja(0, 1, tablero)).toBe(true);
  });

  it("debería devolver true si las cartas son pareja", () => {
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "url2", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
    };

    expect(sonPareja(0, 1, tablero)).toBe(true);
  });
});

describe('parejaEncontrada', () => {
  it('debería marcar dos cartas como encontradas y cambiar el estado a "CeroCartasLevantadas" si aún no se han encontrado todas las cartas', () => {
    const cartas: Carta[] = [
      { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
      { idFoto: 1, imagen: "url2", estaVuelta: true, encontrada: false },
      { idFoto: 2, imagen: "url3", estaVuelta: true, encontrada: false },
      { idFoto: 2, imagen: "url4", estaVuelta: true, encontrada: false },
      { idFoto: 3, imagen: "url5", estaVuelta: true, encontrada: false },
      { idFoto: 3, imagen: "url6", estaVuelta: true, encontrada: false }
    ];

    const tablero: Tablero = {
      cartas,
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1
    };

    parejaEncontrada(tablero, 0, 1);

    expect(tablero.cartas[0].encontrada).toBe(true);
    expect(tablero.cartas[1].encontrada).toBe(true);

    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
  });

  it('debería marcar dos cartas como encontradas y cambiar el estado a "PartidaCompleta" si se han encontrado todas las parejas', () => {
    const cartas: Carta[] = [
      { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },  // Ya encontrada
      { idFoto: 1, imagen: "url2", estaVuelta: true, encontrada: true },  // Ya encontrada
      { idFoto: 2, imagen: "url3", estaVuelta: true, encontrada: true },  // Ya encontrada
      { idFoto: 2, imagen: "url4", estaVuelta: true, encontrada: true },  // Ya encontrada
      { idFoto: 3, imagen: "url5", estaVuelta: true, encontrada: false },  // No encontrada aún
      { idFoto: 3, imagen: "url6", estaVuelta: true, encontrada: false }   // No encontrada aún
    ];

    const tablero: Tablero = {
      cartas,
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 4,
      indiceCartaVolteadaB: 5
    };

    parejaEncontrada(tablero, 4, 5);

    expect(tablero.cartas[4].encontrada).toBe(true);
    expect(tablero.cartas[5].encontrada).toBe(true);

    expect(tablero.estadoPartida).toBe("PartidaCompleta");
  });
});


