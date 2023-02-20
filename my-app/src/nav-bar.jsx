import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function NavBar() {
    return (
        <nav className="d-flex">
            <div id="menu-button">
                <input
                onClick={() => {
                    document.body.dataset.menu = document.body.dataset.menu === "true" ? "false" : "true"
                }} type="checkbox" id="menu-checkbox" />
                <label htmlFor="menu-checkbox" id="menu-label">
                    <div id="menu-text-bar"></div>
                </label>
            </div>
            
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    id="sort-input"
                    type="text"
                    autoComplete="off"
                />
            </div>
        </nav>
    )
}

export default NavBar