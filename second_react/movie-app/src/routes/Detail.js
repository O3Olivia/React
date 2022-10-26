import { FaStar} from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect,useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "../css/Detail.module.css";

function Detail(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
   
    const getMovie = async () => {
        const json = await (
          await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setLoading(false);
        setMovie(() => json.data.movie);
    };

    useEffect(() => {
        getMovie();
    }, []);

    const rating = Math.floor(movie.rating);

    function ratingNum(){
      const ratingArray= [];
        for(let i = 0; i < rating; i++){
          ratingArray.push(<FaStar />);
        }
        return ratingArray;
    }
  

    return (
    <div>
        {loading ? (
        <div className={styles.loading_detail}>
          <h1>Loading...🍿{movie.title}</h1>
        </div>
      ) : (
          <div className='movie_detail' style={{ backgroundImage: `url(${movie.background_image_original})` }}>
              <div className='movie_detailWrap'>
                <div  className='movie_detailBox'>
                  <Link to="/" className='close'><AiOutlineClose/></Link>
                  <h2 className='movie_detailTit'dangerouslySetInnerHTML={{__html: movie.title }}></h2>
                  <div className='movie_detailImg'>
                    <img src={movie.large_cover_image} alt={movie.title}/>
                  </div>
                  <div className='movie_rating'>
                    {ratingNum()}
                  </div>
                  <p className='movie_detailIntro' dangerouslySetInnerHTML={{__html: movie.description_intro }}></p>
                    <ul className='movie_detailGenres'>
                        {movie.genres.map((genre)=>(
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                  </div>
                </div>
          </div>
        )}
      </div>
    )
}

export default Detail;