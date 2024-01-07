import React from "react";
// components
import Row from "./row";
//types
import { PlayerProps } from "../../../../lib/types";
import * as hints from "../../../../lib/hints";

type Props = {
    guesses: string[];
    guessProps: PlayerProps[];
    guessHints: string[];
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
                            guessNum={i.toString()}
                            id={guessProps.id + ""}
                            username={guessProps.username}
                            country={guessProps.country}
                            rank={guessProps.rank + ""}
                            playcount={guessProps.playcount + ""}
                        />
                    );
                })}
            </table>
        </center>
    );
}

export default Table;
