import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Table from "./components/gameboard/table";

const CORRECT_PLAYER = 'Cookiezi';
let attempts = 0;

function App() {
  const [inputText, setInputText] = useState('');
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [msg, setMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleInputSubmit = () => {
    attempts += 1;
    if (isGameOver) return; // guesses don't work after game ends

    const curGuess = inputText.trim();
    setGuessList([...guessList, curGuess]);

    if (curGuess == '') return;

    if (curGuess === CORRECT_PLAYER) {
      setIsGameOver(true);
      setMsg('Well done! Got it in ' + attempts + ' attempt(s).');
    } else if (attempts >= 6) {
      setIsGameOver(true);
      setMsg('Game over. Correct answer: ' + CORRECT_PLAYER);
    } else {
      setInputText('');
    }
  }

  return (
    <center>
      <Navbar />
      <input value={inputText} onChange={handleInputChange}/>
      <input type="submit" value="Guess!" onClick={handleInputSubmit} disabled={isGameOver} />
      <p>{msg}</p>
      <Table guesses={guessList} />
      <p>{attempts},{isGameOver.toString()},{guessList}</p>
    </center>
  );
}

export default App;
