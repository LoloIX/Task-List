import React from "react"
import Form from "./message-form"
import Message from "./message"
import { nanoid } from "nanoid"

const DATA = []
var peer = new Peer(null, {debug: 3})

function Chat() {

    const [inputLocalPeerId, setLocalValue] = React.useState("")
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    const [messages, setMessage] = React.useState(DATA)

    peer.on('open', id => {
        setLocalValue(id)
        console.log("ID: " + peer.id)
    })

    peer.on('conection', (c) => {
        c.on('open', () => {
            console.log("somene connect me")
            c.send("wolaaaa")
        })

        console.log("conected to: " + c.peer)

        conn.on('data', (data) => {
            console.log("Data recieved")
            addMessage(data)
        })
    })

    const SendMessage = () => {
        const conn = peer.connect(inputRemotePeerId, {reliable: true})
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })
        conn.on('data', (data) => {
            addMessage(data)
        })
    }

    const addMessage = (name) => {
        console.log("im working")
        const newMessage = {id: `msg-${nanoid()}`, name}
        setMessage([...messages, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

    const messageList = messages.map((e, i) => { 
        DATA[i] = e
        return (
        <Message
            name={e.name}
            id={e.id}
            key={e.id}
        />
    )})

    const handleOnChange = (elem) => {
        setRemoteValue(elem.target.value)
    }

    return (
        <div id="chat">
            <div className="messages">
                {messageList}
                <input 
                    value={inputLocalPeerId}
                />
                <div>
                    <input 
                        value={inputRemotePeerId}
                        onChange={handleOnChange}
                    />

                    <button
                        onClick={SendMessage}
                    >
                        Connect
                    </button>
                </div>
            </div>
            
            <Form addMessage={addMessage}/>
        </div>
    )
}

export default Chat