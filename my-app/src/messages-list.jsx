import React from "react"
import { nanoid } from "nanoid"
import Form from "./msg-groups-form"
import Message from "./message"

function MessagesList(props) {
    const sendMessage = (newMessage) => {
        props.setData([...props.messagesStorage, newMessage])
        
        let elem = document.getElementsByClassName("messages")[0]
        elem.scroll(0, elem.scrollHeight)
    }

    const printMessages = props.messagesStorage.map((e, i) => {
        props.messagesStorage[i] = e

        if (e.receiver !== null){
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