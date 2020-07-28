import { LOGIN_USER } from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:

    //여기서 loginSuccess부분은 하나의 key : value(user_action에서 받은 값)을 의미
    //기존에 state값을 스프레드 시트를 이용해 불변성을 유지한 채 복사해온다.
    //여기서는 state값이 변경된게 없으니 리턴할게 없음
      return { ...state, payloadValue: action.payload };
      console.log('123123',state)
      break;

    default:
      return state;
  }
}
