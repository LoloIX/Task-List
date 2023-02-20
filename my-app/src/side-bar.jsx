import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderOpen, faCalendarDays, faMessage, faAddressBook, faGear } from "@fortawesome/free-solid-svg-icons"

function SideBar() {
    return (
        <span id="side-bar">
            <menu>
                <li>
                    <a href="works.html"><div>
                        <FontAwesomeIcon icon={faFolderOpen} />
                        <h3>Works</h3>
                    </div></a>
                    <a href="calendar.html"><div>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <h3>Calendar</h3>
                    </div></a>
                </li>
                <li>
                    <a href="messages.html"><div style={{backgroundColor: "var(--half-dark)", borderRadius: "10px"}}>  
                        <FontAwesomeIcon icon={faMessage} />
                        <h3>Messages</h3>
                    </div></a>
                    <div>
                        <FontAwesomeIcon icon={faAddressBook} />
                        <h3>Contact</h3>
                    </div>
                </li>
                <li>
                    <div>
                        <FontAwesomeIcon icon={faGear} />
                        <h3>settings</h3>
                    </div>
                </li>
            </menu>
        </span>
    )
}

export default SideBar