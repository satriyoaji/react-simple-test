
import React from "react";
import { Movie } from "../types/movie";

interface Props {
    movie: Movie;
    isWatchLater: boolean;
    toggleWatchLater: (id: string) => void
}

const MovieCard: React.FC<Props> = ({movie,isWatchLater, toggleWatchLater }) => {

    return (
        <div className="movie-card">
            <img src={movie.Poster} width="100" alt={movie.Title} ></img>
            <p>
                {movie.Title}
            </p>
            <label htmlFor="">
                <input type="checkbox" checked={isWatchLater} onChange={() => toggleWatchLater(movie.imdbID)} />
                <h5>Watch Later</h5>
            </label>
        </div>
    )
}
export default MovieCard;