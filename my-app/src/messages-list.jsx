import React from "react"
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
        if (e.received === "true"){
            return (
                <blockquote key={e.id} >
                    <Message
                        name={e.name}
                        id={e.id}
                        received={e.received}
                    />
                </blockquote>
            )
        } else {
            return  (
                <div key={e.id} >
                    <Message
                        name={e.name}
                        id={e.id}
                        received={e.received}
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