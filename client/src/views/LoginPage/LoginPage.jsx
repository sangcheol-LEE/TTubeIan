import React ,{useState}from 'react';
import styled from 'styled-components';
import Base from '../../components/Styles/Base';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../action/user_action';



const Title = styled("h1")`
  color: green;
  font-size: 50px;
  font-weight:bold;
`;

const Form = styled("form")`
  max-width:100%;
  display:flex;
  flex-direction:column;
`;


const SubTitle = styled("h4")`
  margin-bottom: 10px;
  color: green;
`;

const Input = styled("input")`
  padding-left : 5px;
  height: 25px;
`;

const Button = styled("button")`
  width: 100%;
  margin-top : 10px;
  padding : 10px 100px;
  border : none;
  background-color :green;
  color : #fff;
`;



const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    email : "",
    password : ""
  })
  const handleSubmit = (e) => {
      e.preventDefault();

      let body = {
        email : info.email,
        password : info.password
      }

      dispatch(userLogin(body))
        .then(response =>  {
          if(response.payload.loginSuccess) {
            navigate("/")
          } else {
            alert("Login Error")
          }
        })

      setInfo({
        ...info,
        email : "",
        password : ""
      })
  }

  const handleChange = (e) => {
    const prev = {
      ...info,
      [e.target.name] : e.target.value
    }
    setInfo(prev)
  }

  return (
      <Base>
        <Title>IAN</Title>
        <Form onSubmit={handleSubmit}>
          <SubTitle>아이디</SubTitle>
          <Input type="email" name={"email"} value={info.email} onChange={handleChange}/>

          <SubTitle>비밀번호</SubTitle>
          <Input type="password" name={"password"} value={info.password} onChange={handleChange}/>

            <Button>로그인</Button>
            <Button onClick={() => navigate("/register")}>회원가입</Button>
        </Form>
      </Base>
  );
};

export default LoginPage;