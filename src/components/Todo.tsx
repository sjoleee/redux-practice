import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";

const Todo = ({
  text,
  id,
  deleteTodo,
}: {
  text: string;
  id: string;
  deleteTodo: () => void;
}) => {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button
        onClick={() => {
          deleteTodo();
        }}
      >
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    deleteTodo: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(Todo);
