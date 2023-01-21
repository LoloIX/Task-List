import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const chatsStorage = []

function Main() {
    const [data, setData] = React.useState(chatsStorage)
    
    return (
        <div id="main">
            <ChatList chatsStorage={data} />
            <MessageList chatsStorage={data} setData={setData}/>
        </div>
    )    
}

export default Main