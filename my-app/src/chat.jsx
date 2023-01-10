import React from "react"
import Form from "./message-form"
import Message from "./message"
import { nanoid } from "nanoid"

const DATA = []

function Chat() {
    const addMessage = (name) => {
        const newMessage = {id: `msg-${nanoid()}`, name}
        setMessage([...messages, newMessage])
    }

    const [messages, setMessage] = React.useState(DATA)

    const messageList = messages.map((e, i) => { 
        DATA[i] = e
        return (
        <Message
            name={e.name}
            id={e.id}
            key={e.id}
        />
    )})

    return (
        <div id="chat">
            <div className="messages">
                {messageList}
            </div>
            
            <Form addMessage={addMessage}/>
        </div>
    )
}

export default Chat