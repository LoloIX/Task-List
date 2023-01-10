import React from "react"

function Message(props) {
    return (
        <div className="msg" id={props.id}>
            <p>{props.name}</p>
        </div>
    )
}

export default Message