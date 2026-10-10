import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileMenu from "./components/ProfileMenu";
import Sidebar from "./components/Sidebar";
import Overlay from "./components/Overlay";
import Hero from "./components/Hero";
import GameSection from "./components/GameSection";
import Footer from "./components/Footer";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [players, setPlayers] = useState([
  { id: 1, name: "Player 1", balance: 500 },
  { id: 2, name: "Player 2", balance: 1000 },
  { id: 3, name: "Player 3", balance: 300 }
  ]);

  const [currentPlayerId, setCurrentPlayerId] = useState(1);

  const currentPlayer = players.find(
  player => player.id === currentPlayerId
  );

  function updateBalance(newBalance) {
    setPlayers(prevPlayers =>                 //prevPlayers represents the previous/current state value React provides to the updater function
      prevPlayers.map(player =>               //Take the latest players array, calculate an updated version of it, and save that version as the new state
        player.id === currentPlayerId
          ? { ...player, balance: newBalance }    //If this is the current player, return a new object with the updated balance
          : player                                //Otherwise, return the original player object unchanged.
      ));
  }

  function handleGameEntry(entryCost, gamePath) {
  if (currentPlayer.balance < entryCost) {
    alert(`You need at least ${entryCost} coins to play this game.`);
    return;
  }

  updateBalance(currentPlayer.balance - entryCost);

  console.log(`Entering ${gamePath}`);
}

  return (
    <div className="all-content">

      <header>
        <Navbar
          setSidebarOpen={setSidebarOpen}
          setProfileOpen={setProfileOpen}
          balance={currentPlayer.balance}
          updateBalance={updateBalance}
        />

        <ProfileMenu
          profileOpen={profileOpen}
          players={players}
          currentPlayer={currentPlayer}
          setCurrentPlayerId={setCurrentPlayerId}
        />

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}        
        />
      </header>

      <Overlay
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Hero />

      <GameSection handleGameEntry={handleGameEntry} />

      <Footer />

    </div>
  );
}

export default App;