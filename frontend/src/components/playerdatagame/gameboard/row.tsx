import React from "react";

type Props = {
  guessNum: number;
  id: number | undefined;
  username: string;
  country: string | undefined;
  rank: number | undefined;
  playcount: number | undefined;
};

function Row({ guessNum, id, username, country, rank, playcount}: Props) {
  return (
    <tr>
      <td><center>{guessNum+1}</center></td>
      <td>{id}</td>
      <td>{country}</td>
      <td>{username}</td>
      <td>{rank}</td>
      <td>{playcount}</td>
    </tr>
  );
}

export default Row;
