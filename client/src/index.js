import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//1. redux 적용하기
import { Provider } from "react-redux";

import "antd/dist/antd.css";
//3-1. 3번을 생상하면 알아서 정의됨
import { applyMiddleware, createStore } from "redux";

//4. promiseMiddleware, ReduxThunk를 선언
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./_reducers";

//3. createStoreWithMiddleware 상수 선언
//4-1 applyMiddleware에 각각 삽입. (이때 redux에서 stroe를 사용하기 위해 createStroe도 가져와야 함)
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  //2. <App /> 컴포넌트를 <Provider>로 감싼다
  //5. provider에 store를 선언 -> client폴더에 _reducers폴더에 index.js생성
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
