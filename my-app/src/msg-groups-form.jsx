import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var yourpeer = new Peer(null, {debug: 2})
var conn

function Form(props) {

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

    if (props.chatOpen?.members !== undefined) {
        var groupPeer = new Peer(props.chatOpen.groupTitle, {debug: 2})
        var groupSenderPeer = new Peer(`${props.name}-helper`, {debug: 2})

        props.members.map((e) => {
            conn = groupPeer.connect(e, {receiver: true})
            conn.on('open', () => {
                console.log("connected to: " + conn.peer)
            })
            
            conn.on('data', (data) => {
                const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: true}
                props.sendMessage(newMessage)
                console.log("Data received: " + data.string)
            })
            
            conn.on('close', () => {
                console.log("connection closed")
            })
        })
        props.openChat({})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (e.target[0].value === "") return
        
        const newMessage = {string: e.target[0].value, sender: yourpeer.id, groupName: props.chatOpen.groupName , yours: true, group: true}
        props.sendMessage(newMessage)

        Object.keys(groupPeer.connections).map((e) => {
            let newconn = groupSenderPeer.connect(e, {reliable: true})

            newconn.on('open', () => {
                newconn.send(newMessage)
                console.log("Send: " + newMessage.string)
            })
        })

        e.target[0].value = ""
    }

    return (
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
    )
}

export default Form