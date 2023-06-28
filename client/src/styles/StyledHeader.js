import styled from 'styled-components/macro';

const StyledHeader = styled.header`
  display: flex;
  align-items: flex-end;
  position: relative;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  background-color: #535353;
  height: 30vh;
  max-height: 500px;
  min-height: 250px;

  @media (min-width: 768px) {
    min-height: 340px;
  }

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 20vh;
    background-color: #535353;
    background-image: linear-gradient(rgba(0,0,0,0.6), #121212);
    position: absolute;
    top: 100%;
    z-index: -1;
  }

  .header__inner {
    display: flex;
    align-items: flex-end;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 24px 16px;

    @media (min-width: 768px) {
      padding: 24px 64px;
    }
  }

  img.header__img {
    width: 20%;
    max-width: 250px;
    min-width: 120px;
    margin-right:  #181818;
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    background-color:  #181818;
    border-radius: ${props => props.type === 'user' ? '50%' : '0'};

    @media (min-width: 768px) {
      margin-right: 32px;
    }
  }

  .header__overline {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  h1.header__name {
    font-size: clamp(2.5rem, 10vw, 6rem);
    font-weight: 900;
    line-height: 1;
    margin: 0 0 8px 0;

    @media (min-width: 768px) {
      margin: 0 0 8px -5px;
    }
  }

  .header__meta {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #b3b3b3;
    margin-top: 30px;

    span {
      display: flex;
      align-items: center;

      &:not(:last-of-type)::after {
        content: '•';
        display: block;
        margin: 0 8px;
        color: #b3b3b3;
        font-size: 8px;
      }
    }
  }
`;

export default StyledHeader;