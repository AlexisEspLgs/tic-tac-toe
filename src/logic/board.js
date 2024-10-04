import { WINNER_COMBOS } from "../constants"
export const checkWinnerfrom = (boardToCheck) => {
    // Recorre las combinaciones ganadoras del tablero
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null // No hay ganador
  }

  export   

  const checkEndGame = (newBoard) => {
    // Recorre el tablero completo para ver si hay celdas vacías
    return newBoard.every((square) => square !== null )  
  }