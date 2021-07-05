import React, {Fragment} from "react";
import {
    GridList,
    GridListTile,
    GridListTileBar
} from "@material-ui/core";
import "./upcoming-movies.css";

const UpcomingMovies = (props) => {
    const { movies } = props;
    return(
        <Fragment>
            <div className="upcoming-movies-title">Upcoming Movies</div>
            <GridList className="grid-list-container" cols={5}>
                {
                    movies.map((movie) => (
                        <GridListTile key={ movie.id } style={{ height: "100%" }}>
                            <img src={ movie.poster_url } className="movie-poster-image" alt={ movie.title } />
                            <GridListTileBar className="movie-title" title={ movie.title } />
                        </GridListTile>
                    ))
                }
            </GridList>
        </Fragment>
    );
}

export default UpcomingMovies;