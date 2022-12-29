import { useState } from 'react'
import MyChartComponent from './MyChartComponent';
import './App.css'

function App() {

  const [date, setDate] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [weightsArray, pushWeightToState] = useState([]);

  const handleAdd = () => {
    if (date === '' || weightValue === 0) {
      alert("Date or weight is empty");
      return;
    }
    const foundIndex = weightsArray.findIndex((item) => item.date === date);
    if (foundIndex !== -1) {
      alert("Overwriting existing weight");
      const newWeightsArray = [...weightsArray];
      newWeightsArray[foundIndex] = {date, weight: weightValue};
      pushWeightToState(newWeightsArray);
    }
    else {
      pushWeightToState([...weightsArray, {date, weight: weightValue}]
        .sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
  }

  const handleDelete = (index) => {
    const newArray = weightsArray.filter((item, i) => i !== index);
    pushWeightToState(newArray);
  }

  return (

    <div>
      <h1>Weight Tracker</h1>
      <MyChartComponent data={weightsArray} />

      <p>date</p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
      <p>weight</p>
      <input type="number" value={weightValue} onChange={e => setWeightValue(e.target.value)} />
      <button onClick={handleAdd}>add</button>
      <ul>
          {weightsArray.map((weightItem, index) => (
            <div key={index} className='weightInfo'>
              <li >date: {weightItem.date} - {weightItem.weight} kg
                <button onClick={() => handleDelete(index)} className='deleteButton' style={{
                  backgroundColor: '#f1356d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5em',
                  padding: '0.5em 1em',
                  marginLeft: '1em',
                  fontSize: '0.8em',
                }}>delete</button>
              </li>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default App
