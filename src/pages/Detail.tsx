import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { actionCreators, todoProps } from "../store";

const Detail = ({ state, deleteTodo }: { state: any; deleteTodo: any }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { text } = state.find((todo: todoProps) => todo.id === id);
  return (
    <div>
      <h1>Detail</h1>
      <span>{text}</span>
      <button
        onClick={() => {
          deleteTodo(id);
          navigate("/");
        }}
      >
        Delete
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { state };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTodo: (id: string) => dispatch(actionCreators.deleteTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
