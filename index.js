const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user1234:123@boilerplate.1wdho.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    //에러가 안뜨도록 하는 부분
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("연결대떵!! >_<"))
.catch(err=>console.log(err))



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))