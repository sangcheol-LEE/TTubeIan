import React from 'react';
import axios from "axios";
import Base from '../../components/Styles/Base';
import { useNavigate } from 'react-router';
import Nav from '../../components/Styles/Nav';
import styled from 'styled-components';
import Ian from "../../asset/image/ian.png";


const Image = styled("img")`
  width:100%;
`;

const ImageContainer = styled("div")`
  width:100%;
`;
const LandingPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get("/api/users/logout")
    .then(response => {
        if(response.data.success) {
          navigate('/login')
        }else {
          alert("로그아웃 실패")
        }
    } )
  }

  return (
    <>
      <Nav handleClick={handleLogout}/>
      <Base>
        <ImageContainer>
          <Image src={Ian} alt="title"/>
        </ImageContainer>
      </Base>
    </>
  );
};

export default LandingPage;