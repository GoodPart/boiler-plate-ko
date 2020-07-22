

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




