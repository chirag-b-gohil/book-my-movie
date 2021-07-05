import React, { useState } from "react";
import {
    Button, Typography,
} from "@material-ui/core";
import {
    TextValidator,
    ValidatorForm
} from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import makeRequest from "../../../makeRequest";
import { SET_USER } from "../../../store/user-store";

const Register = () => {
    const dispatch = useDispatch();
    const [loginDetail, setLoginDetail] = useState({
        username: "",
        password: ""
    });
    const [loginError, setLoginError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const Status = () => {
        if (loginError) {
            return (
                <Typography component="p" color="error">{errorMsg}</Typography>
            );
        }
        return null;
    }

    const handleInput = (e) => {
        setLoginDetail({
            ...loginDetail,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        const authorizationToken = btoa(`${loginDetail.username}:${loginDetail.password}`);
        try {
            const response = await makeRequest(
                'POST',
                '/auth/login',
                null,
                {
                    authorization: `Basic ${authorizationToken}`
                }
            );
            if (response.ok) {
                const payload = response.data;
                const userInfo = {
                    email: payload.email_address,
                    firstname: payload.first_name,
                    lastname: payload.last_name,
                    contact: payload.mobile_phone,
                }
                sessionStorage.setItem("userid", payload.id);
                sessionStorage.setItem("access-token", response.xhr.getResponseHeader("access-token"));
                sessionStorage.setItem("userinfo", JSON.stringify(userInfo));
                dispatch({
                    type: SET_USER,
                    payload: {
                        ...userInfo,
                        id: payload.id,
                        isLogin: true
                    }
                });
            }
            else {
                setLoginError(true);
                setErrorMsg(response.data.message);
            }
        } catch (e) {
            setLoginError(true);
            setErrorMsg("Oops! Something went wrong.");
        }
    }

    const { username, password } = loginDetail;

    return(
        <ValidatorForm onSubmit={handleLogin} className="auth-form">
            <TextValidator
                id="username"
                label="Username *"
                type="text"
                name="username"
                value={username}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br/>
            <TextValidator
                id="password"
                label="Password *"
                type="password"
                name="password"
                value={password}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br />
            <Status/>
            <br />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Login
            </Button>
        </ValidatorForm>
    );
}

export default Register;