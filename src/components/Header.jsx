import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Header = () => {
    return (
        <header className="top-bar">
            <div className="icons">
                <h1><FontAwesomeIcon className='edit' icon={faListCheck} /> ToDo ! </h1>
            </div>
        </header>
    );
};

export default Header;
