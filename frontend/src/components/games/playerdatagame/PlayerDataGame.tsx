import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

// components
import Table from "./gameboard/table";
import PlayerForm from "../../playerform/PlayerForm";

// tools
import { startOfToday } from "date-fns";
import { getRandomInt } from "../../../lib/random";
import { PlayerLookup, PlayerProps } from "../../../lib/types";

function PlayerDataGame() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [playerLookup, setPlayerLookup] = useState<PlayerLookup>(new Map()); // maps usernames to player info
    const [solution, setSolution] = useState<string>("");
    const [inputOptions, setInputOptions] = useState<string[]>([]); // list of usernames

    const [guessList, setGuessList] = useState<string[]>([]);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(1);
    const [msg, setMsg] = useState<string>("");

    useEffect(() => {
        // fetch player list from api
        const fetchPlayers = async () => {
            const response: Response = await fetch("/api/players");
            const json = await response.json();

            if (response.ok) {
                for (const player of json) {
                    setPlayerLookup(
                        new Map(playerLookup.set(player.username, player))
                    );
                }
                setInputOptions(
                    json.map((player: PlayerProps) => player.username)
                );
                setSolution(
                    json[getRandomInt(0, json.length, startOfToday().getTime())]
                        .username
                );
            } else {
                console.error("Error fetching users");
            }
            setIsLoading(false);
        };
        fetchPlayers();
    }, []);

    const handleInputSubmit = (inputText: string) => {
        /* assumes inputText is valid in the player list
         */
        if (isGameOver) return; // guesses don't work after game ends

        const curGuess = inputText.trim();
        if (curGuess === "") return;
        if (guessList.includes(curGuess)) return;
        setGuessList([...guessList, curGuess]);

        if (curGuess === solution) {
            setIsGameOver(true);
            setMsg(
                "Well done! Got it in " + attempts.toString() + " attempt(s)."
            );
        } else if (attempts >= 6) {
            setIsGameOver(true);
            setMsg("Game over! Correct answer: " + solution);
        } else {
            setAttempts(attempts + 1);
        }
    };

    return (
        <div className="PlayerDataGame">
            {guessList.length > 0 && (
                <Table
                    lookup={playerLookup}
                    guesses={guessList}
                    solution={solution}
                />
            )}
            {!isGameOver && !isLoading && (
                <PlayerForm
                    onSubmit={handleInputSubmit}
                    inputOptions={inputOptions}
                />
            )}
            {isGameOver && (
                <div className="Popup">
                    <p>{msg}</p>
                    <button>Share</button>
                </div>
            )}
        </div>
    );
}

export default PlayerDataGame;
