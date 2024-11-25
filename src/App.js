import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <main>
      <div className="game_board"></div>
      <div className="game_rule">
        <h1>MasterMind</h1>
        <h2>Game Rules</h2>

        <h3>Objective</h3>
        <p>
          A secret combination of 4 numbers is selected and you have to guess
          that combination in 8 or fewer tries to win.
        </p>

        <h3>How to play</h3>
        <p>
          From top to bottom, at each row, click on an input field and enter a
          number between 0 and 9. After filling all input fields in a row, you
          can check your guess.
        </p>

        <ul>
          <li>A green circle means the color and the position is correct.</li>
          <li>
            An orange circle means that the color exists in the combination but
            the position is not correct.
          </li>
          <li>
            An empty circle means that color is not in the combination at all.
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
