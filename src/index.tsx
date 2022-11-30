import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { legacy_createStore as createStore } from "redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const counter = document.querySelector("span") as HTMLSpanElement;

interface actionProps {
  type: string;
}

// action에서 사용하는 type을 상수로 선언
const ACTION_TYPES = {
  plus: "plus",
  minus: "minus",
};

counter.innerText = "0";

// reducer는 dispatch의 action type에 따라 state를 변경한다.
const countModifier = (count: number = 0, action: actionProps) => {
  switch (action.type) {
    case ACTION_TYPES.plus:
      return ++count;
    case ACTION_TYPES.minus:
      return --count;
    default:
      return count;
  }
};

// store 선언, reducer를 인자로 받는다
const countStore = createStore(countModifier);

// subscribe는 state의 변경을 감지하여 실행된다.
countStore.subscribe(() => {
  counter.innerText = String(countStore.getState());
});

// dispatch는 action을 갖고 reducer를 통해 state를 변경시킨다.
plus?.addEventListener("click", () => {
  countStore.dispatch({ type: ACTION_TYPES.plus });
});

minus?.addEventListener("click", () => {
  countStore.dispatch({ type: ACTION_TYPES.minus });
});
