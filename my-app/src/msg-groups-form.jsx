import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var yourpeer = new Peer(null, {debug: 2})
var groupPeer = new Peer(null, {debug: 2})
var conn

function Form(props) {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")

    yourpeer.on('open', () => {
        console.log("ID: " + yourpeer.id)
    })
    
    yourpeer.on('connection', (c) => {
        conn = c
        // console.log("conected to: " + c.peer)
        
        c.on('data', (data) => {
            const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: true}
            props.sendMessage(newMessage)
            console.log("Data received: " + data.string)
            c.close()
        })
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (e.target[0].value === "") return

        let receiver
        Object.values(yourpeer.connections).map((e) => {
            if (e.length !== 0) receiver = e[0].peer
        })
        
        const newMessage = {string: e.target[0].value, sender: yourpeer.id, receiver, yours: true, group: true}
        props.sendMessage(newMessage)

        Object.keys(yourpeer.connections).map((e) => {
            let newconn = groupPeer.connect(e, {reliable: true})

            newconn.on('open', () => {
                newconn.send(newMessage)
                console.log("Send: " + newMessage.string)
            })
        })

        e.target[0].value = ""
    }

    const connect = () => {
        conn = yourpeer.connect(inputRemotePeerId, {reliable: true})
        
        conn.on('open', () => {
            // console.log("connected to: " + conn.peer)
        })

        conn.on('data', (data) => {
            console.log("Data received: " + data.string)
            const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: true}
            props.sendMessage(newMessage)
            conn.close()
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