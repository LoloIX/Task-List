import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

function PrivateForm(props) {
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (e.target[0].value === "") return

        const newMessage = {string: e.target[0].value, group: false}
        
        props.send(newMessage)
        
        e.target[0].value = ""
    }
    
    return (
        <form onSubmit={handleSubmit} className="form-msg">
            <input
                className="input-msg"
                type="text"
                autoComplete="off"
                placeholder="Write a message..."
            />
            
            <button type="submit" className="btn-msg">
                <FontAwesomeIcon icon={faCircleRight} />
            </button>
        </form>
    )
}

export default PrivateForm