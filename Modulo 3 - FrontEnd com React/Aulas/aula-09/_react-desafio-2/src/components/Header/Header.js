import React from "react";
import { formatNumber } from "../../helpers/format-helpers";
import css from "./header.module.css";

export default function Header(props) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    props.onChangeFilter(newText);
  };

  const { filter, countryCount, totalPopulation } = props;

  return (
    <div className={css.flexRow}>
      <input
        placeholder="Filtro"
        type="text"
        valeu={filter}
        onChange={handleInputChange}
      />{" "}
      |
      <span className={css.countries}>
        Paises: <sstrong> {countryCount} </sstrong>
      </span>
      |
      <span className={css.population}>
        População: <strong> {formatNumber(totalPopulation)}</strong>
      </span>
    </div>
  );
}
