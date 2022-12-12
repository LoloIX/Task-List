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

console.log(tbody)

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
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

            if (j < InitialDay && i === 0 || days > maxDays) {
                td.innerText = ""
            } else {
                days++
            }

            row.append(td)
        }

        tbody[0].append(row)
    }
}

createCalendar(11, 2022)