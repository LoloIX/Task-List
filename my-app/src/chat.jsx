import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Chat(props) {
    return (
        <div>
            <div>
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <div>
                <h3>{props.title}</h3>
                <p>{props.lastMessageSender}: {props.lastMessage}</p>
            </div>
        </div>
    )
}

export default Chat