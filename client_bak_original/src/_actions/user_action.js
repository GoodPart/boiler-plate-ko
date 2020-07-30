import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

//loginUser라는 메소드를 어디서든 사용하기위해 export 한것.
//1. LoginPage에 body Value를 dataToSubmit의 파라미터로 받는다.
//2. request 상수에 axios를 이용해 앤드 포인트(서버)(login)에 dataToSubmit을 발송함.
//3. server/index.js -> 로그인 라우터 부분을 모두 수행, 서버에서 받은 data를 상수 request에 저장함
export function loginUser(dataToSubmit) {
  const request = axios.post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

    //이 리턴이 실행되면 reducer에서 인지한다.(type과 payload를 받기도 한다.) ***** user_reducer로 이동 *****
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
    console.log("asdasdasd", request)

    
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

//get 메소드는 파라미터 필요 x
export function auth() {
  // const request = axios
  //   .get("/api/users/auth")
  //   .then((response) => response.data);
  //   console.log("asdasdasd", request)

  const request = axios.get('/api/users/auth')
      .then(response => response.data)
    
  return {
    type: AUTH_USER,
    payload: request,
  };
}
