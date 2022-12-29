import { useState, useEffect } from 'react'
import MyChartComponent from './MyChartComponent';
import './App.css'

function App() {
  const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  const [date, setDate] = useState(today);
  const [weightsArray, setWeights] = useState(localStorage.getItem('weightsArray') ? JSON.parse(localStorage.getItem('weightsArray')) : []);
  const [weightValue, setWeightValue] = useState(weightsArray[weightsArray.length - 1] ? weightsArray[weightsArray.length - 1].weight : 0);

  useEffect(() => {
    localStorage.setItem('weightsArray', JSON.stringify(weightsArray))
  }, [weightsArray]);

  const handleAdd = () => {
    if (weightValue === 0) {
      alert("Weight is empty");
      return;
    }
    const foundIndex = weightsArray.findIndex((item) => item.date === date);
    if (foundIndex !== -1) {
      alert("Overwriting existing weight");
      const newWeightsArray = [...weightsArray];
      newWeightsArray[foundIndex] = {date, weight: weightValue};
      setWeights(newWeightsArray);
    }
    else {
      setWeights([...weightsArray, {date, weight: weightValue}]
        .sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
  }

  const handleDelete = (index) => {
    const newArray = weightsArray.filter((item, i) => i !== index);
    setWeights(newArray);
  }

  const handleFileUpload = (event) => {
    if (confirm("Are you sure you want to overwrite your current weights?")) {
      const file = document.getElementById('file-selector').files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newWeightsArray = JSON.parse(event.target.result);
        setWeights(newWeightsArray);
      };
      reader.readAsText(file);
    }
    else {
      console.log("File upload cancelled");
    }
    event.target.value = null;
  }

  return (
    <div>
      <h1>Weight Tracker</h1>
      <MyChartComponent data={weightsArray} />

      <p>date</p>
      {/*TODO: use forms for inputs */}
      <input id='datePicker' type="date" value={date} onChange={e => setDate(e.target.value)}/>
      <p>weight</p>
      <input type="number" value={weightValue} onChange={e => setWeightValue(e.target.value)} />
      <button onClick={handleAdd} style={{marginBottom: "2em"}}>add</button>
      <br/>
      <a download="weights.json"
         href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(weightsArray))}`}>Download weights</a>
      <br/>
      <label htmlFor="file-selector">Load weights from file: </label>
      <input type="file" id="file-selector" style={{marginBottom: "2em"}} />
      <button id='upload-file-btn' onClick={handleFileUpload}>upload</button>
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
