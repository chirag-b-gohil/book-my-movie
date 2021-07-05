import React, {Fragment, useEffect, useState} from "react";
import Header from "../../common/header/Header";
import UpcomingMovies from "./upcoming-movies/UpcomingMovies";
import './Home.css';
import makeRequest from "../../makeRequest";
import ReleasedMovies from "./released-movies/ReleasedMovies";
import Filter from "./filter/Filter";

const Home = (props) => {
    const { history } = props;
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [filteredReleasedMovies, setFilteredReleasedMovies] = useState([]);

    const getMovies = async (status, update) => {
        try {
            const response = await makeRequest(
                'GET',
                `/movies?status=${status}`,
                null
            )
            if (response.ok) {
                const data = response.data;
                update(data.movies);
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (e) {
            console.log("Oops! Something went wrong.");
        }

    }
    useEffect(() => {
        getMovies("PUBLISHED", setUpcomingMovies);
        getMovies("RELEASED", setReleasedMovies);
    }, [])

    useEffect(() => {
        setFilteredReleasedMovies(releasedMovies);
    }, [releasedMovies]);

    const applyFilter = async (filter) => {
        try {
            let queryString = "?status=RELEASED";
            if (filter.name !== "") {
                queryString += "&title=" + filter.name;
            }
            if (filter.genres.length > 0) {
                queryString += "&genres=" + filter.genres.toString();
            }
            if (filter.artists.length > 0) {
                queryString += "&artists=" + filter.artists.toString();
            }
            if (filter.releaseStartDate !== null && filter.releaseStartDate !== "" ) {
                queryString += "&start_date=" + filter.releaseStartDate;
            }
            if (filter.releaseEndDate !== null && filter.releaseEndDate !== "") {
                queryString += "&end_date=" + filter.releaseEndDate;
            }
            const response = await makeRequest(
                'GET',
                `/movies?${queryString}`,
                null
            )
            if (response.ok) {
                const data = response.data;
                setFilteredReleasedMovies(data.movies);
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (e) {
            console.log("Oops! Something went wrong.");
        }

    }
    const movieClickHandler = (id) => {
        history.push(`/movie/${id}`);
    }
    return(
        <Fragment>
            <Header />
            <section className="upcoming-movies-scroller home-page">
                <UpcomingMovies movies={upcomingMovies}/>
                <div className="flex-container">
                    <div className="left">
                        <ReleasedMovies movies={filteredReleasedMovies} onMovieClick={movieClickHandler}/>
                    </div>
                    <div className="right">
                        <Filter applyFilter={applyFilter}/>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default Home;