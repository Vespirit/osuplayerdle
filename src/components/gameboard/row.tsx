import React from "react";

type Props = {
  name: string;
};

function Row({ name }: Props) {
  return (
    <tr>
      {/*<td>Country</td>*/}
      <td>{name}</td>
      {/*<td>Rank</td>*/}
      {/*<td>Playcount</td>*/} // add these later
    </tr>
  );
}

export default Row;
