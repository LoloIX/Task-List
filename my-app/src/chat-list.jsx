import React from "react"
import Chat from "./chat"
import PopUpCreateGroup from "./create-group"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsis, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const [showModal, setShow] = React.useState(false)
    
    const chatsPrinted = []
    props.messagesStorage.map((e) => {
        let repeat = false
        let chat = {}
    
        chat.lastMessage = e.string
        if (e.group) {
            chat.lastMessageSender = (e.yours) ? "You" : e.sender
            chat.title = e.groupName
            chat.icon = faUsers

            chatsPrinted.map((elem) => {
                if (e.groupName === elem.title) {
                    elem.lastMessage = e.string
                    elem.lastMessageSender = (e.yours) ? "You" : e.sender

                    repeat = true
                }
            })
        } else {
            if (e.yours) {
                chat.lastMessageSender = "You"
                chat.title = e.receiver

                chatsPrinted.map((elem) => {
                    if (e.receiver === elem.title) {
                        elem.lastMessage = e.string
                        elem.lastMessageSender = "You"

                        repeat = true
                    }
                })
            } else {
                chat.lastMessageSender = e.sender
                chat.title = e.sender

                chatsPrinted.map((elem) => {
                    if (e.sender === elem.title) {
                        elem.lastMessage = e.string
                        elem.lastMessageSender = e.sender

                        repeat = true
                    }
                })
            }
            chat.icon = faCircleUser
        }

        if (!repeat && chatsPrinted.length !== 0) {chatsPrinted.push(chat)}
        else if (chatsPrinted.length === 0) chatsPrinted.push(chat)
    })

    const printChats = chatsPrinted.map((e) => {
        return (
            <Chat
                icon={e.icon}
                lastMessage={e.lastMessage}
                lastMessageSender={e.lastMessageSender}
                title={e.title}
                key={`chat-${nanoid()}`}
                onClick={() => props.openChat({name: e.title, members: e.title, group: false})}
            />
        )
    })

    const handleShowModal = () => setShow(true)

    return (
        <div id="side">
            <PopUpCreateGroup showModal={showModal} setShow={setShow} save={props.openChat}/>
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