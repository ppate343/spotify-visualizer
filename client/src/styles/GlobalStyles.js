import { createGlobalStyle } from 'styled-components/macro';



const GlobalStyles = createGlobalStyle`


  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: #121212;
    color: white;
    font-family: sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.04em;
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
  }

  a,
  button {
    transition: all 0.3s ease;
    color: inherit;
  }

  a {
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  button {
    border: 0;
    cursor: pointer;
    font-family: inherit;
    border-radius: 30px;
    background-color: rgba(0,0,0,.7);
    color: white;
    font-size: 14px;
    font-weight: 700;
    padding: 8px 12px;

    &:hover,
    &:focus {
      background-color: #535353;
      outline: 0;
    }
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  main {
    position: relative;
    padding: 64px 0;
  }

  .app {
    min-height: 100vh;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .overflow-ellipsis {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: unset;
    word-break: break-all;
  }

  .empty-notice {
    color: #535353;
    font-size: 20px;;
    text-align: center;
    padding: 64px;;
  }
`;



export default GlobalStyles;