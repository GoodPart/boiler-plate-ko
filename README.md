

# 1. 개발환경 구축

 #### 기본적인 환경 설정 및 "Hello GoodPart".

>**1. package.json 생성.**
>```
>npm init
>```

>**2. node_module설치 및 index.js파일 새로 만들기.**
>```
>npm install
>```

>**3. 익스프레스 설치**
>```
>npm install express --save
>```

>**4.  생성한 **index.js** 에 아래 코드 작성**
>```
>const express = require('express')
>const app = express()
>const port = 3000 //포트 번호는 마음대로 >_<
>
>app.get('/', (req, res) => res.send('Hello GoodPart!'))
>
>app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
>```

> **"Hello GoodPart"를 볼 수 있음.**
   
   
   
# 2. DB 설치 및 연결(MongoDB)

 #### 몽고DB만들고 Node와 연결하는 작업.

>**1. MongoDB사이트 로그인(회원가입) 및 권한 생성.**
>```
>https://account.mongodb.com/account/login
>```

>**2. Create a New Cluster 새 클래스터 생성**
>-------------------------------------------------------------
>1. Cloude Provider&Region = AWS
>2. Select Multi-Region, Workload Isolation, and Replication Options (M10+ clusters) = No
>3. Create a free tier cluster by selecting a region with FREE TIER AVAILABLE and choosing the M0 cluster tier below. = 가까운곳(본인은  Singapore로 선택함)
>4. Cluster Name = 이쁜걸로^^
>5. Create Cluster. = 완료(약 1~5분정도 소요됨)
>

>**3. 계정과 IP설정**
>-------------------------------------------------------------
>1. 중간에 **"CONNECT"** 라는 버튼이 있다. (클릭)
>2. 두가지 작업을 해야함.
>   - (1) **Whitelist a connection IP address**
>   - (2) **Create a Database User**
>```
>(1) DB에 접근할 IP 주소를 작성하라는 것이다.
>(2) DB에 접근할 계정을 생성하는 것이다.
>```
>**(2)의 계정의 비밀번호는 메모장에 복사해 둔다**
>
>3. 모두 성공했으면 3가지 선택지가 보이는데, **"Connect your application"** 을 클릭.
>4. 하단에 카피 가능한 code가 나온다. (MongoDB와 join할 수 있는 코드다) 복사.
>5. index.js에 아래 코드 추가
>```
>const mongoURI = "복사 해온 코드"

>**4. server(index.js)와 mongoose설치**
>```
>npm install mongoose --save
>```
>index.js에서 mongoose를 require받아 아래 코드를 작성한다.

><pre>
>const mongoose = require('mongoose')
>mongoose.connect(config.mongoURI, {
>    //에러가 안뜨도록 하는 부분 // MAC에서는 useNewUrlParser: true 빼고 에러 발생
>    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
>}).then(()=> console.log("연결대떵!! >_<"))
>.catch(err=>console.log(err))
></pre>
>
>**다시 npm run start를 통해 Log 확인**
---------------------------------------


# 3. 몽고DB Model과 Schema설정

<pre>
작성중...
</pre>
---------------------------------------

# 4. Git 설치 및 SSH연결

<pre>
작성중...
</pre>
---------------------------------------

# 5. BodyParser과 회원가입 기능(포스트맨)

<pre>
작성중...
</pre>
---------------------------------------

# 6. nodemon설치

<pre>
작성중...
</pre>
---------------------------------------

# 7. 비밀 설정 정보 관리 및 비밀번호 암호화 

<pre>
작성중...
</pre>
---------------------------------------

# 8. 로그인 기능 구현_1

로그인 을 위한 로직
1. 요청된 이메일을 조회
2. 이메일이 있다면 비밀번호 대조
3. 비밀번호도 맞다면 토큰 생성

<pre>
User.js


</pre>
---------------------------------------

# 9. 로그인 기능 구현_2

jsonwebtoken을 이용함.
<pre>
npm install jsonwebtoken --save
</pre>

<pre>
User.js

userSchema.methods.generateToken = function(cb) {
    var user = this;
    
    //jsonwebtoken을 이용함.
    //DB에 user._id에서 '_id'는 몽고DB에_id값이 있음 그것을 가져오는거임
    var token = jwt.sign(user._id.toHexString(), 'secretToken' )

    //만든 토큰을 임시로 token변수에 저장.
    user.token = token

    //에러가 있다면 에러 발생, 없다면 user파라미터 값으로 index.js에 전달 (메서드 return 값)
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}
</pre>

<pre>
index.js
    
    user.comparePassword()...

    //비밀번호도 맞다면 토큰 생성
    user.generateToken( (err, user) => {
        if(err) return res.status(400).send(err);

        //Token을 저장한다. 어디에?(정할 수 있음) 쿠키, 로컬스토리지...등등
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})


    })
</pre>
user.generateToken()메서드가 실행되어 return된 값이 generateToken((err, user))에서 **user(토큰값)** 값 이다
생성된 토큰을 저장할 곳을 찾아야한다.
종류로는 로컬스토리지, 쿠키 등 많지만 여기선 쿠키(cookie)를 사용한다.

쿠키에 저장하기 위해선 새로운 라이브러리가 필요함

<pre>
npm install cookie-parser --save
</pre>

index.js에 require와 app.use(...)를 이용해 사용할 준비를 한다.

<pre>
     //Token을 저장한다. 어디에?(정할 수 있음) 쿠키, 로컬스토리지...등등
     res.cookie("x_auth", user.token)
     .status(200)
     .json({loginSuccess: true, userId: user._id})
</pre>
res.cookie("파라미터1", 파라미터2)

파라미터1에는 생성될 쿠키의 key값을 작성한다(이름임)
파라미터2에는 로그인 요청하여 조회한 유저의 생성된 토큰값을 넣는다.

그리고 json을 보내 클라이언트에게 성공적으로 로그인 되었다는 값을 보낸다.

---------------------------------------

# 10. 로그 아웃

<pre>
작성중


</pre>

---------------------------------------
---------------------------------------
---------------------------------------
---------------------------------------

# Client 

# 1. 디렉토리 추가 및 이동

지금까지 디렉토리 
<pre>
 - App.js
  + client
  + node_modules
  + server
  + .gitignore
  + package.json
  + package-lock.json
  + README.md
</pre>

지금까지 작성한 **Node** 코드는 **server** 에 모두 넣는다. 

<pre>
server 폴더

- server
 + config
 + middleware
 + models
 + index.js
</pre>


<pre>
주의사항 - 이대로 최상위Root의 package.json(server용)에서 **script** 수정이 필요.

  "scripts": {
    "backend": "node ./server/index.js", //이렇게 변경이 필요함
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
</pre>

# (추가). client, server 한번에 실행시키기

<pre>
Root package.json

npm install concurrently --save
</pre>

<pre>
Root package.json


  "scripts": {
    "start": "node ./server/index.js",
    "backend": "nodemon server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "concurrently \"npm run backend\" \"npm run start --prefix client\"" //추가됨
  },

</pre>

# client 만들기 (create-react-app)

<pre>
root 디렉토리

npx create-react-app client
</pre>

### dependencies 추가

<pre>
client/package.json

npm install redux react-redux redux-promise redux-thunk --save
</pre>

1. axois : node서버와 통신하기 위함.
2. http-proxy-middleware : 로컬에서 CORS이슈를 없애기 위함.
3. react-redux, redux 리엑트에서 리덕스를 사용하기 위함
4. redux-promise, redux-thunk 리덕스를 보다 편리하게 사용하기 위한 미들웨어
store에 상태값은 오로지 dispatch(action실행기)를 이용해서 변경할 수 있다. store는 객체형식, 프로미스, function들을 이용해 받기때문에 이것을 한번에 처리해주는것이 미들웨어들이다.
