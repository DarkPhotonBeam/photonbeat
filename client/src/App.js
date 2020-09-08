import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
                <Link to="/about">About</Link><br /><br />
                <Switch>
                    <Route exact path="/">Hauptseite</Route>
                    <Route path="/test">Testseite</Route>
                    <Route path="/about">Über beat.photonbeam.ch</Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
