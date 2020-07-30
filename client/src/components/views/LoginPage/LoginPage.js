import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'


function LoginPage(props) {

    const dispatch = useDispatch()
    

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")
    

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        let body = {
            email : Email,
            password : Password
        }
        dispatch(loginUser(body)).then((response) => {
            //서버에서 받은 값의 loginSuccess(server/index.js에 코딩해둠)가true면 
            if (response.payload.loginSuccess) {
              // push('/')페이지로 이동시켜라
              // console.log('여기까지 대는뎁')
              props.history.push("/")
            } else {
              console.log("err");
            }
          });
    }
    

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="Email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="Password" value={Password} onChange={onPasswordHandler} />
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default LoginPage
