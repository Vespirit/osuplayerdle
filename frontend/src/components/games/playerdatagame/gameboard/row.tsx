import React from "react";

type Props = {
    guessNum: number;
    id: number | undefined;
    username: string;
    country: string | undefined;
    rank: number | undefined;
    playcount: number | undefined;
    idLower: boolean;
    rankLower: boolean;
    playcountLower: boolean;
    countryEqual: boolean;
};

function Row({
    guessNum,
    id,
    username,
    country,
    rank,
    playcount,
    idLower,
    rankLower,
    playcountLower,
    countryEqual,
}: Props) {
    let idArrow = "⬆️";
    let rankArrow = "⬆️";
    let playcountArrow = "⬆️";
    let countryArrow = "❌";
    if (idLower) idArrow = "⬇️";
    if (rankLower) rankArrow = "⬇️";
    if (playcountLower) playcountArrow = "⬇️";
    if (countryEqual) countryArrow = "✅";
    return (
        <tr>
            <td>{guessNum + 1}</td>
            <td>{username}</td>
            <td>{rank + " " + rankArrow}</td>
            <td>{country + " " + countryArrow}</td>
            <td>{playcount + " " + playcountArrow}</td>
            <td>{id + " " + idArrow}</td>
        </tr>
    );
}

export default Row;
