
import { useState, useEffect, useRef } from "react";
import "./SevenUp.css";

function SevenUp({ balance, updateBalance }) {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [userChoice, setUserChoice] = useState(null);
  const [sum, setSum] = useState(null);
  const [result, setResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  function rollDice() {
    if (!userChoice || isRolling || result) return;

    setIsRolling(true);

    timeoutRef.current = setTimeout(() => {
      const first = Math.floor(Math.random() * 6) + 1;
      const second = Math.floor(Math.random() * 6) + 1;
      const total = first + second;

      setDice1(first);
      setDice2(second);
      setSum(total);

      let won = false;
      let reward = 0;

      if (userChoice === "Under 7" && total < 7) {
        won = true;
        reward = 400;
      } else if (userChoice === "Exactly 7" && total === 7) {
        won = true;
        reward = 1000;
      } else if (userChoice === "Over 7" && total > 7) {
        won = true;
        reward = 400;
      }

      if (won) {
        updateBalance(balance + reward);
        setResult({
          won: true,
          message: `You Win! It's ${userChoice}`,
        });
      } else {
        setResult({
          won: false,
          message: "You Lose!",
        });
      }

      setIsRolling(false);
    }, 800);
  }

  function playAgain() {
    if (balance < 200) {
      alert("You need at least 200 coins to play again.");
      return;
    }

    updateBalance(balance - 200);
    setDice1(1);
    setDice2(1);
    setUserChoice(null);
    setSum(null);
    setResult(null);
  }

  return (
    <div className="sevenup-page">
      <h1 className="sevenup-title">7 Up 7 Down</h1>

      <section className="sevenup-game-area">
        <h2 className="sevenup-heading">Make Your Prediction</h2>

        <div className="sevenup-dice">
          <div className={isRolling ? "sevenup-die rolling" : "sevenup-die"}>
            {diceFaces[dice1 - 1]}
          </div>
          <div className={isRolling ? "sevenup-die rolling" : "sevenup-die"}>
            {diceFaces[dice2 - 1]}
          </div>
        </div>

        <h3 className="sevenup-subheading">What will the total be?</h3>

        <div className="sevenup-predictions">
          {["Under 7", "Exactly 7", "Over 7"].map((choice) => (
            <button
              key={choice}
              className={`sevenup-prediction ${
                userChoice === choice ? "selected" : ""
              }`}
              disabled={isRolling || !!result}
              onClick={() => setUserChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>

        <button
          className="sevenup-roll-button"
          onClick={rollDice}
          disabled={!userChoice || isRolling || !!result}
        >
          {isRolling ? "Rolling..." : "Roll the Dice!"}
        </button>

        {result && (
          <div className="sevenup-result">
            <div className="sevenup-total">Total Sum: {sum}</div>
            <div className={result.won ? "sevenup-winner won" : "sevenup-winner lost"}>
              {result.message}
            </div>
            <button
              className="sevenup-again-button"
              onClick={playAgain}
            >
              Play Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default SevenUp;
