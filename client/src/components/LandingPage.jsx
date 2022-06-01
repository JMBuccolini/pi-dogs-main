import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/landing.css';

export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Bienvenidos a mi Dog API</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
};