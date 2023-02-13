import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Chat(props) {
    return (
        <div>
            <div>
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div>
                <h3>{props.name}</h3>
                <p>{props.sender}: {props.lastMsg}</p>
            </div>
        </div>
    )
}

export default Chat