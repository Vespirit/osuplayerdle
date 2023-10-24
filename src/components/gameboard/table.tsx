import React from "react";
import Row from "./row";

type Props = {
  guesses: string[];
};

function Table({ guesses }: Props) {
  return (
    <table width={600}>
      {guesses.map((guess: string) => (
        <Row name={guess} />
      ))}
    </table>
  );
}

export default Table;
