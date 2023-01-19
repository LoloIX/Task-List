import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsisVertical, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const chatsList = []

function ChatList() {
    const [chats, addNewChat] = React.useState(chatList)

    const printChats = chats.map((e, i) => {
        chatsList[i] = e
        
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
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 1</h3>
                            <p>person 1: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 2</h3>
                            <p>person 2: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 3</h3>
                            <p>person 3: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 1</h3>
                            <p>person 1: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 2</h3>
                            <p>person 2: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 3</h3>
                            <p>person 3: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 1</h3>
                            <p>person 1: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 2</h3>
                            <p>person 2: message</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div>
                            <h3>person 3</h3>
                            <p>person 3: message</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList