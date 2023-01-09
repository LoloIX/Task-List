import React from "react"
import Form from "./message-form"
import Message from "./message"
import { nanoid } from "nanoid"
import { useState } from "react"

const DATA = []

function Chat() {
    const addMessage = (name) => {
        const newMessage = {id: `msg-${nanoid()}`, name}
        setMessage([...messages, newMessage])
    }

    const [messages, setMessage] = useState(DATA)

    const messageList = messages.map((e) => (
        <Message
            name={e.name}
            id={e.id}
            key={e.id}
        />
    ))

    return (
        <div id="chat">
            {messageList}
            <Form addMessage={addMessage}/>
        </div>
    )
}

export default Chat