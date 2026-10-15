
import Hero from "../components/Hero";
import GameSection from "../components/GameSection";
import Footer from "../components/Footer";

function Home({ handleGameEntry }) {
  return (
    <>
      <Hero />
      <GameSection handleGameEntry={handleGameEntry} />
      <Footer />
    </>
  );
}

export default Home;
