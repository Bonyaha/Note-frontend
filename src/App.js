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

const StatisticsLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
};
const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral;
  const text = () => {
    return all == 0 ? (
      'No feedback yet'
    ) : (
      <>
        <table>
          <tbody>
            <tr>
              <StatisticsLine text="good" value={props.good} />
            </tr>
            <tr>
              <StatisticsLine text="neutral" value={props.neutral} />
            </tr>
            <tr>
              <StatisticsLine text="bad" value={props.bad} />
            </tr>
            <tr>
              <StatisticsLine text="all" value={all} />
            </tr>
            <tr>
              <StatisticsLine text="average" value={all / 3} />
            </tr>
            <tr>
              <StatisticsLine
                text="positive"
                value={`${Math.round((props.good * 100) / all)} %`}
              />
            </tr>
          </tbody>
        </table>
      </>
    );
  };
  return <>{text()}</>;
};
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
      <Button onClick={giveFeedback} text="good" />
      <Button onClick={giveNeutralFeedback} text="neutral" />
      <Button onClick={giveBadFeedback} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
