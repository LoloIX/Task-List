import React from "react"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var peer = new Peer(null, {debug: 2})
var conn

function Form(prop) {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")

    peer.on('open', () => {
        console.log("ID: " + peer.id)
    })
    
    peer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
    
        c.on('data', (data) => {
            const newMessage = {id: `msg-${nanoid()}`, name: data, received: "true"}
            prop.sendMessage(newMessage)
            console.log("Data received: " + data)
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target[0].value

        if (name === "") return
        
        const newMessage = {id: `msg-${nanoid()}`, name, received: "false"}
        prop.sendMessage(newMessage)
        console.log("Sent: " + name)
        conn.send(name)

        e.target[0].value = ""
    }

    const connect = () => {
        conn = peer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })

        conn.on('data', (data) => {
            console.log("Data received: " + data)
            
            const newMessage = {id: `msg-${nanoid()}`, name: data, received: "true"}
            prop.sendMessage(newMessage)
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

export default Form