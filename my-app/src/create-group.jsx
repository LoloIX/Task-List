import React from "react"
import { nanoid } from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCamera, faXmark } from "@fortawesome/free-solid-svg-icons"

function PopUpCreateGroup(props) {
    const [groupName, changeName] = React.useState("")
    const [membersAdded, addMemeber] = React.useState([])
    
    const printMembersAdded = membersAdded.map((e) => {
        return (
            <li key={`member-${nanoid()}`}>
                <p>{e}</p>
                <FontAwesomeIcon
                    onClick={() => {
                        let copy = [...membersAdded]
                        let index = copy.indexOf(e)
                        copy.splice(index, 1)

                        addMemeber([...copy])
                    }}
                    icon={faXmark} />
            </li>
        )
    })

    console.log(membersAdded)

    const closeModal = () => {props.setShow(false); addMemeber([])}

    const handlerAddMemeber = (e) => {
        e.preventDefault()
        if (e.target[0].value === "") return
        
        addMemeber([...membersAdded, e.target[0].value])
        e.target[0].value = ""
    }

    const handleChangeName = (e) => {changeName(e.target.value) }

    let groupMembersCheck = (membersAdded.length >= 2) ? "" : "incomplete"
    let groupNameCheck = (groupName !== "") ? "" : "incomplete"

    return (
        <span
            className="group__options"
            show={`${props.showModal}`}
        >
            <div>
                <div className="group__info">
                    <div>
                        <FontAwesomeIcon icon={faCamera}/>
                    </div>
                    <form>
                        <input 
                            className={groupNameCheck}
                            placeholder="Group name"
                            value={groupName}
                            onChange={handleChangeName}
                        />
                    </form>
                </div>
                <div className="group__add__members">
                    <p>Add Members</p>
                    <form
                        className="group__search__bar"
                        onSubmit={handlerAddMemeber}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input className={groupMembersCheck} placeholder="Search"/>
                    </form> 
                </div>
                <ul className="group__members__found">
                    {printMembersAdded}
                </ul>
                <button
                    className={groupMembersCheck + " " + groupNameCheck}
                    onClick={() => {
                        if (membersAdded.length < 2 || groupName === "") return
                        props.save({members: [...membersAdded], name: groupName, group: true})
                        closeModal()
                    }}
                >Save Group</button>
            </div>
            <div className="modal" onClick={closeModal}></div>
        </span>
    )
}

export default PopUpCreateGroup