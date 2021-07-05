import React, {useEffect, useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    TextField,
    Button,
    withStyles
} from "@material-ui/core";
import makeRequest from "../../../makeRequest";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});

const Filter = (props) => {
    const { classes, applyFilter } = props;

    const [genresList, setGenresList] = useState([]);
    const [artistList, setArtistList] = useState([]);

    const [filter, setFilter] = useState({
        name: "",
        genres: [],
        artists: [],
        releaseStartDate: null,
        releaseEndDate: null
    })

    const nameChangeHandler = (e) => {
        const name = e.target.value;
        setFilter({
            ...filter,
            name
        })
    }

    const genreSelectHandler = (e) => {
        const genres = e.target.value;
        setFilter({
            ...filter,
            genres
        })
    }

    const artistSelectHandler = (e) => {
        const artists = e.target.value;
        setFilter({
            ...filter,
            artists
        })
    }

    const releaseDateStartHandler = (e) => {
        const releaseStartDate = e.target.value;
        setFilter({
            ...filter,
            releaseStartDate
        })
    }

    const releaseDateEndHandler = (e) => {
        const releaseEndDate = e.target.value;
        setFilter({
            ...filter,
            releaseEndDate
        })
    }

    const getGenres = async () => {
        try {
            const response = await makeRequest(
                'GET',
                `/genres`,
                null
            )
            if (response.ok) {
                const data = response.data;
                setGenresList(data.genres);
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (e) {
            console.log("Oops! Something went wrong.");
        }
    }

    const getArtists = async () => {
        try {
            const response = await makeRequest(
                'GET',
                `/artists`,
                null
            )
            if (response.ok) {
                const data = response.data;
                setArtistList(data.artists);
            } else {
                console.log("Oops! Something went wrong.");
            }
        } catch (e) {
            console.log("Oops! Something went wrong.");
        }
    }

    useEffect(() => {
        getGenres();
        getArtists();
    }, [])

    const applyFilterHandler = () => {
        applyFilter(filter);
    }
    return (
        <Card>
            <CardContent>
                <FormControl className={classes.formControl}>
                    <Typography className={classes.title} color="textSecondary">
                        FIND MOVIES BY:
                    </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                    <Input id="movieName" onChange={nameChangeHandler} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Genres</InputLabel>
                    <Select
                        multiple
                        renderValue={selected => selected.join(', ')}
                        value={filter.genres}
                        onChange={genreSelectHandler}
                    >
                        {genresList.map(genre => (
                            <MenuItem key={genre.id} value={genre.genre}>
                                <Checkbox checked={filter.genres.indexOf(genre.genre) > -1} />
                                <ListItemText primary={genre.genre} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Artists</InputLabel>
                    <Select
                        multiple
                        renderValue={selected => selected.join(', ')}
                        value={filter.artists}
                        onChange={artistSelectHandler}
                    >
                        {artistList.map(artist => (
                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                <Checkbox checked={filter.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="releaseDateStart"
                        label="Release Date Start"
                        type="date"
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        onChange={releaseDateStartHandler}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="releaseDateEnd"
                        label="Release Date End"
                        type="date"
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        onChange={releaseDateEndHandler}
                    />
                </FormControl>
                <FormControl className={classes.formControl} style={{ marginTop: 16}}>
                    <Button onClick={applyFilterHandler} variant="contained" color="primary">
                        APPLY
                    </Button>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(Filter);