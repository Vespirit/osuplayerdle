import React, { useState } from "react";
import logo from "./logo.svg";
import Table from "./gameboard/table";

function PlayerDataGame() {

  const CORRECT_PLAYER = 'Cookiezi';

  const [inputText, setInputText] = useState<string>('');
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(1);
  const [msg, setMsg] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleInputSubmit = () => {
    if (isGameOver) return; // guesses don't work after game ends

    const curGuess = inputText.trim();
    if (curGuess === '') return;
    if (guessList.includes(curGuess)) return;
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
