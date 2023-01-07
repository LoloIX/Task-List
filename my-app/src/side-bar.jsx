import React from "react"

function SideBar() {
    return (
        <span id="side-bar">
            <menu>
                <li>
                    <a href="today.html"><div>
                        <i className="fa-solid fa-calendar-day"></i>
                        <h3>Today</h3>
                    </div></a>
                    <a href="calendar.html"><div>
                        <i className="fa-regular fa-calendar-days"></i>
                        <h3>Calendar</h3>
                    </div></a>
                </li>
                <li>
                    <a href="messages.html"><div style={{backgroundColor: "var(--half-dark)", borderRadius: "10px"}}>  
                        <i className="fa-regular fa-message"></i>
                        <h3>Messages</h3>
                    </div></a>
                    <div>
                        <i className="fa-regular fa-address-book"></i>
                        <h3>Contact</h3>
                    </div>
                </li>
                <li>
                    <div>
                        <i className="fa-solid fa-gear"></i>
                        <h3>settings</h3>
                    </div>
                </li>
            </menu>
        </span>
    )
}

export default SideBar