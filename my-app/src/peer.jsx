import React from "react"

var peer = new Peer(null, {debug: 3})
var conn = null

function StartAConnection() {

    const [inputLocalPeerId, setLocalValue] = React.useState("")
    const [inputRemotePeerId, setRemoteValue] = React.useState("")
    const [msg, setMsg] = React.useState("")

    peer.on('open', id => {
        setLocalValue(id)
        console.log("ID: " + peer.id)
    })

    peer.on('connection', (c) => {
        console.log("conected to: " + c.peer)
        c.on('data', (data) => {
            console.log("Data recieved: " + data)
        })
    })

    const connect = () => {
        conn = peer.connect(inputRemotePeerId, {reliable: true})
        conn.on('open', () => {
            console.log("connected to: " + conn.peer)
            conn.send("HELLOO!!!")
        })
        conn.on('data', (data) => {
            addMessage(data)
        })
    }

    const handleOnChange = (elem) => {
        setRemoteValue(elem.target.value)
    }

    const handleChangeMsg = (elem) => {
        setMsg(elem.target.value)
    }

    const SendMessage = () => {
        conn.send(msg)
        console.log("Sent: " + msg)
    }

    return (
        <div className="Peer">
            <div>
                <p>Your PeerJS ID is: {inputLocalPeerId}</p>
            </div>
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