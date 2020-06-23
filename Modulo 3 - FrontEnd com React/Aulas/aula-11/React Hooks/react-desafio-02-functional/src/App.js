import React, { useState, useEffect } from "react";
import Countries from "./components/countries/Countries";
import Header from "./components/header/Header";

export default function App() {
  const [allCountries, setallCountries] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [filteredPopulation, setfilteredPopulation] = useState([]);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch("https://restcountries.eu/rest/v2/all");
      let allCountries = await res.json();
      allCountries = allCountries.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );

      setallCountries(allCountries);
      setfilteredCountries(Object.assign([], allCountries));
    };

    getCountries();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setfilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);

    setfilteredCountries(filteredCountries);
    setfilteredPopulation(filteredPopulation);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>

      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />

      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: "center",
  },
};
