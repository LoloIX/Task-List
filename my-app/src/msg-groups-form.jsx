import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

var conn

function Form(props) {
    var groupConn
    var groupPeer = new Peer(props.chatOpen.name, {debug: 2})
    var groupSenderPeer = new Peer(`${props.chatOpen.name}-helper`, {debug: 2})

    groupPeer.on('open', () => {
        console.log("group open: " + groupPeer.id)

        props.chatOpen.members.map((e) => {
            groupConn = groupPeer.connect(e, {receiver: true})
            
            groupConn.on('open', () => {
                console.log("connected to: " + groupConn.peer)
            })
            
            groupConn.on('data', (data) => {
                let newConn
                const newMessage = {string: data.string, sender: data.sender, name: props.chatOpen.name}
                
                props.chatOpen.members.map((e) => {
                    newConn = groupSenderPeer.connect(e, {receiver: true})
                    
                    newConn.on('open', () => {
                        newConn.send(newMessage)
                        console.log("Send :" + newMessage.string)
                    })
                    
                    newConn.on('close', () => {
                        console.log("connection closed")
                    })
                })
            })
        })
    })
    groupSenderPeer.on('open', () => console.log("group open sender: " + groupSenderPeer.id))
    groupPeer.on('error', (e) => console.log(e))
    groupSenderPeer.on('error', (e) => console.log(e))
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (e.target[0].value === "") return
        
        const newMessage = {string: e.target[0].value, sender: props.yourpeer.id, receiver: props.chatOpen.name, group: true}
        
        conn.send(newMessage)

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