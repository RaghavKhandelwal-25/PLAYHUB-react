function ProfileMenu({profileOpen,players,currentPlayer,setCurrentPlayerId}) {

  return (
    <div
      className={`profile-card ${profileOpen ? "open" : ""}`}
      id="player_menu"
    >
      <div id="curr-player">
        {currentPlayer.name}
      </div>

      <hr />

      <div className="player_list">

        {players
          .filter(player => player.id !== currentPlayer.id) //This removes the currently selected player from the dropdown list
          .map(player => (                                  //creates one button for each remaining player
            <button
              key={player.id}
              className="player_item"
              onClick={() => setCurrentPlayerId(player.id)}
            >
              {player.name}
            </button>
          ))}

        <button className="add_player">
          Add Player
        </button>

      </div>
    </div>
  );
}

export default ProfileMenu;