import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const messagesStorage = []

function Main() {
    const [data, setData] = React.useState(messagesStorage)
    const [chatOpen, openChat] = React.useState({})
    console.log(chatOpen)
    
    return (
        <div id="main">
            <ChatList messagesStorage={data} openChat={openChat} />
            <MessageList messagesStorage={data} setData={setData} chatOpen={chatOpen} openChat={openChat}/>
        </div>
    )    
}

export default Main