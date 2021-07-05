import React, {Fragment, useEffect, useState} from "react";
import {
    Grid,
    Button,
    Tabs,
    Tab,
    Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

import Modal from 'react-modal';

import Login from "./login/Login"
import Register from './register/Register';
import {
    useSelector,
    useDispatch
} from "react-redux";

import "./Header.css";
import logo from "../../assets/logo.svg";
import {
    SET_USER,
    UNSET_USER
} from "../../store/user-store";
import makeRequest from "../../makeRequest";

const authModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)"
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Typography component="div" className={`tab-container tab-${value}`}>{children}</Typography>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Header = (props) => {
    const { showBookButton } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state);
    const { isLogin } = user;
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authTabValue, setAuthTabValue] = useState(0);

    const handleAuthModalClose = () => {
        setAuthModalOpen(false);
    }
    const afterAuthModalOpen = () => {

    }
    const handleLoginClick = () => {
        setAuthModalOpen(true);
    }
    const handleLogoutClick = async () => {
        try {
            const response = await makeRequest(
                'POST',
                '/auth/logout',
                null,
                {
                    authorization: `Bearer ${sessionStorage.getItem('access-token')}`
                }
            );
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("userinfo");
            dispatch({
                type: UNSET_USER
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleAuthTabValueChange = (event, newValue) => {
        setAuthTabValue(newValue);
    }

    useEffect(() => {
        if(isLogin) {
            handleAuthModalClose();
        }
    }, [isLogin])

    useEffect(() => {
        if(sessionStorage.getItem('userid') && sessionStorage.getItem('userinfo')){
            const userInfo = JSON.parse(sessionStorage.getItem('userinfo'));
            const id = sessionStorage.getItem('userid');
            dispatch({
                type: SET_USER,
                payload: {
                    ...userInfo,
                    id,
                    isLogin: true
                }
            });
        }
    }, [])

    return(
        <Fragment>
            <header className="header">
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs="auto">
                        <img src={logo} className="logo" alt="Logo"/>
                    </Grid>
                    <Grid item xs="auto" className="header-button-container">
                        { showBookButton ? (
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Book Show
                            </Button>
                        ) : null }
                        { isLogin ? (
                            <Button
                                variant="contained"
                                color="default"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="default"
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </header>
            <Modal
                ariaHideApp={false}
                isOpen={authModalOpen}
                onAfterOpen={afterAuthModalOpen}
                onRequestClose={handleAuthModalClose}
                style={authModalStyles}
                contentLabel="Example Modal"
            >
                <Tabs
                    value={authTabValue}
                    onChange={handleAuthTabValueChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    centered
                    className="tab-nav-container"
                >
                    <Tab label="LOGIN" />
                    <Tab label="REGISTER" />
                </Tabs>
                <TabPanel index={0} value={authTabValue}>
                    <Login />
                </TabPanel>
                <TabPanel index={1} value={authTabValue}>
                    <Register />
                </TabPanel>
            </Modal>
        </Fragment>
    );
}

export default Header;