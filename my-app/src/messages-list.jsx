import React from "react"
import { nanoid } from "nanoid"
import Form from "./message-form"
import Message from "./message"

const messagesStorage = []

function MessagesList(props) {
    const [messages, addMessage] = React.useState(messagesStorage)

    const sendMessage = (newMessage) => {
        addMessage([...messages, newMessage])
        props.setData([...messages, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

    const printMessages = messages.map((e, i) => {
        messagesStorage[i] = e

        let received = e.sendedBy === "You"
        if (received !== true){
            return (
                <blockquote key={`msg-${nanoid()}`}  >
                    <Message
                        string={e.string}
                        id={e.id}
                    />
                </blockquote>
            )
        } else {
            return  (
                <div key={`msg-${nanoid()}`} >
                    <Message
                        string={e.string}
                        id={e.id}
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