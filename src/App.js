import React from "react";
import { BrowserRouter } from "react-router-dom";
import NumberGuess from "./components/NumberGuess";

function App() {
  return (
    <BrowserRouter>
      <NumberGuess />
    </BrowserRouter>
  );
}

export default App;
