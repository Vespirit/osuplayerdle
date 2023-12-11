import React from "react";
// components
import Row from "./row";
//types
import { PlayerLookup, PlayerProps } from "../../../lib/types";

type Props = {
  lookup: PlayerLookup;
  guesses: string[];
  solution: string;
};

function Table({ lookup, guesses, solution }: Props) {
  return (
    <center>
      <table width="100%">
        {guesses.map((guess: string, i: number) => {
          const pp: PlayerProps | undefined = lookup.get(guess);
          const sp: PlayerProps | undefined = lookup.get(solution);
          const idLower: boolean = (pp?._id || 0) > (sp?._id || 0);
          const rankLower: boolean = (pp?.rank || 0) < (sp?.rank || 0);
          const playcountLower: boolean = 
            (pp?.playcount || 0) > (sp?.playcount || 0);
          const countryEqual: boolean = 
            (pp?.country || "") === (sp?.country || "");
          return <Row
            guessNum={i}
            id = {pp?._id}
            username={guess} 
            country={pp?.country}
            rank = {pp?.rank}
            playcount = {pp?.playcount}
            idLower = {idLower}
            rankLower = {rankLower}
            playcountLower = {playcountLower}
            countryEqual = {countryEqual}
          />
        })}
      </table>
    </center>
  );
}

export default Table;
