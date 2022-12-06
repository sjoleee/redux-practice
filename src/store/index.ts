import {
  configureStore,
  //   createAction,
  //   createReducer,
  createSlice,
} from "@reduxjs/toolkit";
// import { legacy_createStore as createStore } from "redux";

export interface todoProps {
  text: string;
  id: string;
}

interface actionProps {
  type: string;
  payload: todoProps;
}

// RTK의 createAction으로 대체
// const addTodo = createAction<todoProps>("ADD");
// const deleteTodo = createAction<{ id: string }>("DELETE");

// const TODO_ACTION_TYPES = {
//     add: "add",
//     delete: "delete",
//   };

// // action creater : todo를 추가할 때 필요한 dispatch 인자를 생성
// const addTodo = (text: string) => {
//   return {
//     type: TODO_ACTION_TYPES.add,
//     payload: { text, id: String(Date.now()) },
//   };
// };

// // action creater : todo를 삭제할 때 필요한 dispatch 인자를 생성
// const deleteTodo = (id: string) => {
//   return {
//     type: TODO_ACTION_TYPES.delete,
//     payload: { id },
//   };
// };

// export const actionCreators = {
//   addTodo,
//   deleteTodo,
// };

// RTK의 createReducer로 대체
// const reactTodoReducer = createReducer<todoProps[]>([], {
//   [addTodo.type]: (state: todoProps[] = [], action: actionProps) => {
//     state.push({ text: action.payload.text, id: action.payload.id });
//   },
//   [deleteTodo.type]: (state: todoProps[] = [], action: actionProps) =>
//     state.filter((todo) => todo.id !== action.payload.id),
// });

// const reactTodoReducer = (state: todoProps[] = [], action: actionProps) => {
//   switch (action.type) {
//     case addTodo.type:
//       return [...state, { text: action.payload.text, id: action.payload.id }];
//     case deleteTodo.type:
//       return [...state].filter((todo) => todo.id !== action.payload.id);
//     default:
//       return state;
//   }
// };

const reactTodoSlice = createSlice({
  name: "reactTodoReducer",
  initialState: [] as todoProps[],
  reducers: {
    add: (state: todoProps[] = [], action: actionProps) => {
      state.push({ text: action.payload.text, id: action.payload.id });
    },
    remove: (state: todoProps[] = [], action: actionProps) =>
      state.filter((todo) => todo.id !== action.payload.id),
  },
});

// RTK의 configureStore로 대체
const reactTodoStore = configureStore({ reducer: reactTodoSlice.reducer });
export const { add, remove } = reactTodoSlice.actions;
// const reactTodoStore = createStore(reactTodoReducer);

export default reactTodoStore;
