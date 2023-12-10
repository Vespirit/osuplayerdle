import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Table from "./gameboard/table";
import { SOLUTIONS } from "../solutions";
import { startOfToday } from "date-fns";
import { getRandomInt } from "../../tools/random";

function PlayerDataGame() {

  const [players, setPlayers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(1);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch('/api/players');
      const json = await response.json();

      if (response.ok) {
        setPlayers(json);
      }
      else {
        setMsg("error response not ok")
      }
    }

    fetchPlayers()
  }, [])

  const SOLUTION: string = SOLUTIONS[
    getRandomInt(0, SOLUTIONS.length, startOfToday().getTime())
  ].toString();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputSubmit = () => {
    if (isGameOver) return; // guesses don't work after game ends

    const curGuess = inputText.trim();
    if (curGuess === "") return;
    if (guessList.includes(curGuess)) return;
    setGuessList([...guessList, curGuess]);

    if (curGuess === SOLUTION) {
      setIsGameOver(true);
      setMsg("Well done! Got it in " + attempts.toString() + " attempt(s).");
    } else if (attempts >= 6) {
      setIsGameOver(true);
      setMsg("Game over. Correct answer: " + SOLUTION);
    } else {
      setInputText("");
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="PlayerDataGame">
      <input
        type="text"
        placeholder="Guess a player..."
        value={inputText}
        onChange={handleInputChange}
      />
      <input
        type="submit"
        value="Guess!"
        onClick={handleInputSubmit}
        disabled={isGameOver}
      />
      <p>{msg}</p>
      <Table guesses={guessList} />
      {/*<p>{inputText},{attempts},{isGameOver.toString()},{guessList}</p> debug output*/}
      <div className="Players">
        {players && players.map((player) => (
          <p key={player._id}>{player.username}</p>
        ))}
      </div>
    </div>
  );
}

export default PlayerDataGame;
