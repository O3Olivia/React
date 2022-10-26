import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "../css/Home.module.css";
import { FaGithubAlt } from "react-icons/fa";

function Home() { 
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
    const json = await (
        await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
    useEffect(() => {
      getMovies();
    }, []);
  return (
  <div>
      {loading ? (
        <div className={styles.loading_page}>
          <h1 className="loading">Loading...🍿</h1>
        </div>
      ) : (
      <>
            <div className={styles.home_header}>
              <div className={styles.home_header_left}>
                <img className={styles.logo}
               src={"/img/logo.png"} alt="" />
              </div>
            <div className={styles.home_header_right}>
              <a
                href="https://github.com/O3Olivia"
                alt="olivia github"
                target="_blank"
              >
                <div className={styles.home_header_right}>
              <a
                href="https://github.com/O3Olivia"
                alt="olivia github"
                target="_blank">
                  <p>
                    <FaGithubAlt />
                    <span className={styles.home_codeLink}>Oli's Film</span>
               </p>
              </a>
            </div>
              </a>
            </div>
            <h2 className={styles.home_header_middle}>
              The Hottest Films in the world 🔥
            </h2>
            </div>
         <div className={styles.home_align}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={ movie.year}
                rating={ movie.rating}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;