import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true); // Loading중임
    setError(null); // 이전에 받은 error 초기화시킴
    try {
      const response = await fetch(
        "https://react-http-2a48b-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      ); // https://swapi.dev/api/films films에서 s 빼서 일부러 오류를 만들어봄
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } // response가 맞는지 확인

      const data = await response.json(); // json() 변환과정
      console.log(data); // 배열이 아닌 객체로 받음을 확인함.

      const loadedMovies = [];
      for (const key in data) {
        // key: id of Movies
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      // const transformedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      // // api와 이름이 다르게 불러오기 때문에 (예 MoviesList에서 releaseDate처럼.) 변환과정을 거치고 난 뒤 setMovies에 저장시킴
      // // map() => 넘겨받은 배열의 모든 객체를 새로운 객체로 변환시킴.
      // // movieData라고 이름을 붙인 데이터를 가져오는데, 이 중 3가지만 가져오고 싶기 때문에 3가지의 이름을 설정
      setMovies(loadedMovies);
      // data에서 results 부분을 가져와서 state에 저장시킬 것임.
      // fetch API를 사용함 ('요청하는 URL을 https://를 붙여서 적는다', {자바스크립트 객체 전달 ->get() 메소드를 사용하기 때문에 지금은 필요없음 })
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // error떠도 loading 끝
  }, []); // async await를 사용하면 error 발생 상황을 대비해 try / catch를 사용한다. then을 사용하면 cache()를 추가해서 오류 확인한다

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]); // 컴포넌트가 재평가될때마다 호출된다. 그러나 무한루프 상태가 발생할 수 있으므로 의존성 배열을 호출한다. (언제 effect함수가 다시 실행되는지 정의)[] 빈칸으로 두게되면 로딩될 때를 제외하면 절때 재실행되지 않는다. [fetchMovieHandler]로하면 fetchMovieHandler 함수가 변경될때마다 재실행, but 무한루프 발생, so useCallback 사용

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-2a48b-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // fetch -> 데이터를 전송할때도 사용가능. body는 json으로 받아야하기 때문에 JSON.stringify를사용. stringify: 자바스크립트 객체나 배열을 json형식으로 바꿔줌
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no Movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p> Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {/* Fetch Movies button을 누르면 영화정보를 가져옴 */}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;
