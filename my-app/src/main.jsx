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

    const send = (message) => {
        message.receiver = conn.peer
        message.sender = yourpeer.id
        conn.send(message)

        message.yours = true
        setData(message)
    }

    // WE NEED THIS TEMPORARILY
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    
    const connect = () => {
        conn = yourpeer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })

        conn.on('data', (data) => {
            data.yours = (data.sender === yourpeer.id)
            setData(data)
            console.log("Data received: " + data.string)
            c.close()
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
            THIS IS TEMPORARILY
            <div>
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
            THIS IS TEMPORARILY
        </div>
    )    
}

export default Main