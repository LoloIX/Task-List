import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

function Main() {
    return (
        <div id="main">
            <ChatList />
            <MessageList />
        </div>
    )    
}

export default Main