import { useState, useEffect} from "react";

import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

import RPS from "./pages/RPS";
import CoinFlip from "./pages/CF";
import TicTacToe from "./pages/TTT";
import SevenUp from "./pages/SevenUp";
import Home from "./pages/Home";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileMenu from "./components/ProfileMenu";
import Sidebar from "./components/Sidebar";
import Overlay from "./components/Overlay";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");

    if (savedPlayers) {
      return JSON.parse(savedPlayers);                  //JSON.parse() converts that string back into an array of objects.
    }

    return [
      { id: 1, name: "Player 1", balance: 1000 },
      { id: 2, name: "Player 2", balance: 2500 },
      { id: 3, name: "Player 3", balance: 500 }
    ];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));       //JSON.stringify(players) converts the players array into a string.
  }, [players]);

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

    navigate(gamePath);
  }

  function addPlayer() {
    const newPlayer = {
      id: Date.now(),
      name: `Player ${players.length + 1}`,
      balance: 1000
    };

    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
    setCurrentPlayerId(newPlayer.id);
    setProfileOpen(false);
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
          addPlayer={addPlayer}
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

      <Routes>
        <Route
          path="/"
          element={<Home handleGameEntry={handleGameEntry} />}
        />

        <Route
          path="/rps"
          element={
            <RPS
              balance={currentPlayer.balance}
              updateBalance={updateBalance}
            />
          }
        />
        <Route
          path="/coinflip"
          element={
            <CoinFlip
              balance={currentPlayer.balance}
              updateBalance={updateBalance}
            />
          }
        />
        <Route path="/ttt" element={<TicTacToe />} />
        <Route path="/7up" element={<SevenUp />} />
      </Routes>
    </div>
  );
}

export default App;