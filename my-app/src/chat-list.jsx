import React from "react"
import Chat from "./chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsisVertical, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const chatsList = [
    {
        name: "person 1",
        id: "person-1-id",
        messages: [
            {
                string: "Hi. how are you?",
                sendedBy: "You"
            },
            {
                string: "fine, thanks you",
                sendedBy: "Person 1"
            },
            {
                string: "and you?",
                sendedBy: "Person 1"
            },
            {
                string: "everything is fine, thanks you",
                sendedBy: "You"
            },
            {
                string: "I'm person 1 nyasuuuuuuuu",
                sendedBy: "Person 1"
            }
        ]
    },
    {
        name: "person 2",
        id: "person-2-id",
        messages: [
            {
                string: "Hi. how are you?",
                sendedBy: "You"
            },
            {
                string: "fine, thanks you",
                sendedBy: "Person 2"
            },
            {
                string: "and you?",
                sendedBy: "Person 2"
            },
            {
                string: "everything is fine, thanks you",
                sendedBy: "You"
            },
            {
                string: "I'm you owowowowo",
                sendedBy: "You"
            }
        ]
    },
    {
        name: "person 3",
        id: "person-3-id",
        messages: [
            {
                string: "Hi. how are you?",
                sendedBy: "You"
            },
            {
                string: "fine, thanks you",
                sendedBy: "Person 3"
            },
            {
                string: "and you?",
                sendedBy: "Person 3"
            },
            {
                string: "everything is fine, thanks you",
                sendedBy: "You"
            },
            {
                string: "I'm person 3 blablalblasdasdas",
                sendedBy: "Person 3"
            }
        ]
    }
]

function ChatList() {
    const [chats, addNewChat] = React.useState(chatsList)

    const printChats = chats.map((e, i) => {
        chatsList[i] = e
        let lastMessageIndex = (e.messages.length - 1)
        return (
            <Chat
                name={e.name}
                key={e.id}
                id={e.id}
                sendedBy={e.messages[lastMessageIndex].sendedBy}
                lastMsg={e.messages[lastMessageIndex].string}
            />
        )
    })
    console.log(printChats)

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