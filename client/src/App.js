import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import axios from 'axios';

function App() {
    useEffect(() => {
        axios.get('/api/test').then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
                <Link to="/damnboy">Damn</Link>
                <Link to="/about">About</Link><br /><br />
                <Switch>
                    <Route exact path="/">Hauptseite</Route>
                    <Route path="/test">Testseite</Route>
                    <Route path="/damnboy">Boyboyboy</Route>
                    <Route path="/about">Über beat.photonbeam.ch</Route>
                    <Route>404 Error - Page not found</Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
