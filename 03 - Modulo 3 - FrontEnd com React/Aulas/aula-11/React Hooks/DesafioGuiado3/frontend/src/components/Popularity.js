import React from "react";

const Stars = {
  full: "★",
  empty: "☆",
};

const Max_stars = 10;

export default function Popularity({ value }) {
  const fullStars = Stars.full.repeat(value);
  const emptyStars = Stars.empty.repeat(Max_stars - value);

  return (
    <div style={{ fontSize: "1,5rem", color: "#f39c12" }}>
      {fullStars}
      {emptyStars}
    </div>
  );
}
