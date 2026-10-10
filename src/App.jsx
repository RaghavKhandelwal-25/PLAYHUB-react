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

  return (
    <div className="all-content">

      <header>
        <Navbar
          setSidebarOpen={setSidebarOpen}
          setProfileOpen={setProfileOpen}
          balance={currentPlayer.balance}
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

      <GameSection />

      <Footer />

    </div>
  );
}

export default App;