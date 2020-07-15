import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Candidates from "./components/Candidates";

export default function App() {
  const [candidates, setcandidates] = useState([]);
  const [previousVotes, setpreviousVotes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/votes")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localpreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          setcandidates(json.candidates);
          setpreviousVotes(localpreviousVotes);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [candidates, previousVotes]);

  if (candidates.length === 0) {
    return <Spinner description="Carregando ..."></Spinner>;
  }

  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates candidates={candidates} previousVotes={previousVotes} />
    </div>
  );
}
