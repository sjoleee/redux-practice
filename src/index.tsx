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
const counter = document.getElementById("counter") as HTMLSpanElement;

interface actionProps {
  type: string;
  payload?: any;
}

// action에서 사용하는 type을 상수로 선언
const COUNT_ACTION_TYPES = {
  plus: "plus",
  minus: "minus",
};

counter.innerText = "0";

// reducer는 dispatch의 action type에 따라 state를 변경한다.
const countReducer = (count: number = 0, action: actionProps) => {
  switch (action.type) {
    case COUNT_ACTION_TYPES.plus:
      return ++count;
    case COUNT_ACTION_TYPES.minus:
      return --count;
    default:
      return count;
  }
};

// store 선언, reducer를 인자로 받는다
const countStore = createStore(countReducer);

// subscribe는 state의 변경을 감지하여 실행된다.
countStore.subscribe(() => {
  counter.innerText = String(countStore.getState());
});

// dispatch는 action을 갖고 reducer를 통해 state를 변경시킨다.
plus?.addEventListener("click", () => {
  countStore.dispatch({ type: COUNT_ACTION_TYPES.plus });
});

minus?.addEventListener("click", () => {
  countStore.dispatch({ type: COUNT_ACTION_TYPES.minus });
});

// ----------------------------------------

const form = document.getElementById("form");
const input = document.getElementById("input") as HTMLInputElement;
const list = document.getElementById("list");

// action에서 사용하는 type을 상수로 선언
const TODO_ACTION_TYPES = {
  add: "add",
  delete: "delete",
};

interface todoProps {
  text: string;
  id: string;
}

// action creater : todo를 추가할 때 필요한 dispatch 인자를 생성
const addTodo = (text: string) => {
  return {
    type: TODO_ACTION_TYPES.add,
    payload: { text, id: String(Date.now()) },
  };
};

// action creater : todo를 삭제할 때 필요한 dispatch 인자를 생성
const deleteTodo = (id: string) => {
  return {
    type: TODO_ACTION_TYPES.delete,
    payload: { id },
  };
};

// reducer는 dispatch의 action type에 따라 state를 변경한다.
const todoReducer = (state: todoProps[] = [], action: actionProps) => {
  switch (action.type) {
    case TODO_ACTION_TYPES.add:
      return [...state, { text: action.payload.text, id: action.payload.id }];
    case TODO_ACTION_TYPES.delete:
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

// store 선언, reducer를 인자로 받는다
const todoStore = createStore(todoReducer);

// dispatch는 action을 갖고 reducer를 통해 state를 변경시킨다.
const dispatchAddTodo = (text: string) => {
  todoStore.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.parentElement)
    todoStore.dispatch(deleteTodo(target.parentElement?.id));
};

// 투두리스트를 그리는 함수. 삭제버튼에 이벤트를 바인딩함
const paintTodos = () => {
  const todos = todoStore.getState();
  if (list?.innerHTML) list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(button);
    list?.appendChild(li);
  });
};

// subscribe는 state의 변경을 감지하여 실행된다.
// state가 변경되면 투두리스트를 다시 그린다.
todoStore.subscribe(() => {
  paintTodos();
});

// input의 value를 text값으로 하는 todo를 추가한다.
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  dispatchAddTodo(String(input.value));
});
