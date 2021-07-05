import React, {Fragment} from "react";
import {
    GridList,
    GridListTile,
    GridListTileBar
} from "@material-ui/core";
import "./released-movies.css";

const ReleasedMovies = (props) => {
    const { movies, onMovieClick } = props;
    const getReleaseDate = function (date) {
        const d = new Date(date);
        return d.toDateString();

    }
    return(
        <Fragment>
            <GridList className="released-grid-list-container" spacing={32}>
                {
                    movies.map((movie) => (
                        <GridListTile key={ movie.id } className="released-movie-tile" style={{ height: "350px", width: "300px" }} onClick={() => onMovieClick(movie.id)}>
                            <img src={ movie.poster_url } className="movie-poster-image" alt={ movie.title } />
                            <GridListTileBar className="movie-title" title={ movie.title } subtitle={`Release Date: ${getReleaseDate(movie.release_date)}`}/>
                        </GridListTile>
                    ))
                }
            </GridList>
        </Fragment>
    );
}

export default ReleasedMovies;