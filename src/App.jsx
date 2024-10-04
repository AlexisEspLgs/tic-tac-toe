import { useState } from 'react' // Importa el hook useState de React para manejar el estado
import confetti from 'canvas-confetti'; 
import './App.css' // Importa el archivo de estilos CSS
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinnerfrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameToStorage,resetGameToStorage } from './logic/storage';


function App() {
  // Define el estado del tablero, el turno actual y el ganador
  const [board, setBoard] = useState(() => {

    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return  Array(9).fill(null) 
  })


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  }) // Empieza con el turno de X

  const [winner, setWinner] = useState(null) // null indica que no hay ganador
  
  const resetGame  = () => {
    setBoard(Array(9).fill(null)) // Inicializa el tablero
    setTurn(TURNS.X) // Vuelve a empezar con el turno de X
    setWinner(null) // Vuelve a no haber ganador
    resetGameToStorage()
  }

  // Función para actualizar el tablero
  const updateBoard = (index) => {
    // Verifica si el cuadrado ya está ocupado o si ya hay un ganador
    if (board[index] || winner) return;
  
    const newBoard = [...board];
    newBoard[index] = turn; // Actualiza el tablero con el turno actual
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Alterna entre X y O
    setTurn(newTurn); // Actualiza el estado del turno
    //guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
  
    })
  
    // Verifica si hay un ganador
    const newWinner = checkWinnerfrom(newBoard);
    if (newWinner) {
      setWinner(newWinner); // Establece el nuevo ganador
      // Dispara el confetti
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Indica que el juego ha terminado en empate
    }
  };

  return (
    <main className='board'>
      <h1>tic tac toe </h1>
      <button onClick = {resetGame}> reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index} // Proporciona una clave única para cada cuadrado
                index={index} // Pasa el índice al cuadrado
                updateBoard={updateBoard} // Pasa la función para actualizar el tablero
              >
                {square}
              </Square>
               // {square }Muestra el contenido del cuadrado (X, O o vacío)
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

  <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App // Exporta el componente App para usarlo en otras partes de la aplicación