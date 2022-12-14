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
let date = new Date()

let currentMonth = date.getMonth()
let currentYear = date.getFullYear()
let currentDate = document.getElementById("CurrentDate")

let tbody = document.getElementsByTagName("tbody")

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
}

function dailyQuest (element) {
    let span = document.getElementById("daily-quest")
    span.innerHTML = ""
    let $quest = document.createElement("div")
    $quest.setAttribute("class", "quest")
    
    span.append($quest)
    console.log(span)
    console.log(element)
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