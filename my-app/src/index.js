import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./css/styles.css"
import "./css/side-bar.css"
import "./css/menu-button.css"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

var peer = new Peer()

peer.on("open", (id) => {
    console.log("My peer ID is id: " + id)
})