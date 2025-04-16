import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#89afd9' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MonApp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link 3</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                                Actions
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Ajouter</a></li>
                                <li><a className="dropdown-item" href="#">Supprimer</a></li>
                                <li><a className="dropdown-item" href="#">Modifier</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
