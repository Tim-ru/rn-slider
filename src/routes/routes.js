import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../pages/Home';
import Player from '../pages/Player';
import Slider from "../pages/Slider"

function Routes() {
    return (
                <Switch >
                    <Route path="/slider" component={Slider} />
                    <Route path="/player" component={Player} />
                    <Route path="/" component={Home} />
                </Switch>

    );
}

export default Routes;