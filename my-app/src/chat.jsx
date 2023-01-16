import React from "react"
import Form from "./message-form"
import Message from "./message"

const DATA = []

function Chat() {

    const [messages, setMessage] = React.useState(DATA)

    const sendMessage = (newMessage) => {
        setMessage([...messages, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

    const messageList = messages.map((e, i) => { 
        DATA[i] = e
        if (e.received === "true"){
            return (
                <blockquote
                    key={e.id}
                >
                    <Message
                        name={e.name}
                        id={e.id}
                        received={e.received}
                    />
                </blockquote>
            )
        } else {
            return  (
                <div
                    key={e.id}
                >
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
        <div id="chat">
            <div className="messages">
                {messageList}
            </div>
            
            <Form sendMessage={sendMessage}/>
        </div>
    )
}

export default Chat