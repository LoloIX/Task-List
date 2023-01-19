import React from "react"
import { nanoid } from "nanoid"
import Form from "./message-form"
import Message from "./message"

const messagesStorage = []

function MessagesList() {

    const [messages, setMessage] = React.useState(messagesStorage)

    const sendMessage = (newMessage) => {
        setMessage([...messages, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

    const printMessages = messages.map((e, i) => { 
        messagesStorage[i] = e
        console.log(messagesStorage)
        let received = e.sendedBy === "You"
        if (received !== true){
            return (
                <blockquote key={`msg-${nanoid()}`}  >
                    <Message
                        string={e.string}
                    />
                </blockquote>
            )
        } else {
            return  (
                <div key={`msg-${nanoid()}`} >
                    <Message
                        string={e.string}
                    />
                </div>
            )
        }
    })

    return (
        <div id="messages__list">
            <div className="messages">
                {printMessages}
            </div>
            <Form sendMessage={sendMessage}/>
        </div>
    )
}

export default MessagesList