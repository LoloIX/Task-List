import React, { useState } from "react"

function Form() {
    const [name, setName] = useState("")

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setName("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-msg"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn-msg">
                Send
            </button>
        </form>
    )
}

export default Form