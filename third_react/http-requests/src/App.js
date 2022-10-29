import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMovieHandler() {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json(); // json() 변환과정
      })
      .then((data) => {
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
      });
    // data에서 results 부분을 가져와서 state에 저장시킬 것임.
    // fetch API를 사용함 ('요청하는 URL을 https://를 붙여서 적는다', {자바스크립트 객체 전달 ->get() 메소드를 사용하기 때문에 지금은 필요없음 })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {/* Fetch Movies button을 누르면 영화정보를 가져옴 */}
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
