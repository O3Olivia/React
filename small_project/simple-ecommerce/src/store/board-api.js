const FIREBASE_DOMAIN =
  "https://simple-e-commerce-f6319-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function getAllBoards() {
  const response = await fetch(`${FIREBASE_DOMAIN}/boards.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "게시판을 패치할수 없습니다.");
  }

  const transformedBoards = [];

  for (const key in data) {
    const boardObj = {
      id: key,
      ...data[key],
    };
    transformedBoards.push(boardObj);
  }
  return transformedBoards;
}

export async function getBoardItem(boardId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/boards/${boardId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "게시물을 패치할수 없습니다.");
  }

  const loadedBoard = {
    id: boardId,
    ...data,
  };
  return loadedBoard;
}

export async function addBoard(boardData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/boards.json`, {
    method: "POST",
    body: JSON.stringify(boardData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "게시물을 등록할 수 없습니다");
  }
  return null;
}

export async function getAllComments(boardId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${boardId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "코멘트를 로딩할 수 없습니다.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };
    transformedComments.push(commentObj);
  }
  return transformedComments;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/{requestData.boardId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentObj),
      headers: {
        "Contents-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "댓글을 추가할 수 없습니다");
  }
  return { commentId: data.name };
}
// update, delete까지 구현하기
