import React from "react"
import Main from "./main"
import ChatList from "./chat-list"

function App() {
    return (
        <div className="d-flex">
            <ChatList />
            <Main />
        </div>
    )
}

export default App