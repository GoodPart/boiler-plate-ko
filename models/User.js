const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength: 50
    },
    email: {
        type: String,
        trim : true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    //토큰 유효기간
    tokenExp: {
        type: Number

    }
})

//스키마를 모델로 스키마를 감싼다.
const User = mongoose.model('User', userSchema)

//모듈화를 시켜 다른곳에도 사용할 수 있도록 지정
module.exports = { User }