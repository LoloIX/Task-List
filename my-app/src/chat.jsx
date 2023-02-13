import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faUsers } from "@fortawesome/free-solid-svg-icons"

let chatsPrinted = []

function Chat(props) {
    let repeat = false
    
    if (props.message.group) {
        chatsPrinted.map((e) => {
            if (e.groupName === props.message.groupName) return repeat = true
        })
    } else {
        if (props.message.yours) {
            chatsPrinted.map((e) => {
                if (props.message.receiver === e.receiver) return repeat = true
            })
        } else {
            chatsPrinted.map((e) => {
                if (props.message.sender === e.sender) return repeat = true
            })
        }
    }

    if (!repeat) {
        chatsPrinted.push(props.message)
    }

    return (
        <div>
            <div>
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div>
                <h3>{props.message.sender}</h3>
                <p>{props.message.sender}: {props.message.string}</p>
            </div>
        </div>
    )
}

export default Chat