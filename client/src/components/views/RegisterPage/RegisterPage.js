import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckPassword, setCheckPassword] = useState("");

  const dispatch = useDispatch();

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onCheckPasswordHandler = (e) => {
    setCheckPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!Password === CheckPassword) {
      alert("비밀번호와 체크 비밀번호가 다릅니다.");
    }

    let body = {
      name: Name,
      email: Email,
      password: Password,
      checkPassword: CheckPassword,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("err");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input type="Name" value={Name} onChange={onNameHandler} />
        <label>Email</label>
        <input type="Email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <label>CheckPassword</label>
        <input
          type="CheckPassword"
          value={CheckPassword}
          onChange={onCheckPasswordHandler}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default RegisterPage;
