import React,{useEffect} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router';
import { userAuth } from '../action/user_action';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // option이 만약,
  /*
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입이 가능한 페이지
    false => 로그인한 유저는 출입 불가능한 페이지
  */

  const AuthenticationCheck = () =>{
    useEffect(() => {
      dispatch(userAuth()).then((res) => {
        console.log("auth?", res);
        // 로그인 하지 않은 상태
        if(!res.payload.isAuth) {
          if(option) {
            navigate("/login")
          }
        } else {
          // 로그인 한 상태
          if(adminRoute && !res.payload.isAdmin) {
            navigate("/")
          } else {
            if(option === false) {
              navigate("/")
            }
          }
        }
      })
    },[])
    return (
      SpecificComponent
    )
  }


  return <AuthenticationCheck />;
};
