import React from 'react';
import styled from "styled-components";

const Container = styled("div")`
  padding:0 50px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  margin : 0 auto;

`;

const Base = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Base;