import React, {useState} from 'react';


const Statistic = ({text, rating}) => (
  <tr>
    <td>{text}</td>
    <td>{rating}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, average, positivity}) => {

  if((good + neutral + bad) === 0){
    return <div>No feedback given</div>
  } else {
    return (
      <div>
        <table>
          <tbody>
        <Statistic text = "good" rating = {good}/>
        <Statistic text = "neutral" rating = {neutral}/>
        <Statistic text = "bad" rating = {bad}/>
        <Statistic text = "average" rating = {average}/>
        <Statistic text = "positivity" rating = {positivity}/>
        </tbody>
        </table>
        </div>
    )

  }

} 

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let average
  let positivity
  if( good + bad + neutral === 0){
    average = 0
  } else{
    average = (good-bad)/(good+bad+neutral)
  }

  if( good + bad + neutral === 0){
    positivity = 0
  } else{
    positivity = good/(good+bad+neutral)
  }

  return (
    <div className="App">
      <h2>give feedback</h2>
      <Button handleClick = {() => setGood(good+1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad+1)} text = "bad"/>
      <h2>Statistics</h2>
      <Statistics good = {good} neutral = {neutral} bad = {bad} average = {average}  positivity = {positivity}/>      

    </div>
  );
}

export default App;
