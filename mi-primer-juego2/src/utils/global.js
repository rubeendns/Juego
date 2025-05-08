export let globals = {
    nivelDesbloqueado: 1,
    jugadores: 1           
  };
  

  export function desbloquearNivel(nivel) {
    if (nivel > globals.nivelDesbloqueado) {
      globals.nivelDesbloqueado = nivel;
    }
  }
  

  export function setJugadores(numero) {
    globals.jugadores = numero;
  }
  