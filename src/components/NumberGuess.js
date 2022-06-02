import React from "react";
import { useState } from "react";
import "../index.css";

function NumberGuess() {
  const [userGuess, setUserGuess] = useState("");
  const [count, setCount] = useState(10);
  const [guesses, setGuesses] = useState([]);
  const [number, setNumber] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [alreadyChosenMsg, setAlreadyChosenMsg] = useState("");
  const [emptyInputMsg, setEmptyInputMsg] = useState("");
  const [validNumber, setValidNumber] = useState("");

  const handlerValueChange = e => {
    setUserGuess(e.target.value.replace(/[^\d]/, ""));
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const submitHandler = () => {
    if (+number === +userGuess) {
      setMessageSuccess("Congratulations! You got it right!");
      setDisabled(true);
      setLow("");
      setHigh("");
      setUserGuess("");
      setCount(count - 1);
    } else if (count === 1) {
      setGameOverMessage("GAME OVER!!!");
      setDisabled(true);
      setLow("");
      setHigh("");
      setCount(count - 1);
    }

    if (number < userGuess) {
      setHigh("UPS! Last guess was too high!");
      setCount(count - 1);
    } else if (number > userGuess) {
      setLow("UPS! Last guess was to low!");
      setCount(count - 1);
    }

    const res = guesses.includes(userGuess);

    if (res) {
      setAlreadyChosenMsg("You have already entered this number! Try again!");
      setHigh("");
      setLow("");
      setCount(count);
    } else {
      setGuesses([...guesses, userGuess]);
    }

    if (userGuess === "") {
      setCount(count);
      setGuesses(guesses);
      setLow("");
      setEmptyInputMsg("You did not enter anything");
      return;
    }

    if (userGuess < 1 || userGuess > 100) {
      setUserGuess("");
      setHigh("");
      setLow("");
      setCount(count);
      setGuesses(guesses);
      setValidNumber("Please enter a valid number");
      return;
    }
    setUserGuess("");
  };

  const startAgain = () => {
    setDisabled(false);
    setMessageSuccess("");
    setGuesses([]);
    setCount(10);
    setNumber(randomNumber(1, 100));
    setUserGuess("");
    setHigh("");
    setLow("");
    setGameOverMessage("");
    setAlreadyChosenMsg("");
  };

  const clearHandler = () => {
    setUserGuess("");
  };

  const resetHandler = () => {
    setDisabled(false);
    setMessageSuccess("");
    setGuesses([]);
    setCount(10);
    setNumber(randomNumber(1, 100));
    setUserGuess("");
    setHigh("");
    setLow("");
    setGameOverMessage("");
    setAlreadyChosenMsg("");
  };

  setTimeout(() => {
    setGameOverMessage(false);
    setHigh(false);
    setLow(false);
    setMessageSuccess(false);
    setAlreadyChosenMsg(false);
    setEmptyInputMsg(false);
    setValidNumber(false);
  }, 6000);

  return (
    <div className="box">
      <h1>Number Guessing Game</h1>
      <div className="container">
        <h3>Guess a number in 1-100 range</h3>
        <div className="bottomLine">
          <div>
            <p className="inputTitle">Enter number:</p>
            <input
              className="guessInput"
              type="number"
              value={userGuess}
              onChange={handlerValueChange}
              disabled={disabled}
              min="1"
              max="100"
            />
          </div>
          <div className="buttons">
            <button
              className="submitButton"
              type="submit"
              onClick={submitHandler}
              disabled={disabled}
            >
              Submit number
            </button>

            <button
              disabled={disabled}
              onClick={clearHandler}
              className="clearButton"
            >
              Clear
            </button>
            <button
              disabled={disabled}
              onClick={resetHandler}
              className="resetButton"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="attempts">
          <p>Remaining attempts: {count}</p>
        </div>

        <div className="previousGuesses">
          {guesses && (
            <p>
              Previous guesses:{" "}
              {guesses?.map((item, index) => {
                return <span key={index}> {item}, </span>;
              })}
            </p>
          )}
        </div>
        {disabled && (
          <button onClick={startAgain} className="newGameButton">
            Start new game
          </button>
        )}
        {messageSuccess && <p className="bg-success">{messageSuccess}</p>}
        {gameOverMessage && <p className="bg-warning">{gameOverMessage}</p>}
        {alreadyChosenMsg && <p className="bg-warning">{alreadyChosenMsg}</p>}
        {emptyInputMsg && <p className="bg-warning">{emptyInputMsg}</p>}
        {validNumber && <p className="bg-info">{validNumber}</p>}
        {high && (
          <div className="bg-danger">
            <p>{high}</p>
          </div>
        )}
        {low && (
          <div className="bg-info">
            <p>{low}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberGuess;
