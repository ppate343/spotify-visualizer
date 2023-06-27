import styled from 'styled-components/macro';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: green;
  color: white;
  border-radius:30px;
  font-weight: 700;
  font-size: 18px;
  padding: 12px 32px;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => (
  <StyledLoginContainer>
    <StyledLoginButton href="http://localhost:8888/login">
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;