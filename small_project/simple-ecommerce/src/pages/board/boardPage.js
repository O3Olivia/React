import { useEffect } from "react";

import BoardList from "../../components/board/BoardList";
import UseHttp from "../../hooks/use-http";
import { getAllBoards } from "../../store/board-api";

import NoBoardFound from "../../components/board/NoBoardFound";
import LoadingSpin from "../../components/Layout/LoadingSpin";

const BoardPage = () => {
  const {
    sendRequest,
    status,
    data: loadedBoard,
    error,
  } = UseHttp(getAllBoards, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadedBoard || loadedBoard.length === 0)) {
    return <NoBoardFound />;
  }

  return <BoardList boards={loadedBoard} />;
};

export default BoardPage;
