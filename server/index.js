const express = require("express");
const app = express();
const port = 5000;

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//쿠키파서 사용하기
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //에러가 안뜨도록 하는 부분
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("연결대떵!! >_<"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

//레지스터 라우터
app.post("/api/users/register", (req, res) => {
  //회원가입 할때 필요한 정보들을 Client에서 가져오면, 그것을 DB에 넣어준다
  //그러기 위해선 Model을 가져와야 한다(와꾸)

  const user = new User(req.body);
  //save() -> 몽고DB 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인 라우터
app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 DB에서 조회
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 다릅니다.",
      });
    }
    //요청된 이메일이 있다면, 비밀번호 대조
    //comparePassword메서드는 User.js에서 만든다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호도 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //Token을 저장한다. 어디에?(정할 수 있음) 쿠키, 로컬스토리지...등등
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.post("/api/users/auth", auth, (req, res) => {
  //여기까지 오면 미들웨어를 통과한거고, authentication이 true라는 이야기.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === "0" ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id, //미들웨어에서 가져온 값을 이용한것
    },
    {
      token: "",
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
