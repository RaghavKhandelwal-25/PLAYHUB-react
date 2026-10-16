
import { useState } from "react";
import "./rps.css";

function RPS({ balance, updateBalance }) {
  const [userChoice, setUserChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState("Challenge Computer!");
  const [messageType, setMessageType] = useState("");
  const [roundComplete, setRoundComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function playGame() {
    if (!userChoice || roundComplete || gameOver) return;

    const choices = ["Rock", "Paper", "Scissor"];
    const compChoice = choices[Math.floor(Math.random() * 3)];

    let newUserScore = userScore;
    let newCompScore = compScore;

    if (userChoice === compChoice) {
      setDrawScore(prev => prev + 1);
      setMessage("Game Draw!");
      setMessageType("draw");
    } else {
      const userWon =
        (userChoice === "Rock" && compChoice === "Scissor") ||
        (userChoice === "Paper" && compChoice === "Rock") ||
        (userChoice === "Scissor" && compChoice === "Paper");

      if (userWon) {
        newUserScore++;
        setMessage(`You Win! Your ${userChoice} beats ${compChoice}`);
        setMessageType("win");
      } else {
        newCompScore++;
        setMessage(`You Lose! ${compChoice} beats your ${userChoice}`);
        setMessageType("lose");
      }
    }

    setUserScore(newUserScore);
    setCompScore(newCompScore);
    setRoundComplete(true);

    if (round === 3) {
      setGameOver(true);

      if (newUserScore > newCompScore) {
        setMessage(
          userChoice === compChoice
            ? "Game Over! You won."
            : `Game Over! You won this match.`
        );
        setMessageType("win");
        updateBalance(balance + 600);
      } else if (newUserScore < newCompScore) {
        setMessage("Game Over! You lose.");
        setMessageType("lose");
      } else {
        setMessage("Game Over! It's a Draw.");
        setMessageType("draw");
        updateBalance(balance + 300);
      }
    }
  }

  function nextRound() {
    if (gameOver) {
      updateBalance(balance - 300);
      setUserScore(0);
      setCompScore(0);
      setDrawScore(0);
      setRound(1);
      setGameOver(false);
    } else {
      setRound(round + 1);
    }

    setUserChoice(null);
    setRoundComplete(false);
    setMessage("Challenge Computer!");
    setMessageType("");
  }

  return (
    <div className="rps-page">
      <h1 className="rps-title">Rock Paper Scissor</h1>

      <section className="rps-game-area">
        <div className="rps-round">Round {round}</div>

        <div className="rps-choices">
          {["Rock", "Paper", "Scissor"].map((choice) => (
            <button
              key={choice}
              className={`rps-choice ${
                userChoice === choice ? "selected" : ""
              }`}
              disabled={roundComplete || gameOver}
              onClick={() => setUserChoice(choice)}
            >
              {choice === "Rock" && (
                <i className="fa-regular fa-hand-back-fist" />
              )}
              {choice === "Paper" && (
                <i className="fa-regular fa-hand" />
              )}
              {choice === "Scissor" && (
                <i className="fa-regular fa-hand-scissors" />
              )}
            </button>
          ))}
        </div>

        <div className="rps-player-choice">
          Your Choice: {userChoice || ""}
        </div>

        <button
          className={`rps-challenge ${messageType}`}
          disabled={!userChoice || roundComplete || gameOver}
          onClick={playGame}
        >
          {message}
        </button>

        <div className="rps-scores">
          <div>
            <p>{userScore}</p>
            <span>You</span>
          </div>
          <div>
            <p>{compScore}</p>
            <span>Comp</span>
          </div>
          <div>
            <p>{drawScore}</p>
            <span>Draws</span>
          </div>
        </div>

        {roundComplete && (
          <div className="rps-next">
            <button onClick={nextRound}>
              {gameOver ? "Play Again" : "Next Round"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default RPS;
