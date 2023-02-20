import React from "react"
import Main from "./main"
import SideBar from "./side-bar"
import NavBar from "./nav-bar"

function App() {
    return (
        <div className="d-flex">
            <NavBar />
            <SideBar />
            <Main />
        </div>
    )
}

export default App