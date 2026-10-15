
import { useState, useEffect, useRef } from "react";
import "./CF.css";

function CoinFlip({ balance, updateBalance }) {
  const [userChoice, setUserChoice] = useState(null);
  const [coin, setCoin] = useState("H");
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);

  const intervalRef = useRef(null);     //stores the timer that repeatedly changes the coin's letter.
  const timeoutRef = useRef(null);      //stores the timer that ends the animation after two seconds.

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);       //clearInterval stops the repeated letter changes.
      clearTimeout(timeoutRef.current);
    };
  }, []);

  function flipCoin() {
    if (!userChoice || isFlipping || result) return;

    setIsFlipping(true);

    intervalRef.current = setInterval(() => {
      setCoin(previous => (previous === "H" ? "T" : "H"));
    }, 100);

    const computerChoice =
      Math.random() < 0.5 ? "Head" : "Tail";

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);

      setCoin(computerChoice === "Head" ? "H" : "T");
      setIsFlipping(false);

      const won = userChoice === computerChoice;

      setResult({ won, computerChoice});

      if (won) {
        updateBalance(balance + 200);
      }
    }, 2000);
  }

  function playAgain() {
    if (balance < 100) {
      alert("You need at least 100 coins to play again.");
      return;
    }

    updateBalance(balance - 100);
    setResult(null);
    setUserChoice(null);
    setCoin("H");
  }

  return (
    <div className="coinflip-page">
      <div className="coinflip-title">COINFLIP</div>

      <section className="coinflip-game-area">
        <h1 className="coinflip-heading">Make Your Choice</h1>

        <div className="coinflip-coin-area">
          <div
            className={`coinflip-coin ${
              isFlipping ? "coinflip-spin" : ""
            }`}
          >
            {coin}
          </div>
        </div>

        <h2 className="coinflip-subheading">Choose your side:</h2>

        <div className="coinflip-choices">
          <button
            className={`coinflip-choice ${
              userChoice === "Head" ? "selected" : ""
            }`}
            disabled={isFlipping || !!result}
            onClick={() => setUserChoice("Head")}
          >
            Heads
          </button>

          <button
            className={`coinflip-choice ${
              userChoice === "Tail" ? "selected" : ""
            }`}
            disabled={isFlipping || !!result}
            onClick={() => setUserChoice("Tail")}
          >
            Tails
          </button>
        </div>

        <button
          className="coinflip-flip-button"
          onClick={flipCoin}
          disabled={!userChoice || isFlipping || !!result}
        >
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </button>

        {result && (
          <div className="coinflip-result">
            <div
              className={`coinflip-result-message ${
                result.won ? "won" : "lost"
              }`}
            >
              {result.won
                ? `You Win! It's ${result.computerChoice}`
                : `You Lose! It's ${result.computerChoice}`}
            </div>

            <button
              className="coinflip-again-button"
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

export default CoinFlip;
