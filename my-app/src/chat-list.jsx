import React from "react"
import Chat from "./chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsisVertical, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function ChatList(props) {
    const chats = [
        {
            id: "person 1",
            messages: props.chatsStorage
        },
        {
            id: "person 2",
            messages: [
                {
                    string: "Hi. how are you?",
                    id: "You"
                },
                {
                    string: "fine, thanks you",
                    id: "Person 2"
                },
                {
                    string: "and you?",
                    id: "Person 2"
                },
                {
                    string: "everything is fine, thanks you",
                    id: "You"
                },
                {
                    string: "I'm you owowowowo",
                    id: "You"
                }
            ]
        },
        {
            id: "person 3",
            messages: [
                {
                    string: "Hi. how are you?",
                    id: "You"
                },
                {
                    string: "fine, thanks you",
                    id: "Person 3"
                },
                {
                    string: "and you?",
                    id: "Person 3"
                },
                {
                    string: "everything is fine, thanks you",
                    id: "You"
                },
                {
                    string: "I'm person 3 blablalblasdasdas. But we have a problem here. If this is too long this will break AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                    id: "Person 3"
                }
            ]
        }
    ]

    console.log(chats[0].messages)    
    console.log(props.chatsStorage)    

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
                    <div className="chat__options">
                        <div className="groups">
                            <FontAwesomeIcon icon={faUsers} />
                            <span></span>
                        </div>
                        <div className="options__menu">
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