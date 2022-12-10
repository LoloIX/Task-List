date = new Date()

let week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
]

let days = []

for (let daysCount = 0; daysCount <= 365; daysCount++) {
    let index = daysCount - (Math.floor(daysCount / 7) * 7)
    days.push(week[index])
}

console.log(days)

let January = days.splice(0, 31)
let Febuary = days.splice(0, 28)
let March = days.splice(0, 31)
let April = days.splice(0, 30)
let May = days.splice(0, 31)
let June = days.splice(0, 30)
let July = days.splice(0, 31)
let August = days.splice(0, 31)
let September = days.splice(0, 30)
let October = days.splice(0, 31)
let November = days.splice(0, 30)
let December = days.splice(0, 31)

let year = {
    "January": January,
    "Febuary": Febuary,
    "March": March,
    "April": April,
    "May": May,
    "June": June,
    "July": July,
    "August": August,
    "September": September,
    "October": October,
    "November": November,
    "December": December
}