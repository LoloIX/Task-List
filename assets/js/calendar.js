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
let quests = [

]

let i = -1
let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()

let currentDate = document.getElementById("CurrentDate")
let tbody = document.getElementsByTagName("tbody")
let span = $('#daily-quests')

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
}

function dailyQuest (event) {
    
    i++
    let il = i
    quests[il] = {name: "", check: false, expanded: false, data: []}

    let $task = $(`
        <li>
            <div class="d-flex">
                <i class="check ${quests[il].check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                <p contenteditable="true"></p>
            </div>
            <span class="options hidden">
                <button class="text-btn btn-addSubtask">Add subtask</button>
                <button class="text-btn btn-delete">Delete</button>
            </span>
            <button class="btn btn-expand">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <button class="btn btn-expand ${(quests[il].data.length > 0) ? "" : "d-none"}">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <div class="hidden"></div>
        </li>
    `)

    let text = $task.find('div:first-child:not(.subtask) > p')

    text.on('focus', function() {
        var selection = window.getSelection()
        var range = document.createRange()

        range.selectNodeContents(this)

        selection.removeAllRanges()
        selection.addRange(range)
    })
    
    text.focus()

    text.keydown((e) => {
        if (e.keyCode === 13) {
            quests[il].name = text[0].innerText
            text.attr('contenteditable', 'false')
        }
    })

    text.blur(() => {
        text.attr('contenteditable', 'false')
        text[0].innerText = quests[il].name
    })

    span.find('ul').append($task)
    console.log(quests)
    console.log(event)
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
            td.addEventListener("click", dailyQuest)
            
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