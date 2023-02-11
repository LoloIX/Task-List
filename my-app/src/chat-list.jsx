import React, { useState } from "react"
import Chat from "./chat"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsis, faUsers, faMagnifyingGlass, faCamera, faXmark } from "@fortawesome/free-solid-svg-icons"

const membersAddedStoraged = []

function ChatList(props) {
    const [showModal, setShow] = useState(false)

    const [membersAdded, addMemeber] = useState(membersAddedStoraged)

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
    
    const printMembersAdded = membersAdded.map((e) => {
        return (
            <li key={`member-${nanoid()}`}>
                <p>{e}</p>
                <FontAwesomeIcon
                    onClick={() => {
                        let copy = [...membersAdded]
                        let index = copy.indexOf(e)
                        copy.splice(index, 1)

                        addMemeber([...copy])
                    }}
                    icon={faXmark} />
            </li>
        )
    })

    const handleShowModal = () => setShow(true)

    const handleCloseModal = () => setShow(false)

    const handlerAddMemeber = (e) => {
        e.preventDefault()
        if (e.target[0].value === "") return
        
        addMemeber([...membersAdded, e.target[0].value])
        e.target[0].value = ""
    }

    return (
        <div id="side">
            <span
                className="group__options"
                show={`${showModal}`}
            >
                <div>
                    <div className="group__info">
                        <div>
                            <FontAwesomeIcon icon={faCamera}/>
                        </div>
                        <form>
                            <input 
                                placeholder="Group name"
                            />
                        </form>
                    </div>
                    <div className="group__add__members">
                        <p>
                            Add Members
                        </p>
                        <form
                            className="group__search__bar"
                            onSubmit={handlerAddMemeber}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input placeholder="Search"/>
                        </form> 
                    </div>
                    <ul className="group__members__found">
                        {printMembersAdded}
                    </ul>
                </div>
                <div className="modal" onClick={handleCloseModal}></div>
            </span>
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