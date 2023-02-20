import React from "react"

function Message(props) {
    return (
        <div className="msg">
            <p className="msg__sender">{props.sender}</p>
            <p>{props.string}</p>
        </div>
    )
}

export default Message