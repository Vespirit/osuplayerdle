import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

// components
import Table from "./gameboard/table";
import PlayerForm from "../../playerform/PlayerForm";

// tools
import { startOfToday } from "date-fns";
import { getRandomInt } from "../../../lib/random";
import { PlayerProps } from "../../../lib/types";
import hint from "./lib/hints";

function PlayerDataGame() {
    const [isLoading, setIsLoading] = useState<boolean>(true); // state for if api is being fetched

    const [solution, setSolution] = useState<string>("");
    const [solutionProps, setSolutionProps] = useState<PlayerProps>({
        id: 0,
        username: "",
        country: "",
        playcount: 0,
        rank: 0,
    });
    const [usernames, setUsernames] = useState<string[]>([]); // list of usernames

    const [guessList, setGuessList] = useState<string[]>([]);
    const [guessProps, setGuessProps] = useState<PlayerProps[]>([]);
    const [guessHints, setGuessHints] = useState<string[][]>([]); // emojis used for guess hints and "share results" button
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(1);
    const [msg, setMsg] = useState<string>("");
    const [shareConfirmation, setShareConfirmation] = useState<string>("");

    const fetchPlayer = async (username: string) => {
        const response: Response = await fetch(`/players/${username}`);
        const json = await response.json();

        if (!response.ok) {
            console.log(
                `${username} properties fetch failed.`,
                Promise.reject(response)
            );
            return;
        }

        return json[0];
    };

    useEffect(() => {
        // fetch player list from api
        const fetchPlayers = async () => {
            const response: Response = await fetch("/players");
            const json: string[] = await response.json();

            if (!response.ok) {
                console.log(
                    "Username list fetch failed.",
                    Promise.reject(response)
                );
                return;
            }

            const solIdx: number = getRandomInt(
                0,
                json.length,
                startOfToday().getTime()
            ); // index into the json array to determine the solution

            const json2 = await fetchPlayer(json[solIdx]); // fetch solution details

            setUsernames(json); // update states
            setSolution(json[solIdx]);
            setSolutionProps(json2);
        };
        fetchPlayers();
        setIsLoading(false);
    }, []);

    const handleInputSubmit = async (inputText: string) => {
        /* assumes inputText is valid in the username list
         */
        if (isGameOver) return; // guesses don't work after game ends

        const curGuess = inputText.trim();
        if (curGuess === "") return; // can't submit empty guesses
        if (guessList.includes(curGuess)) return; // can't submit duplicate guesses
        setGuessList([...guessList, curGuess]);

        const pp: PlayerProps = await fetchPlayer(curGuess);
        setGuessProps([...guessProps, pp]);

        setGuessHints([...guessHints, hint(pp, solutionProps)]);

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

    const copyResults = async () => {
        await window.navigator.clipboard
            .writeText(
                guessHints.reduce(
                    (acc, guessHint) => acc + guessHint.join("") + "\n",
                    "osu!playerdle results: \n"
                ) + "Play at <url>"
            )
            .then(() => {
                setShareConfirmation("Results copied to clipboard.");
            })
            .catch((err: any) => {
                setShareConfirmation("Unable to copy to clipboard " + err);
            });
    };

    return (
        <div className="PlayerDataGame">
            {guessList.length > 0 && ( // only show guess table when non-empty
                <Table
                    guesses={guessList}
                    guessProps={guessProps}
                    guessHints={guessHints}
                />
            )}
            {!isGameOver && !isLoading && (
                <PlayerForm
                    onSubmit={handleInputSubmit}
                    inputOptions={usernames}
                />
            )}
            {isGameOver && (
                <div className="Popup">
                    <p>{msg}</p>
                    <button id="shareButton" onClick={copyResults}>
                        Share
                    </button>
                    <p>{shareConfirmation}</p>
                </div>
            )}
        </div>
    );
}

export default PlayerDataGame;
