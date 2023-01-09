import React from "react"
import Form from "./message-form"
import Message from "./message"
import { nanoid } from "nanoid"

function Chat() {
    const addMessage = (name) => {
        alert(name)
    }

    return (
        <div id="chat">
            <Message name="first message" id="msg-1"/>
            <Message name="second message" id="msg-2"/>
            <Message name="tirth message" id="msg-2"/>
            <Form addMessage={addMessage}/>
        </div>
    )
}

export default Chat