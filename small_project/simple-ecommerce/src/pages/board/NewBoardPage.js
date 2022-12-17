import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BoardForm from "../../components/board/BoardForm";
import useHttp from "../../hooks/use-http";
import { addBoard } from "../../store/board-api";

const NewBoardPage = () => {
  const { sendRequest, status } = useHttp(addBoard);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/boards");
    }
  }, [status, navigate]);

  const addBoardHandler = (boardData) => {
    sendRequest(boardData);
  };
  return <BoardForm onAddBoard={addBoardHandler} />;
};

export default NewBoardPage;
