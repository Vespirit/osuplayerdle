import React from "react";
// components
import Row from "./row";
//types
import { PlayerLookup, PlayerProps } from "../../../../lib/types";
import * as hints from "../../../../lib/hints";

type Props = {
    lookup: PlayerLookup;
    guesses: string[];
    solution: string;
};

function Table({ lookup, guesses, solution }: Props) {
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
                {guesses.map((guess: string, i: number) => {
                    const pp: PlayerProps | undefined = lookup.get(guess);
                    const sp: PlayerProps | undefined = lookup.get(solution);
                    return (
                        <Row
                            guessNum={i.toString()}
                            id={pp?._id + hints.numberHint(sp?._id, pp?._id)}
                            username={guess}
                            country={
                                pp?.country +
                                hints.countryHint(sp?.country, pp?.country)
                            }
                            rank={pp?.rank + hints.rankHint(sp?.rank, pp?.rank)}
                            playcount={
                                pp?.playcount +
                                hints.numberHint(sp?.playcount, pp?.playcount)
                            }
                        />
                    );
                })}
            </table>
        </center>
    );
}

export default Table;
