import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

// components
import Table from "./gameboard/table";

// tools
import { startOfToday } from "date-fns";
import { getRandomInt } from "../../lib/random";
import { PlayerLookup } from "../../lib/types";

function PlayerDataGame() {

  const [playerLookup, setPlayerLookup] = useState<PlayerLookup>(new Map());
  const [solution, setSolution] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(1);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => { // fetch player list from api
    const fetchPlayers = async () => {
      const response: Response = await fetch('/api/players');
      const json = await response.json();

      if (response.ok) {
        for (const player of json) {
          setPlayerLookup(new Map(playerLookup.set(player.username, player)));
        }
        setSolution(json[
          getRandomInt(0, json.length, startOfToday().getTime())
        ].username);
      }
      else {
        setMsg("error response not ok");
      }
    }
    fetchPlayers();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputSubmit = () => {
    if (isGameOver) return; // guesses don't work after game ends

    const curGuess = inputText.trim();
    if (curGuess === "") return;
    if (guessList.includes(curGuess)) return;
    setGuessList([...guessList, curGuess]);

    if (curGuess === solution) {
      setIsGameOver(true);
      setMsg("Well done! Got it in " + attempts.toString() + " attempt(s).");
    }
    else if (attempts >= 6) {
      setIsGameOver(true);
      setMsg("Game over. Correct answer: " + solution);
    }
    else {
      setInputText("");
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="PlayerDataGame">
      <div className="InputFields">
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
      </div>
      <Table lookup={playerLookup} guesses={guessList} />
      <p>{msg}</p>
    </div>
  );
}

export default PlayerDataGame;
