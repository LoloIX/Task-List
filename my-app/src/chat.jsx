import React from "react"
import Form from "./message-form"
import Message from "./message"
import { nanoid } from "nanoid"

const DATA = []

function Chat() {

    const [messages, setMessage] = React.useState(DATA)

    const sendMessage = (name) => {
        const newMessage = {id: `msg-${nanoid()}`, name}
        setMessage([...messages, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

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
                {/* <StartAConnection sendMessage={sendMessage}/> */}
            </div>
            
            <Form sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat