
import { useEffect, useRef, useState } from "react";
import "./TTT.css";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function findWinningMove(board, symbol) {
  for (const [a, b, c] of WIN_PATTERNS) {
    const line = [board[a], board[b], board[c]];
    const symbolCount = line.filter((cell) => cell === symbol).length;
    const emptyCount = line.filter((cell) => cell === null).length;

    if (symbolCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  return null;
}

function getComputerMove(board) {
  // Priority 1: Win if O can complete a line.
  const winningMove = findWinningMove(board, "O");
  if (winningMove !== null) return winningMove;

  // Priority 2: Block X if the player can win next.
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove !== null) return blockingMove;

  // Priority 3: Take the center.
  if (board[4] === null) return 4;

  // Priority 4: Prefer a corner.
  const corners = [0, 2, 6, 8].filter(
    (index) => board[index] === null
  );

  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Priority 5: Choose any remaining empty cell.
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function TTT({ balance, updateBalance }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [computerThinking, setComputerThinking] = useState(false);
  const [message, setMessage] = useState("Your turn! You are X.");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function finishGame(finalBoard) {
    const winner = getWinner(finalBoard);

    if (winner === "X") {
      setGameOver(true);
      setMessage("Congratulations! You won!");
      updateBalance(balance + 1000);
      return true;
    }

    if (winner === "O") {
      setGameOver(true);
      setMessage("Computer wins! Better luck next time.");
      return true;
    }

    if (finalBoard.every((cell) => cell !== null)) {
      setGameOver(true);
      setMessage("It's a draw!");
      updateBalance(balance + 500);
      return true;
    }

    return false;
  }

  function handleCellClick(index) {
    if (board[index] !== null || gameOver || computerThinking) {
      return;
    }

    // Make the player's move.
    const playerBoard = [...board];
    playerBoard[index] = "X";
    setBoard(playerBoard);

    // Check whether the player won or the game ended in a draw.
    if (finishGame(playerBoard)) return;

    setComputerThinking(true);
    setMessage("Computer is thinking...");

    // Brief delay so the computer's move feels natural.
    timeoutRef.current = setTimeout(() => {
      const computerIndex = getComputerMove(playerBoard);

      if (computerIndex === null) {
        setComputerThinking(false);
        return;
      }

      const computerBoard = [...playerBoard];
      computerBoard[computerIndex] = "O";
      setBoard(computerBoard);

      const ended = finishGame(computerBoard);

      setComputerThinking(false);

      if (!ended) {
        setMessage("Your turn! You are X.");
      }
    }, 500);
  }

  function startNewGame() {
    if (balance < 500) {
      alert("You need at least 500 coins to start a new game.");
      return;
    }

    clearTimeout(timeoutRef.current);
    updateBalance(balance - 500);

    setBoard(Array(9).fill(null));
    setGameOver(false);
    setComputerThinking(false);
    setMessage("Your turn! You are X.");
  }

  return (
    <main className="ttt-page">
      <h1 className="ttt-title">Tic Tac Toe</h1>

      <section className="ttt-game-area">
        <p className="ttt-status" aria-live="polite">
          {message}
        </p>

        <div className="ttt-board">
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              className={`ttt-cell ${cell ? `ttt-${cell.toLowerCase()}` : ""}`}
              onClick={() => handleCellClick(index)}
              disabled={cell !== null || gameOver || computerThinking}
              aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ": empty"}`}
            >
              {cell}
            </button>
          ))}
        </div>

        {gameOver && (
          <button
            type="button"
            className="ttt-new-game"
            onClick={startNewGame}
          >
            New Game (500 coins)
          </button>
        )}
      </section>
    </main>
  );
}

export default TTT;
