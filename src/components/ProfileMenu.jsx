function ProfileMenu({profileOpen}) {
  return (
    <div
      className={`profile-card ${profileOpen ? "open" : ""}`}
      id="player_menu"
    >

      <div id="curr-player">
        Player 1
      </div>

      <hr />

      <div className="player_list">

        <button className="player_item">
          Player 2
        </button>

        <button className="player_item">
          Player 3
        </button>

        <button className="add_player">
          Add Player
        </button>

      </div>

    </div>
  );
}

export default ProfileMenu;