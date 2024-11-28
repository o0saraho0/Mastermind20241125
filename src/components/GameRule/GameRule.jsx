import { FaCircle } from "react-icons/fa";
import "./GameRule.css";

function GameRule() {
  return (
    <div>
      <h2>Game Rules</h2>

      <h3>Objective</h3>
      <p>
        A secret combination of 4 numbers is selected and you have to guess that
        combination in 8 or fewer tries to win.
      </p>

      <h3>How to play</h3>
      <p>
        From top to bottom, at each row, click on an input field and enter a
        number between 0 and 9. After filling all input fields in a row, you can
        check your guess.
      </p>

      <div className="circle_rule">
        <p>
          <span className="circle green_circle">
            <FaCircle />
          </span>
          A green circle means the number and its position is correct.
        </p>
        <p>
          <span className="circle orange_circle">
            <FaCircle />
          </span>
          An orange circle means that the number exists in the combination but
          the position is not correct.
        </p>
        <p>
          <span className="circle grey_circle">
            <FaCircle />
          </span>
          A grey circle means that number is not in the combination at all.
        </p>
      </div>
    </div>
  );
}

export default GameRule;
