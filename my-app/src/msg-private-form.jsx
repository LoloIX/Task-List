import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var yourpeer = new Peer(null, {debug: 2})
var conn

function PrivateForm(props) {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")

    yourpeer.on('open', () => {
        console.log("ID: " + yourpeer.id)
    })
    
    yourpeer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
        
        c.on('data', (data) => {
            const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: false}
            props.sendMessage(newMessage)
            console.log("Data received: " + data.string)
        })
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (e.target[0].value === "") return

        const newMessage = {string: e.target[0].value, sender: yourpeer.id, receiver: conn.peer, yours: true, group: false}
        
        props.sendMessage(newMessage)
        conn.send(newMessage)
        console.log("Send: " + newMessage.string)
        
        e.target[0].value = ""
    }

    conn = yourpeer.connect(props.members[0], {reliable: true})

    conn.on('open', () => {
        console.log("connected to: " + conn.peer)
    })

    conn.on('data', (data) => {
        const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: false}
        props.sendMessage(newMessage)
        console.log("Data received: " + data.string)
    })
    
    const connect = () => {
        conn = yourpeer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })

        conn.on('data', (data) => {
            const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: false}
            props.sendMessage(newMessage)
            console.log("Data received: " + data.string)
        })
    }

    const handleOnChange = (elem) => {
        setRemoteValue(elem.target.value)
    }

    return (
        <div>
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
            <form onSubmit={handleSubmit} className="form-msg">
                <input
                    className="input-msg"
                    type="text"
                    autoComplete="off"
                    placeholder="Write a message..."
                />
                
                <button type="submit" className="btn-msg">
                    <FontAwesomeIcon icon={faCircleRight} />
                </button>
            </form>
        </div>
    )
}

export default PrivateForm