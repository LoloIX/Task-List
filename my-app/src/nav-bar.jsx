import React from "react"

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
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="sort-input" />
            </div>
        </nav>
    )
}

export default NavBar