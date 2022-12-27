import { useState } from 'react'
import MyChartComponent from './MyChartComponent';
import './App.css'

function App() {

  const [date, setDate] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [weightsArray, pushWeightToState] = useState([]);

  const onButtonClick = () => {
    if (date === '' || weightValue === 0) {
      alert("Date or weight is empty");
      return;
    }
    pushWeightToState([...weightsArray, { date, weight: weightValue }]);
  }

  return (

    <div>
      <h1>Weight Tracker</h1>
      <MyChartComponent data={weightsArray} />

      <p>date</p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
      <p>weight</p>
      <input type="number" value={weightValue} onChange={e => setWeightValue(e.target.value)} />
      <button onClick={onButtonClick}>add</button>
      <ul>
          {weightsArray.map((weightItem, index) => (
              <li key={index}>{weightItem.date} - {weightItem.weight}</li>
          ))}
      </ul>
    </div>
  )
}

export default App
