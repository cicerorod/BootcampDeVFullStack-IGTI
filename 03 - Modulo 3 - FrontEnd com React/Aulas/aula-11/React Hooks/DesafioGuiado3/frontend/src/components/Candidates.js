import React from "react";
import Card from "./Card";
import Candidate from "./Candidate";
import FlipMove from "react-flip-move";

export default function Candidates({ candidates, previousVotes }) {
  return (
    <FlipMove>
      {candidates.map((candidate, index) => {
        const { id } = candidate;

        const previousVotesObject = previousVotes.find(
          (item) => item.id === id
        );

        const previousVote = !!previousVotesObject
          ? previousVotesObject.previousVotes
          : 0;

        return (
          <div key={candidate.id}>
            <Card>
              <Candidate
                previousVote={previousVote}
                candidate={candidate}
                position={index + 1}
              />
            </Card>
          </div>
        );
      })}
    </FlipMove>
    // <FlipMove>
    //   <div>
    //     {candidates.map((candidate, index) => {

    //       return (
    //         <div key={candidate.id}>
    //           <Card>
    //             <Candidate candidate={candidate} position={index + 1} />
    //           </Card>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </FlipMove>
  );
}
