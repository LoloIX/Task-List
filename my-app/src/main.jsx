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

    const recieve = (message) => {
        message.yours = (message.sender === yourpeer.id)

        if (message.yours && message.helper) return
        delete message.helper
        
        setData([...data, message])
        messagesStorage.push(message)
        console.log("Data received: " + message.string)
    }

    const send = (message) => {
        message.receiver = conn.peer
        message.sender = yourpeer.id
        console.log(yourpeer.connections)
        conn.send(message)

        message.yours = true
        setData([...data, message])
        messagesStorage.push(message)
        console.log("Send: " + message.string)
    }

    const onConnection = (connection) => {
        conn = connection
        console.log("conected to: " + connection.peer)
        
        connection.on('data', (message) => {
            recieve(message)
            if (message.helper) connection.close()
        })

        connection.on('close', () => {
            console.log("connection closed with: " + connection.peer)
        })
    }

    yourpeer.on('connection', (c) => {
        onConnection(c)
    })

    // WE NEED THIS TEMPORARILY
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    
    const connect = () => {
        onConnection(yourpeer.connect(inputRemotePeerId, {reliable: true}))
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