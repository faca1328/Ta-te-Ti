import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
      checkWinner(newBoard);
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('Empate');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <div className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Juego del Ta Te Ti</h1>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && (
        <div className="winner">
          {winner === 'Empate' ? '¡Empate!' : `¡${winner} ganó!`}
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>
        Reiniciar Juego
      </button>
    </div>
  );
};

export default App;