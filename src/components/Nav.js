import React from 'react';

function Nav() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="#home" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                    <a href="#services" className="nav-link">Services</a>
                </li>
                <li className="nav-item">
                    <a href="#contact" className="nav-link">Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
