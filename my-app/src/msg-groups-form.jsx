import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var yourpeer = new Peer(null, {debug: 2})
var groupPeer = new Peer(null, {debug: 2})
var conn

function Form(prop) {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")

    yourpeer.on('open', () => {
        console.log("ID: " + yourpeer.id)
    })
    
    yourpeer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
    
        c.on('data', (data) => {
            const newMessage = {string: data.string, id: data.id}
            prop.sendMessage(newMessage)
            console.log("Data received: " + data.string)
        })
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const message = {string: e.target[0].value, id: yourpeer.id}
        
        if (message.string === "") return
        
        const newMessage = {string: message.string, sendedBy: "You", id: message.id}
        prop.sendMessage(newMessage)

        Object.keys(yourpeer.connections).map((e) => {
            let newconn = groupPeer.connect(e, {reliable: true})

            newconn.on('open', () => {
                console.log("Message sended to: " + e)
                newconn.send(message)
            })
            console.log("Sending message to: " + e)
        })

        e.target[0].value = ""
    }

    const connect = () => {
        conn = yourpeer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })

        conn.on('data', (data) => {
            console.log("Data received: " + data.string)
            
            const newMessage = {string: data.string, id: data.id}
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