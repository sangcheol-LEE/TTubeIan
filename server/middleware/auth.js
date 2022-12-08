const {Uset, User} = require("../models/User");

let auth = (request, response, next) => {
//인증처리를 하는 곳

// 1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = request.cookies.x_auth;
// 2. 토큰을 복호화 해서 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return response.json({isAuth: false, error: true})

    request.token = token;
    request.user = user;
    next();
  })
// 3. 유저가 있으면 인증 Ok
// 4. 유저가  없으면 인증 No!



}

module.exports = { auth }