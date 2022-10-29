import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setIsLoading(true); // Loading중임
    setError(null); // 이전에 받은 error 초기화시킴
    try {
      const response = await fetch("https://swapi.dev/api/film"); // films에서 s 빼서 일부러 오류를 만들어봄
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } // resoponse가 맞는지 확인

      const data = await response.json(); // json() 변환과정

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      // api와 이름이 다르게 불러오기 때문에 (예 MoviesList에서 releaseDate처럼.) 변환과정을 거치고 난 뒤 setMovies에 저장시킴
      // map() => 넘겨받은 배열의 모든 객체를 새로운 객체로 변환시킴.
      // movieData라고 이름을 붙인 데이터를 가져오는데, 이 중 3가지만 가져오고 싶기 때문에 3가지의 이름을 설정
      setMovies(transformedMovies);
      setIsLoading(false); // loading이 끝났으므로
      // data에서 results 부분을 가져와서 state에 저장시킬 것임.
      // fetch API를 사용함 ('요청하는 URL을 https://를 붙여서 적는다', {자바스크립트 객체 전달 ->get() 메소드를 사용하기 때문에 지금은 필요없음 })
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // error떠도 loading 끝
  } // async await를 사용하면 error 발생 상황을 대비해 try / catch를 사용한다. then을 사용하면 cache()를 추가해서 오류 확인한다

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
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {/* Fetch Movies button을 누르면 영화정보를 가져옴 */}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;
