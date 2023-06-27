import React from 'react'
import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
// import styled from 'styled-components';
import styled from 'styled-components/macro';
import { GlobalStyles } from "./styles";
import { Login } from "./pages"
import { Profile } from './pages'

// import './App.css';

// const StyledLoginButton = styled.a`
//   background-color: green;
//   color: white;
//   padding: 10px 20px;
//   margin: 20px auto;
//   border-radius: 30px;
//   display: inline-block;
// `;


function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    setToken(accessToken);

    //getCurrentuserProfile returns a promise -> use a try and catch
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
            <Profile />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
