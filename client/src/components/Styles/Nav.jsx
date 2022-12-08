import React from 'react';
import styled from 'styled-components';

const Navigation = styled("div")`
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const Title = styled("h1")`
  color : green;
`;

const Button = styled("button")`
  border: none;
  background-color:transparent;
`;

const Nav = ({handleClick}) => {
  return (
    <Navigation>
      <Title>Ian's World</Title>
      <Button onClick={() => handleClick()}>로그아웃</Button>
    </Navigation>
  );
};

export default Nav;