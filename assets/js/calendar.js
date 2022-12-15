let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let quests = []

let i = -1
let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()

let currentDate = document.getElementById("CurrentDate")
let tbody = document.getElementsByTagName("tbody")
let span = $('#daily-quests')
let ul = span.find('ul')

const showSpan = () => {
    document.body.dataset.quests = "false"
}

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
}

const handlerSetInput = () => {
    document.body.dataset.quests = "true"
    setInput(false)
}

const dailyQuests = (quest) => {
    i++
    let il = i

    quests[il] = {
        name: quest.name,
        check: quest.check,
        expanded: quest.expanded,
        cycle: quest.cycle,
        data:[]
    }

    let $quest = $(`
        <li class="quest">
            <div>
                <i class="check ${quest.check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                <p title="${quest.name}">${quest.name}</p>
            </div>
            <div>
                <button class="btn addSubTask">
                    <i class="fa-regular fa-plus"></i>
                </button>
                <button class="btn delete">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <button class="btn btn-expand ${(quest.data?.length > 0) ? "" : "d-none"} ${quest.expanded ? "rotate" : ""}">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <div id=${il} class="hidden"></div>
        </li>
    `)

    $quest.find('.delete').click((e) => {
        $quest.remove()
        quests.splice(il, 1)
    })

    ul.append($quest)
}

const createCalendar = (month, year) => {
    currentDate.innerText = months[month] + " " + String (year)

    let InitialDay = (new Date(year, month)).getDay()
    let days = 1
    let maxDays = monthLength(month, year)
    
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr")

        for (let j = 0; j < 7; j++) {

            let td = document.createElement("td")

            td.innerText = days
            td.addEventListener("click", handlerSetInput)
            
            if (j < InitialDay && i === 0 || days > maxDays) {
                td.innerHTML = ""
            } else {
                days++
            }

            row.append(td)
        }

        tbody[0].append(row)
    }
}

const changeMonth = (bool) => {
    let num = sign = newMonth = 0

    if (bool) {
        num = 11
        sign = 1
    } else {
        sign = -1
        newMonth = 11
    }

    if (currentMonth === num) {
        currentYear += sign
        currentMonth = newMonth
    } else {
        currentMonth += sign
    }

    let save = tbody[0].children[0]

    tbody[0].innerHTML = ""

    tbody[0].append(save)

    createCalendar(currentMonth, currentYear)
}

createCalendar(currentMonth, currentYear)