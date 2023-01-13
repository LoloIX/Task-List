import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

function Form(prop) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target[0].value

        if (name === "") return

        prop.addMessage(name)

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

export default Form