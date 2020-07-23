

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




