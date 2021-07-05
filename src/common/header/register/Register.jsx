import React, { useState } from "react";
import {
    Button, Typography,
} from "@material-ui/core";
import {
    TextValidator,
    ValidatorForm
} from "react-material-ui-form-validator";
import makeRequest from "../../../makeRequest";

const Register = () => {
    const [registerDetail, setRegisterDetail] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: ""
    });

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const Status = () => {
        if (registerSuccess) {
            return (
                <Typography component="p">Registration Successful. Please Login!</Typography>
            );
        } else if (registerError) {
            return (
                <Typography component="p" color="error">{errorMsg}</Typography>
            );
        }
        return null;
    }

    const handleInput = (e) => {
        setRegisterDetail({
            ...registerDetail,
            [e.target.id]: e.target.value
        });
    }

    const handleRegister = async () => {
        const requestData = {
            email_address: registerDetail.email,
            first_name: registerDetail.firstname,
            last_name: registerDetail.lastname,
            mobile_number: registerDetail.contact,
            password: registerDetail.password
        };
        try {
            const response = await makeRequest(
                'POST',
                '/signup',
                requestData
            );
            if (response.ok) {
                setRegisterError(false);
                setRegisterSuccess(true);
            }
            else {
                setRegisterSuccess(false);
                setRegisterError(true);
                setErrorMsg(response.data.message);
            }
        } catch (e) {
            setRegisterSuccess(false);
            setRegisterError(true);
            setErrorMsg("Oops! Something went wrong.");
        }
    }

    const { firstname, lastname, email, password, contact } = registerDetail;
    return(
        <ValidatorForm onSubmit={handleRegister} className="auth-form">
            <TextValidator
                id="firstname"
                label="First Name *"
                type="text"
                value={firstname}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br/>
            <TextValidator
                id="lastname"
                label="Last Name *"
                type="text"
                value={lastname}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br/>
            <TextValidator
                id="email"
                label="Email *"
                type="email"
                value={email}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.', 'Invalid.']}
            />
            <br/>
            <TextValidator
                id="password"
                label="Password *"
                type="password"
                value={password}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br/>
            <TextValidator
                id="contact"
                label="Contact No. *"
                type="text"
                value={contact}
                onChange={handleInput}
                validators={['required']}
                errorMessages={['Required.']}
            />
            <br/>
            <Status />
            <br/>
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Register
            </Button>
        </ValidatorForm>
    );
}

export default Register;