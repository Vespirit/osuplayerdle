import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Table from "./components/gameboard/table";

const CORRECT_PLAYER = 'Cookiezi';

function App() {
  const [inputText, setInputText] = useState('');
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [msg, setMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleInputSubmit = () => {
    if (isGameOver) return; // guesses don't work after game ends

    const curGuess = inputText.trim();
    if (curGuess == '') return;
    setGuessList([...guessList, curGuess]);

    if (curGuess === CORRECT_PLAYER) {
      setIsGameOver(true);
      setMsg('Well done! Got it in ' + (attempts+1) + ' attempt(s).');
    } else if (attempts >= 5) {
      setIsGameOver(true);
      setMsg('Game over. Correct answer: ' + CORRECT_PLAYER);
    } else {
      setInputText('');
      setAttempts(attempts+1);
    }
  }

  return (
    <center>
      <Navbar />
      <input value={inputText} onChange={handleInputChange}/>
      <input type="submit" value="Guess!" onClick={handleInputSubmit} disabled={isGameOver} />
      <p>{msg}</p>
      <Table guesses={guessList} />
      <p>{inputText},{attempts},{isGameOver.toString()},{guessList}</p>
    </center>
  );
}

export default App;
