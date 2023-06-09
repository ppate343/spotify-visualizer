import React from 'react'
import { useState, useEffect } from 'react';
import { accessToken, logout } from './spotify';
import styled from 'styled-components/macro';
import { GlobalStyles } from "./styles";
import { Login } from "./pages"
import { Profile } from './pages'

const StyledLogoutButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  padding: 4px 12px;
  background-color: rgba(0,0,0,.7);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 30px;
  z-index: 10;
  @media (min-width: 768px) {
    right: 12px;
  }
`;


function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {

    setToken(accessToken);

  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      {!token ? (
        <Login />
      ) : (
        <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <Profile />
        </>
      )}
    </div>
  );
}

export default App;
