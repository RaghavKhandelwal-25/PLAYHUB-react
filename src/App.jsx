import "./App.css";
import Navbar from "./components/Navbar";
import ProfileMenu from "./components/ProfileMenu";
import Sidebar from "./components/Sidebar";
// import Overlay from "./components/Overlay";
import Hero from "./components/Hero";
import GameSection from "./components/GameSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="all-content">

      <header>
        <Navbar />
        <ProfileMenu />
        <Sidebar />
      </header>

      {/* <Overlay /> */}

      <Hero />

      <GameSection />

      <Footer />

    </div>
  );
}

export default App;