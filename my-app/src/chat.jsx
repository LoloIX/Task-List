import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faUsers } from "@fortawesome/free-solid-svg-icons"

let chatsPrintedStorage = []

function Chat(props) {
    const [chatsPrinted, addChat] = React.useState(chatsPrintedStorage)

    let repeat = false
    let chat = {}
    
    if (props.message.group) {
        chat.lastMessage = props.message.string
        chat.lastMessageSender = (props.message.yours) ? "You" : props.message.sender
        chat.title = props.message.groupName
        chat.icon = faUsers

        chatsPrinted.map((e, i) => {
            if (e.title === props.message.groupName) repeat = true
            chat.lastMessageSender = (i + 1 === chatsPrinted.length && e.yours) ? "You" : e.sender
            chat.lastMessage = e.string
        })
    } else {
        if (props.message.yours) {
            chat.lastMessage = props.message.string
            chat.lastMessageSender = "You"
            chat.title = props.message.receiver

            chatsPrinted.map((e) => {
                if (props.message.receiver === e.title) repeat = true
                chat.lastMessage = e.string
            })
        } else {
            chat.lastMessage = props.message.string
            chat.lastMessageSender = props.message.sender
            chat.title = props.message.sender

            chatsPrinted.map((e) => {
                if (props.message.sender === e.title) repeat = true
                chat.lastMessage = e.string
                chat.lastMessageSender = e.sender
            })
        }
        chat.icon = faCircleUser
    }

    console.log(chatsPrintedStorage)
    if (!repeat && chatsPrinted.length !== 0) {
        chatsPrintedStorage.push(chat)
        addChat([...chatsPrinted, chat])
        return (
            <div>
                <div>
                    <FontAwesomeIcon icon={chat.icon} />
                </div>
                <div>
                    <h3>{chat.title}</h3>
                    <p>{chat.lastMessageSender}: {chat.lastMessage}</p>
                </div>
            </div>
        )
    } else if (chatsPrinted.length === 0) {
        chatsPrintedStorage.push(chat)
        return (
            <div>
                <div>
                    <FontAwesomeIcon icon={chat.icon} />
                </div>
                <div>
                    <h3>{chat.title}</h3>
                    <p>{chat.lastMessageSender}: {chat.lastMessage}</p>
                </div>
            </div>
        )
    }

    return ""
}

export default Chat