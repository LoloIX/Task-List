import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const messagesStorage = []
const groups = []

function Main() {
    const [data, setData] = React.useState(messagesStorage)
    const [NewGroupMembers, createGroup] = React.useState(groups)

    return (
        <div id="main">
            <ChatList messagesStorage={data} createGroup={createGroup} />
            <MessageList messagesStorage={data} setData={setData} NewGroupMembers={NewGroupMembers} />
        </div>
    )    
}

export default Main