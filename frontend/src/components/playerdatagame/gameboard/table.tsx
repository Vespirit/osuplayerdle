import React from "react";
import Row from "./row";
import { PlayerLookup, PlayerProps } from "../PlayerDataGame";

type Props = {
  lookup: PlayerLookup;
  guesses: string[];
};

function Table({ lookup, guesses }: Props) {
  return (
    <center>
      <table width={600}>
        {guesses.map((guess: string, i: number) => {
          const pp: PlayerProps | undefined = lookup.get(guess);
          return <Row
            guessNum={i}
            id = {pp?._id}
            username={guess} 
            country={pp?.country}
            rank = {pp?.rank}
            playcount = {pp?.playcount}
          />
        })}
      </table>
    </center>
  );
}

export default Table;
