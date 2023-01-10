import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight } from "@fortawesome/free-solid-svg-icons"

function Form(props) {
    const [name, setName] = React.useState("")

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addMessage(name)
        setName("")
    }

    return (
        <form onSubmit={handleSubmit} className="form-msg">
            <input
                type="text"
                className="input-msg"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn-msg">
                <FontAwesomeIcon icon={faCircleRight} />
            </button>
        </form>
    )
}

export default Form