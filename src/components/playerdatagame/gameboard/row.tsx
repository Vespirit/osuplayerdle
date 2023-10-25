import React from "react";

type Props = {
  guessNum: number;
  name: string;
};

function Row({ guessNum, name }: Props) {
  return (
    <tr>
      <td><center>{guessNum+1}</center></td>
      {/*<td>Country</td>*/}
      <td><center>{name}</center></td>
      {/*<td>Rank</td>*/}
      {/*<td>Playcount</td> // add these later*/} 
    </tr>
  );
}

export default Row;
