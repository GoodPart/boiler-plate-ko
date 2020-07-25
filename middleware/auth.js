const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리를 하는곳

  //1. 클라이언트 쿠키에서 토큰을 가져온다.(cookiePaser사용)
  let token = req.cookies.x_auth;

  //2. 가져온 토큰을 복호화하여 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //여기서 req값을 넘기는 이유는 미들웨어에서 넘겨 받은 토큰, 유저의 값을 조회할 수 있기 때문
    req.token = token;
    req.user = user;

    next();
  });

  //유저가 있다면 인증 true

  //유저가 없다면 false
};

module.exports = { auth };
