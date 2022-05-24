import React from "react";
import { useState } from "react";
import "../index.css";

let randomNubmer = Math.floor(Math.random() * 100) + 1;

function NumberGuess() {
  const [userGuess, setUserGuess] = useState("");
  const [count, setCount] = useState(10);
  const [guesses, setGuesses] = useState([]);
  const [number, setNumber] = useState(randomNubmer);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [alreadyChosenMsg, setAlreadyChosenMsg] = useState("");

  const handlerValueChange = e => {
    setUserGuess(e.target.value);
  };

  const submitHandler = () => {
    if (+number === +userGuess) {
      setMessageSuccess("Congratulations! You got it right!");
      setDisabled(true);
      setLow("");
      setHigh("");
    } else if (count === 1) {
      setGameOverMessage("GAME OVER!!!");
      setDisabled(true);
      setLow("");
      setHigh("");
    }

    if (number < userGuess) {
      setHigh("UPS! Last guess was too high!");
    } else if (number > userGuess) {
      setLow("UPS! Last guess was to low!");
    }
    const res = guesses.includes(userGuess);

    if (res) {
      setAlreadyChosenMsg("You have already entered this number! Try again!");
    } else {
      setGuesses([...guesses, userGuess]);
    }
    setCount(count - 1);
  };

  const startAgain = () => {
    setDisabled(false);
    setMessageSuccess("");
    setGuesses([]);
    setCount(10);
    setNumber(randomNubmer);
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
    setNumber(randomNubmer);
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
  }, 6000);

  return (
    <div className="box">
      <h1>Number Guessing Game</h1>
      <div className="container">
        <div className="bottomLine">
          <div>
            <p className="inputTitle">Enter number:</p>
            <input
              className="guessInput"
              type="number"
              value={userGuess}
              onChange={handlerValueChange}
              disabled={disabled}
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
          {userGuess && (
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
