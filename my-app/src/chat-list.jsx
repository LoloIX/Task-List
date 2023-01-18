import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faEllipsisVertical, faUserGroup } from "@fortawesome/free-solid-svg-icons"

function ChatList() {
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
                            <FontAwesomeIcon icon={faUserGroup} />
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
                    <input />
                </div>
                <div id="chat__list">
                    <div className="chat">
                        Chat 1
                    </div>
                    <div className="chat">
                        Chat 2
                    </div>
                    <div className="chat">
                        Chat 3
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList