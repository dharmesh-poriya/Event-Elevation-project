import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFoundComponent() {
    return (
        <div className="not-found">
          <h1>404 😞</h1>
          <h2>Oops! Page Not Found</h2>
          <p>We can't find the page you are looking for.</p>
          <img src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif" alt="Confused Travolta GIF"/>
          <br />
          <Link to="/" className="btn-home">Go to Home Page</Link>
        </div>
      );
}

export default NotFoundComponent