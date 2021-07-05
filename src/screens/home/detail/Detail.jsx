import React, {Fragment, useEffect, useState} from "react";
import Header from "../../../common/header/Header";
import {
    Typography,
    GridList,
    GridListTile,
    GridListTileBar
} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "./detail.css";
import {Link} from "react-router-dom";
import makeRequest from "../../../makeRequest";
import YouTube from "react-youtube";

const Detail = (props) => {
    const { match } = props;
    const [details, setDetails] = useState({});
    const [stars, setStars] = useState([
        {
            id: 1,
            color: "black"
        },
        {
            id: 2,
            color: "black"
        },
        {
            id: 3,
            color: "black"
        },
        {
            id: 4,
            color: "black"
        },
        {
            id: 5,
            color: "black"
        }
    ])

    const getDetail = async (id) => {
        try {
            const response = await makeRequest(
                'GET',
                `/movies/${match.params.id}`,
                null
            )
            if (response.ok) {
                const data = response.data;
                setDetails(data);
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (e) {
            console.log("Oops! Something went wrong.");
        }
    }

    useEffect(() => {
        getDetail();
    },[])

    const trailer_YT_opts = {
        playerVars: {
            autoplay: 1
        }
    }

    const starClickHandler = (id) => {
        const newStars = [...stars];
        newStars.forEach(star => {
            star.color = "black";
        });
        newStars.forEach(star => {
            if(star.id <= id){
                star.color = "yellow";
            }
        });
        setStars(newStars);
    }

    const {
        poster_url,
        title,
        genres,
        duration,
        release_date,
        rating,
        wiki_url,
        storyline,
        trailer_url,
        artists
    } = details;
    return (
        <Fragment>
            <Header showBookButton={true} />
            <div className="back-to-home">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>
            {Object.keys(details).length > 0 ? (
                <section className="detail-page">
                    <div className="flex-container">
                        <div className="left">
                            <img src={poster_url} alt={title} style={{ maxWidth: "100%" }}/>
                        </div>
                        <div className="middle">
                            <div>
                                <Typography variant="headline" component="h2">{title} </Typography>
                            </div>
                            <br />
                            <div>
                                <Typography>
                                    <span className="bold">Genres: </span> {genres.join(', ')}
                                </Typography>
                            </div>
                            <div>
                                <Typography><span className="bold">Duration:</span> {duration} </Typography>
                            </div>
                            <div>
                                <Typography><span className="bold">Release Date:</span> {new Date(release_date).toDateString()} </Typography>
                            </div>
                            <div>
                                <Typography><span className="bold"> Rating:</span> {rating}  </Typography>
                            </div>
                            <div style={{ marginTop: "16px" }}>
                                <Typography><span className="bold">Plot:</span> <a href={wiki_url}>(Wiki Link)</a> {storyline} </Typography>
                            </div>
                            <div style={{ marginTop: "16px" }}>
                                <Typography>
                                    <span className="bold">Trailer:</span>
                                </Typography>
                                <YouTube
                                    videoId={trailer_url.split("?v=")[1]}
                                    opts={trailer_YT_opts}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <Typography>
                                <span className="bold">Rate this movie: </span>
                            </Typography>
                            {stars.map(star => (
                                <StarBorderIcon
                                    className={`star ${star.color}`}
                                    key={"star" + star.id}
                                    onClick={() => starClickHandler(star.id)}
                                />
                            ))}
                            <div className="bold" style={{ margin: "16px 0"}}>
                                <Typography>
                                    <span className="bold">Artists:</span>
                                </Typography>
                            </div>
                            <div className="paddingRight">
                                <GridList cellHeight={160} cols={2}>
                                    {artists != null && artists.map(artist => (
                                        <GridListTile
                                            className="gridTile"
                                            key={artist.id}>
                                            <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                            <GridListTileBar
                                                title={artist.first_name + " " + artist.last_name}
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}


        </Fragment>
    )
}

export default Detail;