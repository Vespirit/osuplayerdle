import React, { useState } from "react";
import logo from "./logo.svg";
import Table from "./gameboard/table";

const CORRECT_PLAYER = 'Cookiezi';

function PlayerDataGame() {
  const [inputText, setInputText] = useState('');
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [attempts, setAttempts] = useState(1);
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
      setMsg('Well done! Got it in ' + attempts.toString() + ' attempt(s).');
    } else if (attempts >= 6) {
      setIsGameOver(true);
      setMsg('Game over. Correct answer: ' + CORRECT_PLAYER);
    } else {
      setInputText('');
      setAttempts(attempts+1);
    }
  }

  return (
    <>
      <input value={inputText} onChange={handleInputChange}/>
      <input type="submit" value="Guess!" onClick={handleInputSubmit} disabled={isGameOver} />
      <p>{msg}</p>
      <Table guesses={guessList} />
      {/*<p>{inputText},{attempts},{isGameOver.toString()},{guessList}</p> debug output*/}
    </>
  );
}

export default PlayerDataGame;
