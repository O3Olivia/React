import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";

import { getBoardItem } from "../../store/board-api";
import LoadingSpin from "../../components/Layout/LoadingSpin";
import BoardDetail from "../../components/board/BoardDetail";

import classes from "./boardDetailPage.module.css";

const BoardDetailPage = () => {
  const params = useParams();
  const { boardId } = params;

  const {
    sendRequest,
    status,
    data: loadedBoard,
    error,
  } = useHttp(getBoardItem, true);

  useEffect(() => {
    sendRequest(boardId);
  }, [sendRequest, boardId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }
  if (!loadedBoard.text) {
    return <p className="centered">게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className={classes.detailForm}>
      <div>
        <BoardDetail
          title={loadedBoard.title}
          text={loadedBoard.text}
          author={loadedBoard.author}
          date={loadedBoard.date}
        />
      </div>
    </div>
  );
};

export default BoardDetailPage;
