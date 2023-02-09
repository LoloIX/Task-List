import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var peer = new Peer(null, {debug: 2})
var conn
var newPeer

function Form(prop) {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")

    peer.on('open', () => {
        console.log("ID: " + peer.id)
    })
    
    peer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
    
        c.on('data', (data) => {
            const newMessage = {string: data, id: c.peer}
            prop.sendMessage(newMessage)
            console.log("Data received: " + data)
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const string = e.target[0].value

        if (string === "") return
        
        const newMessage = {string, sendedBy: "You", id: peer.id}
        prop.sendMessage(newMessage)
        console.log("Sent: " + string)
        conn.send(string)

        e.target[0].value = ""
    }

    const connect = () => {
        newPeer = new Peer(null, {debug: 2})

        newPeer.on('open', () => {
            console.log("NewPeer ID: " + newPeer.id)

            conn = newPeer.connect(inputRemotePeerId, {reliable: true})
            
            conn.on('open', () => {
                console.log("connected to: " + conn.peer)
            })
    
            conn.on('data', (data) => {
                console.log("Data received: " + data)
                
                const newMessage = {string: data, id: conn.peer}
                prop.sendMessage(newMessage)
            })
        })

        newPeer.on('connection', (c) => {
            console.log("NewPeer connected to: " + c.peer)
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