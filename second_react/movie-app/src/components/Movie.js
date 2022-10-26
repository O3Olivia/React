import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Movie.module.css";
// Movie component가({medium_cover_image...}) 정보들을 parent component(App.js)으로부터 받아오기 때문에 movie. 를 지워주고 prop에 받아올 정보를 적어둠 
function Movie({ id, coverImg, year, title, rating, genres}) { 
    return (
       <div>
      <div className={styles.movie}>
        <div className={styles.movie_justify}>
          <Link className={styles.movie_link} to={`/movie/${id}`}>
            <img src={coverImg} alt={title} className={styles.movie_img} />
          </Link>
          <h2 className={styles.movie_title}>
            <Link className={styles.movie_link} to={`/movie/${id}`}>
              {title}
            </Link>
          </h2>
        </div>
        <ul>
          <li>
            {genres.map((g) => (
              <li className={styles.movie_genres} key={g}>
                <a href="#" title="Movie Genres">
                  {g}
                </a>
              </li>
            ))}
          </li>
                </ul>
                <p className={styles.movie_year}>{ year}</p>
                <p className={styles.movie_year}>{ rating} / 10</p>
      </div>
    </div>
    );
}

Movie.propTypes = {
    id:PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    year:PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;