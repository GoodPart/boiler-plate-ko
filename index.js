const express = require('express')
const app = express()
const port = 5000

const {User} = require('./models/User')
const bodyParser = require('body-parser')

const config = require("./config/key")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    //에러가 안뜨도록 하는 부분
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("연결대떵!! >_<"))
.catch(err=>console.log(err))





app.get('/', (req, res) => res.send('Hello World!'))



app.post('/register', (req,res) => {
    //회원가입 할때 필요한 정보들을 Client에서 가져오면, 그것을 DB에 넣어준다 
    //그러기 위해선 Model을 가져와야 한다(와꾸)

    const user = new User(req.body)
    //save() -> 몽고DB 메서드
    user.save((err, userInfo)=> {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success: true
        })

    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))