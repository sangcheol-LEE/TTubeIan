const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10
const jwt = require("jsonwebtoken");
// 스키마
const userSchema = mongoose.Schema({
  name : {
  type : String,
  maxlength: 50
  },

  email: {
  type : String,
  trim : true // 공백을 지워주는 역할
  },

  password: {
  type : String,
  minlength: 5
  },

  lastname : {
  type : String,
  maxlength: 50
  },

  role : {
  type : Number,
  default : 0 // 내가 롤을 따로 지정하지 않으면 기본값으로 0을 주겠다.
  },

  image: String,

  token: {
  type: String
  },

  tokenExp: {
  type: Number
  }

})

userSchema.pre("save", function(next) {
  var user = this;

  if(user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err)
        user.password = hash;
        next()
      })
    })
  } else {
      next()
  }
})

// 메소드 생성,,
userSchema.methods.comparePassword = function(plainPassword, callback) {
  // plainPassword
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    console.log(plainPassword)
    console.log(isMatch)
    if(err) return callback(err)
    callback(null, isMatch)
  })
}

userSchema.methods.getToken = function(callback) {
  var user = this;
  // json web token 을 이용해서 토큰 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken")

  user.token = token;
  user.save(function(err, user) {
    if(err) return callback(err)
    callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, callback) {
  var user = this;

  // 토큰을 디코드한다.
  jwt.verify(token, "secretToken", function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, function(err, user) {
      if(err) return callback(err);
      callback(null, user)
    })
  })
}

// User = 모델
const User = mongoose.model("User", userSchema) // 스키마를 모델로 감싸줬다.


// 다른 파일에서도 쓰게하기 위해
module.exports = {User}

