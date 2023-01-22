import React from "react"
import Chat from "./chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsisVertical, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const chats = [
        {
            id: "person 1",
            messages: props.messagesStorage
        }
    ]  

    const printChats = chats.map((e) => {
        if (e.messages.length === 0) return

        let lastMessageIndex = (e.messages.length - 1)
        let sendedBy = e.messages[lastMessageIndex].sendedBy !== undefined ? e.messages[lastMessageIndex].sendedBy : e.messages[lastMessageIndex].id
        return (
            <Chat
                name={e.id}
                key={e.id}
                sendedBy={sendedBy}
                lastMsg={e.messages[lastMessageIndex].string}
            />
        )
    })

    return (
        <div id="side">
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
                        >
                            <FontAwesomeIcon icon={faUsers} />
                            <span></span>
                        </div>
                        <div 
                            className="options__menu"
                            title="Menu"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
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