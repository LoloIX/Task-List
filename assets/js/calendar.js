let date = new Date()

let week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
]

let monthsLength = [31,28,31,30,31,30,31,31,30,31,30,31]

let year = []

const monthsCreator = (mlength) => {
    let days = []
    let InitialDay = year.length !== 0 ? week.indexOf(year[year.length - 1][year[year.length - 1].length - 1]) + 1 : 0

    for (let daysCount = InitialDay; daysCount < mlength+InitialDay; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        days.push(week[index])
    }

    year.push(days)
}

monthsLength.map((e) => {
    monthsCreator(e)
})

