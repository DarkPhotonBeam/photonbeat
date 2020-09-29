import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        },
    },
});

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
            <CssBaseline />
            <ThemeProvider theme={theme}>

            </ThemeProvider>
        </div>
    );
}

export default App;
