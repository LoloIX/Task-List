import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Message(props) {
    return (
        <div>
            <div className="msg" id={props.id}>
                <p>{props.name}</p>
            </div>
            <FontAwesomeIcon icon={faCircleUser} />
        </div>
    )
}

export default Message