import React, { useState } from "react";
import { connect } from "react-redux";
import Todo from "../components/Todo";
import { add, todoProps } from "../store";

const Home = ({ state, addTodo }: { state: todoProps[]; addTodo: any }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(text);
  };
  return (
    <>
      <h1>3. React + Redux : todo</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>Add todo</button>
      </form>
      <ul>
        {state.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state: todoProps[]) => {
  return { state };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (text: string) => dispatch(add({ text, id: String(Date.now()) })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
