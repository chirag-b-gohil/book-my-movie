import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import Home from "./home/Home";
import Detail from "./home/detail/Detail";

const Controller = () => {
    return (
        <Router>
            <div className="main-container">
                <Route exact path='/' render={(props) => <Home {...props} />} />
                <Route path='/movie/:id' render={(props) => <Detail {...props} />} />
            </div>
        </Router>
    );
};

export default Controller;