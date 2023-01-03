import './App.css';
import { useState } from 'react';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function App() {
  const [title, setTitle] = useState();
  const [created_date, setDate] = useState();
  const [data, setData] = useState([]);

  const handleSave = () => {
    if(!title || !created_date){
      return;
    }
    const obj = {
      name: title,
      created_at: created_date,
    }
    setData([...data, obj]);

    setTitle('');
    setDate('');
  }
  // const filteredData = data.length === 0 ? data : data.reduce((acc, curr)=>{
  //   acc[curr.created_at] = acc[curr.created_at] ?? [];
  //   acc[curr.created_at].push(curr)
  //   return acc;
  // })
  // console.log({filteredData});

  const groupByCategory = data.reduce((acc, curr) => {
    const { created_at } = curr;
    acc[created_at] = acc[created_at] ?? [];
    acc[created_at].push(curr);
    return acc;
  }, {});

  const labels = Object.entries(groupByCategory).map(([date, value]) => date);
  const chatData = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: Object.entries(groupByCategory).map(([date, value]) => value.length),
      },
    ],
  };


  return (
    <div className="App">
      <h1>Todo-App</h1>
      <div className='main'>
      <input value={title} type="text" placeholder="Enter Title" onChange={(e)=> setTitle(e.target.value)} />
      <input value={created_date} type="date" onChange={(e)=> setDate(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      </div>
      <div className="chartDiv">
        <Bar data={chatData} />
      </div>
    </div>
  );
}

export default App;
