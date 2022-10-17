/* const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  const parts = props.course.parts;
  return (
    <div>
      {parts.map((item) => {
        return (
          <Part name={item.name} key={item.id} exercises={item.exercises} />
        );
      })}
    </div>
  );
};

const Total = (props) => {
  const parts = props.course.parts;
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((item, currentItem) => item + currentItem.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { id: 1, name: 'Fundamentals of React', exercises: 10 },
      { id: 2, name: 'Using props to pass data', exercises: 7 },
      { id: 3, name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}; */
import { useState } from 'react';
import Display from './Display';
import Button from './Button';

const App = () => {
  /*const [value, setValue] = useState(10);

   const hello = (who) => () => console.log('Hello', who);
  return (
    <div>
      {value}
      <button onClick={hello('sweet pussy')}>button</button>
      <button onClick={hello('vagina')}>button2</button>
    </div>
  ); */

  /* const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={() => setToValue(234)}>button</button>
      <button onClick={() => setToValue(333)}>button2</button>
    </div>
  );
}; */

  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveFeedback = () => setGood(good + 1);
  const giveNeutralFeedback = () => setNeutral(neutral + 1);
  const giveBadFeedback = () => setBad(bad + 1);
  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => giveFeedback()}>good</button>
      <button onClick={() => giveNeutralFeedback()}>neutral</button>

      <button onClick={() => giveBadFeedback()}>bad</button>
      <h2>Statistcs</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};
export default App;
