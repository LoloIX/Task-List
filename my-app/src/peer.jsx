import React from "react"

var peer = new Peer(null, {debug: 2})
var conn = null

peer.on('open', () => {
    console.log("ID: " + peer.id)
})

peer.on('connection', (c) => {
    conn = c
    console.log(conn)
    console.log("conected to: " + c.peer)
    c.on('data', (data) => {
        console.log("Data recieved: " + data)
    })
})

function StartAConnection() {
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    const [msg, setMsg] = React.useState("")

    const connect = () => {
        conn = peer.connect(inputRemotePeerId, {reliable: true})
        console.log(conn)
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
        })
    }

    const handleOnChange = (elem) => {
        setRemoteValue(elem.target.value)
    }

    const handleChangeMsg = (elem) => {
        setMsg(elem.target.value)
    }

    const SendMessage = () => {
        console.log(conn)
        conn.send(msg)
        console.log("Sent: " + msg)
    }

    return (
        <div className="Peer">
            <div>
                <p>Connect to: </p>
                <input 
                    value={inputRemotePeerId}
                    onChange={handleOnChange}
                />

                <button
                    onClick={connect}
                >
                    Connect
                </button>
            </div>
            <div>
                <input
                    value={msg}
                    onChange={handleChangeMsg}
                />
                <button
                    onClick={SendMessage}
                >
                    Send message

                </button>
            </div>
        </div>
    )
}

export default StartAConnection