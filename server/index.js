// 백엔드 시작점 ! express js 다운받기
const express = require('express'); // 익스프레스 모듈을 가져온다.
const app = express() // 새로운 익스프레스 앱을 만들고 !

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const {auth} = require("./middleware/auth")
const {User} = require("./models/User");

// 아래 코드는 application/x-www-form-urlencoded 의 형식의 데이터를 읽어주고
app.use(bodyParser.urlencoded({extended: true})); // 바디파서에 옵션을 주기 위해 사용합니다.
// 아래 코드는 application/json 형식의 데이터를 읽는다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("monggoDB Connected...."))
  .catch(err => console.log(err))

app.get("/", (request, response) => response.send("Hello World How are you ~? 내 이름은 상철이야"));

app.get("/api/hello", (request, response) => {
  response.send("안녕하세용 ㅎㅎㅎ ")
})

//회원가입 라우터 기능 !
app.post("/api/users/register", (request, response) => {

  // 회원가입시 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  // 1. 인스턴스 만들기
  const user = new User(request.body)

  // 2. 몽고디비 메서드인 save를 이용해서 정보들이 유저모델에 저장이된다. 이후 콜백함수가 오는데 이때 에러가 있으면 클라이언트에 에러가 있다고 제이슨 형식으로 전달해준다.
  user.save((err, userInfo) => {
    if(err) return response.json({ success: false, err })
    return response.status(200).json({
      success: true
    })
  })
})

// 로그인 기능 !
app.post("/api/users/login", (request, response) => {
  // 1.요청된 이메일을 데이터 베이스에서 있는지 찾는다.
  User.findOne({ email: request.body.email }, (err, user) => {
    if(!user) {
      return response.json({
        loginSuccess : false,
        message : "등록된 이메일이 존재하지 않습니다. 회원가입을 해주세요 !"
      })
    }
  // 2.요청된 이메일이 데이터베이스에 있다면, 비밀번호가 같은지 확인
    user.comparePassword(request.body.password, (err, isMatch) => {
      if(!isMatch) return response.json({loginSuccess : false, message: "비밀번호가 틀렸다눙 ~"})
      // 3.비밀번호까지 같다면 토큰을 생성
      user.getToken((err, user) => {
        if(err) return response.status(400).send(err);
        // 토큰을 저장한다 어디에 ? 쿠키, 로컬스토리지, 세션스토리지 ...
        // 쿠키에 보관하고 , 라이브러리를 다운받아야한다.
        response.cookie("x_auth",user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})


app.get("/api/users/auth", auth ,(request, response) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.
  response.status(200).json({
    _id: request.user._id,
    isAdmin: request.user.role === 0 ? false : true,
    isAuth :true,
    email: request.user.email,
    name: request.user.name,
    lastname : request.user.lastname,
    role: request.user.role,
    image : request.user.image
  })
})

app.get("/api/users/logout", auth, (request, response) => {
  User.findOneAndUpdate({_id: request.user._id},
    {token : ""}
    , (err, user) => {
      if(err) return response.json({ success: false, err});
      return response.status(200).send({
        success: true
      })
    })
})

const port = 3001 // 포트는 내 마음 !

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

