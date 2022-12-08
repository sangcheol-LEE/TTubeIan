import React,{useState}from 'react';
import Base from '../../components/Styles/Base';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userRegister } from '../../action/user_action';

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




const RegisterPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    name : "",
    email : "",
    password : "",
    password_confirm : ""
  });
  const handleSubmit = (e) => {
      e.preventDefault();
      const {email, password, password_confirm , name} = info
      if(password !== password_confirm) {
          setInfo({
            ...info,
            email : "",
            password : "",
            name: "",
            password_confirm: "",
          })
        return alert("비밀번호와 비밀번호 확인이 맞지 않습니다.")
      } else {
          let body = {
            name,
            email,
            password,
            password_confirm
          }

          dispatch(userRegister(body))
            .then(response =>  {
              if(response.payload.success) {
                navigate("/login")
              } else {
                alert("회원가입에 실패하셨습니다.")
              }
            })

          setInfo({
            ...info,
            email : "",
            password : "",
            name: "",
            password_confirm: "",
          })
      }
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
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>

        <SubTitle>이름</SubTitle>
        <Input type="text" name={"name"} value={info.name} onChange={handleChange}/>

        <SubTitle>E-mail</SubTitle>
        <Input type="email" name={"email"} value={info.email} onChange={handleChange}/>

        <SubTitle>Password</SubTitle>
        <Input type="password" name={"password"} value={info.password} onChange={handleChange}/>

        <SubTitle>password confirm</SubTitle>
        <Input type="password" name={"password_confirm"} value={info.password_confirm} onChange={handleChange}/>

          <Button>회원가입</Button>
          <Button onClick={() => navigate("/login")}>뒤로가기</Button>
      </Form>
    </Base>
  );
};

export default RegisterPage;