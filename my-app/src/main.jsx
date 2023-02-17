import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const messagesStorage = []
var yourpeer = new Peer(null, {debug: 2})

yourpeer.on('open', () => {
    console.log("ID: " + yourpeer.id)
})

function Main() {
    const [data, setData] = React.useState(messagesStorage)
    const [chatOpen, openChat] = React.useState({})
    console.log(chatOpen)
    yourpeer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
        
        c.on('data', (data) => {
            data.yours = (data.sender === yourpeer.id)
            setData(data)
            console.log("Data received: " + data.string)
            c.close()
        })
    })

    return (
        <div id="main">
            <ChatList messagesStorage={data} openChat={openChat} />
            <MessageList messagesStorage={data} setData={setData} chatOpen={chatOpen} openChat={openChat} yourpeer={yourpeer}/>
        </div>
    )    
}

export default Main