import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ stats }) => {
  if (stats.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        {Object.entries(stats).map(([key, value], index) => {
          return <StatisticLine text={key} value={value} key={index} />;
        })}
      </tbody>
    </table>
  );
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (text) => {
    if (text === "good") {
      setGood(good + 1);
    } else if (text === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  const stats = {
    good,
    neutral,
    bad,
    all: good + bad + neutral,
    average: (good - bad) / (good + bad + neutral),
    positive: (good / (good + bad + neutral)) * 100 + "%",
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick("good")} text='good' />
      <Button handleClick={() => handleClick("neutral")} text='neutral' />
      <Button handleClick={() => handleClick("bad")} text='bad' />
      <h1>Statistics</h1>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
