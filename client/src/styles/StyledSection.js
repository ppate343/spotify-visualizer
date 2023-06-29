import styled from 'styled-components/macro';

const StyledSection = styled.section`
  &:first-of-type {
    .section__inner {
      padding-top: 0;
    }
  }

  .section__inner {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    padding: 24px 16px;
    @media (min-width: 768px) {
      padding: 32px 64px;
    }
  }

  .section__top {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 32px;
  }

  .section__heading {
    display: flex;
    margin: 0;
    font-size: 24px;
  }

  .section__breadcrumb {
    display: flex;
    color: #b3b3b3;

    &::after {
      content: '/';
      display: block;
      margin: 0  12px;
    }

    a {
      &:hover,
      &:focus {
        color:white;
      }
    }
  }

  .section__see-all {
    display: flex;
    align-items: flex-end;
    text-transform: uppercase;
    color: #b3b3b3;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding-bottom: 2px;
  }
`;

export default StyledSection;