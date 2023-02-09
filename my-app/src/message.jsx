import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

function Message(props) {
    return (
        <div>
            <div className="msg">
                <p>{props.id}</p>
                <p>{props.string}</p>
            </div>
            <FontAwesomeIcon icon={faCircleUser} />
        </div>
    )
}

export default Message