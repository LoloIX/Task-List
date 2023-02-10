import React, { useState } from "react"
import Chat from "./chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsis, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const [showModal, setShow] = useState(false)

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

    const handleShowModal = () => setShow(true)

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
                            onClick={handleShowModal()}
                        >
                            <FontAwesomeIcon icon={faUsers} style={{marginLeft: "7px"}}/>
                            <span className="group__options" show={show}>
                                <div className="group__add__members">
                                    <p>
                                        Add Members
                                    </p>
                                    <div className="group__search__bar">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        <input placeholder="Search"/>
                                    </div> 
                                </div>
                                <div className="group__members__found"></div>
                            </span>
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