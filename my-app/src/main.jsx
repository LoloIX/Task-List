import React from "react"
import MessageList from "./messages-list"
import ChatList from "./chat-list"

const messagesStorage = []

var yourpeer = new Peer(null, {debug: 2})
var conn

yourpeer.on('open', () => {
    console.log("ID: " + yourpeer.id)
})

function Main() {
    const [data, setData] = React.useState(messagesStorage)
    const [chatOpen, openChat] = React.useState({})
    
    const recive = (message) => {
        message.yours = (message.sender === yourpeer.id)
        setData([...data, message])
        console.log("Data received: " + message.string)
    }

    const send = (message) => {
        message.receiver = conn.peer
        message.sender = yourpeer.id
        conn.send(message)

        message.yours = true
        setData([...data, message])
        console.log("Send: " + message.string)
    }

    yourpeer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
        
        c.on('data', (message) => {
            recive(message)
        })
    })

    // WE NEED THIS TEMPORARILY
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    
    const connect = () => {
        conn = yourpeer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })

        conn.on('data', (message) => {
            recive(message)
        })

        conn.on('close', () => {
            console.log("connection closed")
        })
    }

    const handleOnChange = (elem) => {
        setRemoteValue(elem.target.value)
    }

    return (
        <div id="main">
            <ChatList messagesStorage={data} openChat={openChat} />
            <MessageList messagesStorage={data} chatOpen={chatOpen} send={send}/>
            {/* THIS IS TEMPORARILY */}
            <div style={{position: "absolute", bottom: "10px"}}>
                <p>Connect to: </p>
                <input 
                    value={inputRemotePeerId}
                    onChange={handleOnChange}
                />

                <button
                    onClick={connect}
                >
                    Connect
                </button>
            </div>
            {/* THIS IS TEMPORARILY */}
        </div>
    )    
}

export default Main