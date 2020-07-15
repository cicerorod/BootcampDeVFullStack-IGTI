import React, { Component } from "react";

import css from "./country-item.module.css";

export default function CountryItem(props) {
  const { id, flag, name } = props.item;

  return (
    <div className={css.countryItemContainer} id={id}>
      <img className={css.flag} src={flag} alt={name} />
      {name}
    </div>
  );
}
