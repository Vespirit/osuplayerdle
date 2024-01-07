import React from "react";
// components
import Row from "./row";
//types
import { PlayerProps } from "../../../../lib/types";

type Props = {
    guesses: string[];
    guessProps: PlayerProps[];
    guessHints: string[][];
};

function Table({ guesses, guessProps, guessHints }: Props) {
    return (
        <center>
            <table width="100%">
                <tr>
                    <td>Guess</td>
                    <td>Username</td>
                    <td>Rank</td>
                    <td>Country</td>
                    <td>Playcount</td>
                    <td>ID</td>
                </tr>
                {guessProps.map((guessProps: PlayerProps, i: number) => {
                    return (
                        <Row
                            guessNum={(i + 1).toString()}
                            id={guessProps.id + " " + guessHints[i][3]}
                            username={guessProps.username}
                            country={
                                guessProps.country + " " + guessHints[i][1]
                            }
                            rank={guessProps.rank + " " + guessHints[i][0]}
                            playcount={
                                guessProps.playcount + " " + guessHints[i][2]
                            }
                        />
                    );
                })}
            </table>
        </center>
    );
}

export default Table;
