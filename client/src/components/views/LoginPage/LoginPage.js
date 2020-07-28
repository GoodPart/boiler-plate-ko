import React, { useState } from "react";
// import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  //제출 이벤트 실행시 클라이언트의 값을 서버로 보내야한다.
  //여기서 Axios를 사용해서 보내면 되지만, Redux를 사용함.
  //상단에 dispatch를 선언하고 사용함.
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log("email", Email);
    // console.log("Password", Password);

    //state값 변경 발생 -> dispatch -> action -> reducer ->component가 렌더링댐

    // state값을 body에 변수 body에 담아 dispatch(액션을 발생시키는 단계)
    let body = {
      email: Email,
      password: Password,
    };

    //변경될 state값을 body에 태워 lifeCycle을 모두 통과하면 .then(...)이하가 실행된다.**** _action 폴더로 이동하기 ****
    dispatch(loginUser(body)).then((response) => {
      //서버에서 받은 값의 loginSuccess(server/index.js에 코딩해둠)가true면 
      if (response.payload.loginSuccess) {
        // push('/')페이지로 이동시켜라
        props.history.push("/");
      } else {
        console.log("err");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
