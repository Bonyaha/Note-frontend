import { useState } from 'react';
import Display from './Display';
import Button from './Button';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];
  const [selected, setSelected] = useState(0);
  const [numVotes, setNumvotes] = useState(Array(anecdotes.length).fill(0));
  let text = anecdotes[selected];

  function randomeJoke() {
    let randomNum = Math.floor(Math.random() * anecdotes.length);

    setSelected(randomNum);
  }

  function votePoints() {
    const copy = [...numVotes];

    if (copy[selected] >= 10) {
      return;
    } else {
      copy[selected] += 1;
    }
    console.log(copy);
    setNumvotes(copy);
  }
  let mostVotes = Math.max(...numVotes);

  let indexes = [];
  numVotes.filter((item, index) => {
    if (mostVotes == 0) return false;
    else if (item == mostVotes) {
      indexes.push(index);
    }
  });
  console.log(indexes);
  let allMostVoted = function () {
    return indexes.map((item, index) => {
      return <p>{anecdotes[item]}</p>;
    });
  };

  return (
    <div>
      {text}
      <br />
      <p>has {numVotes[selected]} votes</p>
      <button onClick={votePoints} style={{ marginRight: '15px' }}>
        vote
      </button>
      <button onClick={randomeJoke}>random anecdote</button>
      <h2>Anecdote with the most votes</h2>
      {allMostVoted()}
      <p>has {mostVotes} votes</p>
    </div>
  );
};

export default App;
