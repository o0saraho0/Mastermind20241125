import { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import "./App.css";

function App() {
  const attempts = 8;
  const inputsPerRow = 4;

  const [answer, setAnswer] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [feedback, setFeedback] = useState(
    Array.from({ length: attempts }, () => Array(inputsPerRow).fill(0))
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    const generateRandomNumber = () => {
      let res = "";
      for (let i = 0; i < 4; i++) {
        const digit = Math.floor(Math.random() * 10);
        res += digit.toString();
      }
      return res;
    };
    const randomAnswer = generateRandomNumber();
    setAnswer(randomAnswer);
  }, []);

  const handleInput = (rowIndex, inputIndex, event) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value)) {
      event.target.value = value;
      if (inputRefs.current[rowIndex][inputIndex + 1]) {
        inputRefs.current[rowIndex][inputIndex + 1].focus();
      }
    } else {
      alert("Please enter a number from 0-9");
      event.target.value = "";
    }
  };

  const checkAnswer = () => {
    const guessDigits = inputRefs.current[activeRow].map((e) => e.value);
    const answerDigits = [...answer];
    const answerSet = new Set(answerDigits);
    const guessFeedback = Array(inputsPerRow).fill(0);

    guessDigits.forEach((digit, i) => {
      if (digit.toString() === answerDigits[i]) {
        guessFeedback[i] = 2;
      } else if (answerSet.has(digit)) {
        guessFeedback[i] = 1;
      }
      answerSet.delete(digit);
    });

    const newFeedback = [...feedback];
    newFeedback[activeRow] = guessFeedback;
    setFeedback(newFeedback);

    if (guessDigits.join("") === answer) {
      alert("Congratulations! You guessed correctly!");
    } else {
      if (activeRow < attempts - 1) {
        setActiveRow(activeRow + 1);
      } else {
        alert(`Game over! The correct answer was ${answer}.`);
      }
    }
  };

  return (
    <main>
      <h1>MasterMind</h1>
      <div className="game">
        <div className="game_board">
          <div>The Answer is: {answer}</div>
          <div>
            {Array.from({ length: attempts }).map((_, rowIndex) => (
              <div key={rowIndex} className="game_row">
                {Array.from({ length: inputsPerRow }).map((_, inputIndex) => (
                  <input
                    key={`row-${rowIndex}-input-${inputIndex}`}
                    type="text"
                    maxLength="1"
                    ref={(el) => {
                      if (!inputRefs.current[rowIndex]) {
                        inputRefs.current[rowIndex] = [];
                      }
                      inputRefs.current[rowIndex][inputIndex] = el;
                    }}
                    onChange={(e) => handleInput(rowIndex, inputIndex, e)}
                    disabled={rowIndex !== activeRow}
                  ></input>
                ))}
                <div>
                  {feedback[rowIndex]?.map((value, i) => {
                    if (value === 2)
                      return <FaCircle key={i} className="green_circle" />;
                    if (value === 1)
                      return <FaCircle key={i} className="orange_circle" />;
                    return <FaRegCircle key={i} className="empty_circle" />;
                  })}
                </div>
                <button
                  onClick={checkAnswer}
                  disabled={
                    !inputRefs.current[activeRow] ||
                    inputRefs.current[activeRow].some(
                      (input) => !input || !input.value
                    )
                  }
                >
                  Check
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="game_rule">
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

          <div className="circle_rule">
            <p>
              <span className="green_circle">
                <FaCircle />
              </span>
              A green circle means the number and its position is correct.
            </p>
            <p>
              <span className="orange_circle">
                <FaCircle />
              </span>
              An orange circle means that the number exists in the combination
              but the position is not correct.
            </p>
            <p>
              <span>
                <FaRegCircle />
              </span>
              An empty circle means that number is not in the combination at
              all.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
