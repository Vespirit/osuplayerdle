import React, { useState } from "react";
import logo from "./logo.svg";
import Table from "./gameboard/table";
import { SOLUTIONS } from "../solutions"
import { startOfToday } from 'date-fns'

function PlayerDataGame() {

  const getRandomInt = (min: number, max: number, seed: number) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    let rfl = Math.sin(seed) * 10000;
    rfl = rfl - Math.floor(rfl);
    return Math.floor(rfl * (max - min) + min);
  }

  const getSolution = () => {
    return SOLUTIONS[getRandomInt(0, SOLUTIONS.length, startOfToday().getTime()) % SOLUTIONS.length];
  }

  const SOLUTION: string = getSolution().toString();

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

    if (curGuess === SOLUTION) {
      setIsGameOver(true);
      setMsg('Well done! Got it in ' + attempts.toString() + ' attempt(s).');
    }
    else if (attempts >= 6) {
      setIsGameOver(true);
      setMsg('Game over. Correct answer: ' + SOLUTION);
    }
    else {
      setInputText('');
      setAttempts(attempts+1);
    }
  }

  return (
    <>
      <input type="text" placeholder="Guess a player..." value={inputText} onChange={handleInputChange} />
      <input type="submit" value="Guess!" onClick={handleInputSubmit} disabled={isGameOver} />
      <p>{msg}</p>
      <Table guesses={guessList} />
      {/*<p>{inputText},{attempts},{isGameOver.toString()},{guessList}</p> debug output*/}
    </>
  );
}

export default PlayerDataGame;
