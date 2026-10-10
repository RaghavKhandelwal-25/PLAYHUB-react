function GameCard({
  gameClass,
  icon,
  title,
  description,
  entryCost,
  winAmount,
  gradient,
  onPlay
}) {
  return (
    <div className={`${gameClass} BOX`}>

      <div
        className="box-img"
        style={{
          background: gradient
        }}
      >
        <i className={icon}></i>
      </div>

      <h2>
        {title}
      </h2>

      <h4>
        {description}
      </h4>

      <p className="box-line1">
        Entry Cost
      </p>

      <div className="amount">
        <i className="fa-solid fa-money-bill-1"></i>

        <div>
          {entryCost}
        </div>
      </div>

      <button
        className="game-entry"
        style={{ background: gradient }}
        onClick={onPlay}
      >
        Play Now
      </button>

      <p className="win">
        Win: {winAmount} coins
      </p>

    </div>
  );
}

export default GameCard;