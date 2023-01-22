import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const messagesStorage = []

function Main() {
    const [data, setData] = React.useState(messagesStorage)
    
    return (
        <div id="main">
            <ChatList messagesStorage={data} />
            <MessageList messagesStorage={data} setData={setData}/>
        </div>
    )    
}

export default Main