import React from "react"
import Chat from "./chat"
import PopUpCreateGroup from "./create-group"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsis, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const [showModal, setShow] = React.useState(false)

    const printChats = props.messagesStorage.map((e) => {
        return (
            <Chat
                message={e}
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