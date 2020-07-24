const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//saltRound = 정보를 10자리로 암호화를 하겠다
const saltRounds = 10
//토큰 선언
const jwt = require('jsonwebtoken')


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

//1. pre는 몽구스 메서드 -> 값을Save하기전에 아래 코드가 실행되고 next가 진행되야지 값이 넘어감
//2. 클라이언트의 정보를 받아 저장하기 전, func()을 실행한다.
//3. 이 단계를 거쳐 index에 레지스터 단에 data가 삽입된다. index.js-> userInfo
//4. next()을 사용하면 바로 index.js에 레지스터 단으로 들어간다.
userSchema.pre('save', function(next) {

    //1. var user = this는 문서 위 userSchema를 지칭하는것(선언)
    var user = this;

    //비밀번호를 변경할때만 암호화를 한다.
    //if문이 없다면 email, name등을 변경할때도 암호화 해버림.
    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        //https://www.npmjs.com/package/bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash( user.password , salt, function(err, hash) {
                //func(안에 hash)는 암호화된 비밀번호임
                if(err) return next(err)

                //만약 암호화에 성공했다면 레지스터에 보낼 user.password의 값을 hash로 변경하라.
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})



//cb은 콜백 
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword = 1234567
    //암호화된 password = 54%^$&%^&%^*%^*
    //여기서 암호화된 정보를 복호화할 순 없다. 
    //따라서, 클라이언트에서 받은 비밀번호를 암호화해서 DB에 있는 암호화 비밀번호화 대조한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        //에러는 없고 true다
        cb(null, isMatch)
    })
}

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

//스키마를 모델로 스키마를 감싼다.
const User = mongoose.model('User', userSchema)

//모듈화를 시켜 다른곳에도 사용할 수 있도록 지정
module.exports = { User }