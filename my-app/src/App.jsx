import React from "react"
import NavBar from "./nav-bar"
import SideBar from "./side-bar"
import Main from "./main"
import ChatList from "./chat-list"

function App() {
    return (
        <div className="d-flex">
            {/* <NavBar /> */}
            {/* <SideBar /> */}
            <ChatList />
            <Main />
        </div>
    )
}

export default App