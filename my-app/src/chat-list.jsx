import React from "react"
import Chat from "./chat"
import PopUpCreateGroup from "./create-group"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsis, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const [showModal, setShow] = React.useState(false)
    let chatsPrinted = []

    props.messagesStorage.map((e) => {
        let repeat = false
        let chat = {}
    
        if (e.group) {
            chat.lastMessage = e.string
            chat.lastMessageSender = (e.yours) ? "You" : e.sender
            chat.title = e.groupName
            chat.icon = faUsers

            chatsPrinted.map((elem) => {
                if (elem.title === e.groupName) {
                    repeat = true
                    elem.lastMessage = e.string
                    elem.lastMessageSender = (e.yours) ? "You" : e.sender
                }
            })

        } else {
            if (e.yours) {
                chat.lastMessage = e.string
                chat.lastMessageSender = "You"
                chat.title = e.receiver

                chatsPrinted.map((elem) => {
                    if (e.receiver === elem.title) {
                        repeat = true
                        elem.lastMessage = e.string
                        elem.lastMessageSender = "You"
                    }
                })
                
            } else {
                chat.lastMessage = e.string
                chat.lastMessageSender = e.sender
                chat.title = e.sender

                chatsPrinted.map((elem) => {
                    if (e.sender === elem.title) {
                        repeat = true
                        elem.lastMessage = e.string
                        elem.lastMessageSender = e.sender
                    }
                })
            }
            chat.icon = faCircleUser
        }

        if (!repeat && chatsPrinted.length !== 0) {
            chatsPrinted.push(chat)
        } else if (chatsPrinted.length === 0) {
            chatsPrinted.push(chat)
        }
    })

    const printChats = chatsPrinted.map((e) => {
        return (
            <Chat
                icon={e.icon}
                lastMessage={e.lastMessage}
                lastMessageSender={e.lastMessageSender}
                title={e.title}
                key={`chat-${nanoid()}`}
            />
        )
    })

    const handleShowModal = () => setShow(true)

    return (
        <div id="side">
            <PopUpCreateGroup showModal={showModal} setShow={setShow} />
            <header>
                <div>
                    <div className="profile__photo">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                </div>
                <div>
                    <div 
                        className="chat__options"
                    >
                        <div 
                            className="groups"
                            title="New group"
                            onClick={handleShowModal}
                        >
                            <FontAwesomeIcon icon={faUsers}/>
                        </div>
                        <div 
                            className="options__menu"
                            title="Menu"
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <div id="search__bar">
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input placeholder="Search"/>
                    </div>
                </div>
                <div id="chat__list">
                    {printChats}
                </div>
            </div>
        </div>
    )
}

export default ChatList