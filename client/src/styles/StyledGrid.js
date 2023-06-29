import styled from 'styled-components/macro';

const StyledGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 24px;
  }

  .grid__item {
    background-color: #121212;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    cursor: default;

    &:hover,
    &:focus {
      background-color: #181818;

      img {
        box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .grid__item__inner {
    padding: 12px;

    @media (min-width: 768px) {
      padding: 16px;
    }
  }

  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto 24px;

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #181818;
      border-radius: ${props => props.type === 'artist' ? '50%' : '2px'};
    }
  }

  .grid__item__name {
    margin: 0 0 4px;
    font-size: 16px;;
    letter-spacing: normal;
  }

  .grid__item__label {
    font-size: 14px;
    color: #b3b3b3;
  }
`;

export default StyledGrid;