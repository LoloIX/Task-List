import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var yourpeer = new Peer(null, {debug: 2})
var conn
var groupConn

function Form(props) {

    yourpeer.on('open', () => {
        console.log("ID: " + yourpeer.id)
    })
    
    yourpeer.on('connection', (c) => {
        conn = c
        console.log("conected to: " + c.peer)
        
        c.on('data', (data) => {
            const newMessage = {string: data.string, sender: data.sender, receiver: yourpeer.id, yours: false, group: true}
            props.sendMessage(newMessage)
            console.log("Data received: " + data.string)
            c.close()
        })
    })

    var groupPeer = new Peer(props.chatOpen.groupTitle, {debug: 2})
    var groupSenderPeer = new Peer(`${props.chatOpen.groupTitle}-helper`, {debug: 2})

    props.chatOpen.members.map((e) => {
        groupConn = groupPeer.connect(e, {receiver: true})
        groupConn.on('open', () => {
            console.log("connected to: " + groupConn.peer)
        })
        
        groupConn.on('data', (data) => {
            let newConn
            const newMessage = {string: data.string, sender: data.sender, groupName: props.chatOpen.groupName, yours: false, group: true}

            props.chatOpen.members.map((e) => {
                newConn = groupSenderPeer.connect(e, {receiver: true})

                newConn.on('open', () => {
                    newConn.send(newMessage)
                    console.log("Send :" + newMessage.string)
                    newConn.close()
                })
            })
        })
        
        groupConn.on('close', () => {
            console.log("connection closed")
        })
    })
    
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