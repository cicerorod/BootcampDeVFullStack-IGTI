import React from "react";
import Position from "./Position";
import Picture from "./Picture";
import Info from "./Info";
import Name from "./Name";
import Votes from "./Votes";
import Percentage from "./Percentage";
import Popularity from "./Popularity";
import css from "./Candidate.module.css";
import { formatNumber, formatPercentage } from "../helpers/format";

export default function Candidate({ candidate, position, previousVote }) {
  const { id, name, votes, percentage, popularity } = candidate;
  const imageSourge = `${id}.jpg`;

  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture title={name} imageSource={imageSourge} alt={name}></Picture>
      <Info>
        <Name>{name}</Name>
        <Votes> {formatNumber(votes)} </Votes>
        <Percentage>{formatPercentage(percentage)} </Percentage>
        <Popularity value={popularity} />
      </Info>
    </div>
  );
}
