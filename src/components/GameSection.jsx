import GameCard from "./GameCard";

function GameSection({handleGameEntry}) {
  return (
    <div className="middle2">

      <GameCard
        gameClass="box1"
        icon="fa-solid fa-scissors"
        title="Rock Paper Scissor"
        description="Classic hand game"
        entryCost="300"
        winAmount="600"
        gradient="linear-gradient(to right, #ef4444, #b91c1c)"
        onPlay={() => handleGameEntry(300, "/rps")}
      />

      <GameCard
        gameClass="box2"
        icon="fa-solid fa-coins"
        title="Coin Flip"
        description="Heads or Tails?"
        entryCost="100"
        winAmount="200"
        gradient="linear-gradient(to right, #eab308, #a16207)"
        onPlay={() => handleGameEntry(100, "/coinflip")}
      />

      <GameCard
        gameClass="box3"
        icon="fa-solid fa-table-cells"
        title="Tic Tac Toe"
        description="Beat the AI"
        entryCost="500"
        winAmount="1000"
        gradient="linear-gradient(to right, #22c55e, #15803d)"
        onPlay={() => handleGameEntry(500, "/ttt")}
      />

      <GameCard
        gameClass="box4"
        icon="fa-solid fa-dice"
        title="7 Up 7 Down"
        description="Predict the dice sum"
        entryCost="200"
        winAmount="400"
        gradient="linear-gradient(to right, #a855f7, #7e22ce)"
        onPlay={() => handleGameEntry(200, "/7up")}
      />

    </div>
  );
}

export default GameSection;