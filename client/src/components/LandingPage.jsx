import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/landing.css';

export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Bienvenido a HENRY DOGS</h1>
            <Link to = '/home'>
                <button className='landing_button'>Ingresar</button>
            </Link>
        </div>
    )
};