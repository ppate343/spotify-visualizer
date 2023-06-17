import { useState, useEffect } from 'react';
import { accessToken, logout } from './spotify';

import logo from './logo.svg';
import './App.css';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    // const fetchData = async = () => {
    //   try {
    //     const response = await getCurrent
    //   }
    // }

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a
            className="App-link"
            href="http://localhost:8888/login"
          >
            Log in to Spotify
          </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
          </>

        )}
      </header>
    </div>
  );
}

export default App;
