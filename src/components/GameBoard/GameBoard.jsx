import { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";
import Modal from "../Modal/Modal";
import "./GameBoard.css";

function GameBoard() {
  const attempts = 8;
  const inputsPerRow = 4;

  const [answer, setAnswer] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [feedback, setFeedback] = useState(
    Array.from({ length: attempts }, () => Array(inputsPerRow).fill(0))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const inputRefs = useRef(Array.from({ length: attempts }, () => []));

  const generateRandomNumber = () => {
    let res = "";
    for (let i = 0; i < 4; i++) {
      const digit = Math.floor(Math.random() * 10);
      res += digit.toString();
    }
    return res;
  };

  useEffect(() => {
    const res = generateRandomNumber();
    setAnswer(res);
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
      if (digit === answerDigits[i]) {
        guessFeedback[i] = 2;
        answerSet.delete(digit);
      }
    });

    guessDigits.forEach((digit, i) => {
      if (answerSet.has(digit)) {
        guessFeedback[i] = 1;
        answerSet.delete(digit);
      }
    });

    setFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[activeRow] = guessFeedback;
      return newFeedback;
    });

    if (guessDigits.join("") === answer) {
      setModalMessage("Congratulations! You guessed correctly.");
      setIsModalOpen(true);
    } else {
      if (activeRow < attempts - 1) {
        setActiveRow(activeRow + 1);
      } else {
        setModalMessage(`Game over, the answer is ${answer}...`);
        setIsModalOpen(true);
      }
    }
  };

  const resetGame = () => {
    setAnswer(generateRandomNumber());
    setActiveRow(0);
    setFeedback(
      Array.from({ length: attempts }, () => Array(inputsPerRow).fill(0))
    );
    inputRefs.current.forEach((row) => {
      row.forEach((input) => {
        if (input) {
          input.value = "";
        }
      });
    });
    setIsModalOpen(false);
  };

  const feedbackColors = {
    2: "green_circle",
    1: "orange_circle",
    0: "grey_circle",
  };

  return (
    <div>
      <div className="game_board">
        {/* <div>The Answer is: {answer}</div> */}
        <div className="refresh">
          <IoRefresh onClick={resetGame} />
        </div>

        <div>
          {Array.from({ length: attempts }).map((_, rowIndex) => (
            <div key={rowIndex} className="game_row">
              {Array.from({ length: inputsPerRow }).map((_, inputIndex) => (
                <input
                  key={`row-${rowIndex}-input-${inputIndex}`}
                  type="text"
                  maxLength="1"
                  ref={(el) => {
                    inputRefs.current[rowIndex][inputIndex] = el;
                  }}
                  onChange={(e) => handleInput(rowIndex, inputIndex, e)}
                  disabled={rowIndex !== activeRow}
                ></input>
              ))}

              <div className="feedback">
                {feedback[rowIndex].map((value, i) => (
                  <FaCircle key={i} className={feedbackColors[value]} />
                ))}
              </div>

              {rowIndex === activeRow ? (
                <button onClick={checkAnswer}>Check</button>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          onPlay={resetGame}
        />
      )}
    </div>
  );
}

export default GameBoard;
