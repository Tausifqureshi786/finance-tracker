import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

type ApiResponse = {
  res:String  
}

function App() {
  
  const [apiResponse,setApiResponse] = useState<ApiResponse>({res: ""})
  let [userName, setUsername] = useState<String>("")
  let [pass, setPassword] = useState<String>("")

  const login = async () => {

    const response = await fetch(`${origin}/auth/login`, {
      method: "POST", 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: userName,
        password: pass
      })
    })
    // return response.json()
  }

  const register = async () => {
    const response = await fetch(`${origin}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: userName,
        password: pass
      })
    })
  }

  useEffect(() => {
    console.log(origin)
    fetch(`${origin}/parsepdf`)
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
        <div>
          
          <div className="usernameTxt" style= {{alignItems: "start"}}>
              <label>Username: </label>
              <input type="string" placeholder='enter your username' onChange={ (e) => {setUsername(e.target.value)}}></input>
          </div>

          <div className="passTxt"style= {{alignItems: "start"}}>
              <label>Password: </label>
              <input type="string" placeholder='enter your password' onChange={ (e) => {setPassword(e.target.value)}}></input>
            </div>
          </div>

          <div>
            <button onClick={login}>Login</button>
            <button onClick={register}> Register</button>
          </div>
        </div>
        {/* <p className='App-intre'> {apiResponse? apiResponse.res : ""}</p> */}


      </div>

  );
}

export default App;
