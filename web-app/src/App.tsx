import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

type ApiResponse = {
  res:String  
}

function App() {
  
  const [apiResponse,setApiResponse] = useState<ApiResponse>({res: ""})

  useEffect(() => {
    fetch("http://localhost:9000/parsepdf")
    .then(res => res.text())
    .then(res => setApiResponse({res: res}))
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <div className="App">
      <div>
        <h1>
          Finance Tracker App
        </h1>
        <p className='App-intre'> {apiResponse? apiResponse.res : ""}</p>
      </div>
    </div>
  );
}

export default App;
