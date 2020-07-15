import React, { Component, Fragment, useState } from "react";
import Counter from "./components/Counter/Counter";
import Counter2 from "./components/Counter/Counter2";
import Band from "./components/Band";

export default function App() {
  const [currentCounter, setcurrentCounter] = useState(3);
  const [steps, setsteps] = useState(0);

  const handleCount = (clickType) => {
    setcurrentCounter(
      clickType === "+" ? currentCounter + 1 : currentCounter - 1
    );
    setsteps(steps + 1);
  };

  return (
    <Fragment>
      <h3>Band</h3>
      <Band />

      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />

      <h3>Counter 2</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
    </Fragment>
  );
}
