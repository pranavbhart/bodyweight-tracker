import { useState } from 'react'
import MyChartComponent from './MyChartComponent';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [date, setDate] = useState('');
  const [weight, setWeight] = useState(0);
  const [weights, pushWeightToState] = useState([]);

  const onButtonClick = () => {
    if (date == '' || weight == 0) {
      console.log("Date or weight is empty");
      return;
    }
    pushWeightToState([...weights, { date, weight }]);
  }

  return (

    <div>
      <h1>Weight Tracker</h1>
      <MyChartComponent data={weights} />

      <p>date</p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
      <p>weight</p>
      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={onButtonClick}>add</button>
      <ul>
          {weights.map((weightItem, index) => (
              <li key={index}>{weightItem.date} - {weightItem.weight}</li>
          ))}
      </ul>
    </div>
  )
}

export default App
