
let January =[]
let Febuary = []
let March = []
let April = []
let May = []
let June = []
let July = []
let August = []
let September = []
let October = []
let November = []
let Decembe = []

let days = [
    "Sabado",
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes"
]
var daysCount = 0
const createCalendary = () => {
    for (daysCount = daysCount; daysCount < 31; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        January.push(days[index])
    }
    console.log(January)
    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 31; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        Febuary.push(days[index])
    }
    console.log(Febuary)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 34; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        March.push(days[index])
    }
    console.log(March)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 36; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        April.push(days[index])
    }
    console.log(April)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 32; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        May.push(days[index])
    }
    console.log(May)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 34; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        June.push(days[index])
    }
    console.log(June)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 37; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        July.push(days[index])
    }
    console.log(July)

    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 33; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        August.push(days[index])
    }
    console.log(August)
    
    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 35; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        September.push(days[index])
    }
    console.log(September)
    
    daysCount = daysCount - (Math.floor(daysCount / 7) * 7)
    for (daysCount = daysCount; daysCount < 31; daysCount++) {
        let index = daysCount - (Math.floor(daysCount / 7) * 7)
        October.push(days[index])
    }
    console.log(October)
}

createCalendary()

date = new Date()