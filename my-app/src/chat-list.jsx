import React from "react"

function ChatList() {
    return (
        <div id="side">
            <header>
                <div>
                    <div className="profile__photo">
                        photo
                        <img></img>
                    </div>
                </div>
                <div>
                    <div className="chat__options">
                        <div>groups</div>
                        <div>three dots</div>
                    </div>
                </div>
            </header>
            <div>
                <div id="search__bar"> </div>
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