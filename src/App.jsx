import GameRule from "./components/GameRule/GameRule";
import GameBoard from "./components/GameBoard/GameBoard";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <main>
      <h1>MasterMind</h1>
      <div className="game">
        <GameBoard />
        <GameRule />
      </div>
      <Footer />
    </main>
  );
}

export default App;
