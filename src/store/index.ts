import { legacy_createStore as createStore } from "redux";

const TODO_ACTION_TYPES = {
  add: "add",
  delete: "delete",
};

export interface todoProps {
  text: string;
  id: string;
}

interface actionProps {
  type: string;
  payload: todoProps;
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

export const actionCreators = {
  addTodo,
  deleteTodo,
};

const reactTodoReducer = (state: todoProps[] = [], action: actionProps) => {
  switch (action.type) {
    case TODO_ACTION_TYPES.add:
      return [...state, { text: action.payload.text, id: action.payload.id }];
    case TODO_ACTION_TYPES.delete:
      return [...state].filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

const reactTodoStore = createStore(reactTodoReducer);

export default reactTodoStore;
