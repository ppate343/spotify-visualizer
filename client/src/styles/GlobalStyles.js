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
  background-color: black;
  color: white;
}
`;

export default GlobalStyles;