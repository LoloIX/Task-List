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
let storagedQuests = {
    1: [
        {
            "name": "a",
            "check": false,
            "cycle": ["0", "1", "2", "3", "4", "5", "6"],
            "data": []
        }
    ]
}

let i = -1
let days
let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()

let $currentDate = document.getElementById("CurrentDate")
let $arrowBtns = document.getElementsByClassName("text-btn")
let $tbody = document.getElementsByTagName("tbody")
let $buttons = document.getElementById("buttons")
let $span = document.getElementById("daily-quests")
let $ul = $span.querySelector("ul")

const setInput = () => {
    let $textBox = `
        <div class="input-quest">
            <input type="text" id="input-data" placeholder=" ">
            <label for="name">Quest name</label>
        </div>
    `
    $ul.insertAdjacentHTML('beforeend', $textBox)
    let $inputQuest = document.getElementsByClassName("input-quest")
    let $inputData = document.getElementById("input-data")

    $inputData.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            handlerAddTask(undefined, false)
            $inputQuest[0].setAttribute("deleting", "true")
            $inputQuest[0].remove()
        }
    })

    $inputData.addEventListener('blur', () => {
        if ($inputQuest[0].attributes?.deleting?.value !== "true") {
            $inputQuest[0].remove()
        }
    })

    $inputData.focus()
}

const showSpan = () => {
    document.body.dataset.quests = "false"

    refreshCalendar()
}

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
}

const handlerSetInput = (day) => {
    let findDate = $span.querySelector("h3")
    let $date = document.createElement("h3")

    document.body.dataset.quests = "true"

    if (findDate !== null) findDate.remove()

    $date.innerText = day + " " + $currentDate.innerText
    $span.prepend($date)
    
    refreshCalendar()

    handlerAddTask(storagedQuests[day], false)

    setInput(false)
}

const refreshList = () => {
    $ul.innerHTML = ""
                    
    let refreshList = quests
    quests = []
    i = -1
    
    handlerAddTask(refreshList, false)
}

const dailyQuests = (item) => {
    i++
    let il = i

    if (item === "placeholder") {quests.splice(il, 1); i--; return}

    quests.push({
        name: item.name,
        check: item.check,
        cycle: item.cycle !== undefined ? item.cycle : [],
        data:[]
    })
    
    let num = document.querySelector("#daily-quests h3").innerText.split(" ")[0]

    storagedQuests[num] = []
    storagedQuests[num].push(...quests)

    let $quest = $(`
        <li>
            <input type="checkbox" class="btn"></input>
            <div class="quest">
                <div>
                    <i class="check ${item.check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                    <p title="${item.name}">${item.name}</p>
                    <div>
                        <button class="btn addsubQuest">
                            <i class="fa-regular fa-plus"></i>
                        </button>
                        <button class="btn delete">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
                <div id=${il}></div>
            </div>
        </li>
    `)

    const addSubQuest = (subquest) => {
        let $subQuest = $(`
            <div draggable="true" class="subquest">
                <i class="check ${subquest.check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                <p title="${subquest.text}">${subquest.text}</p>
                <button class="btn delete" style="
                    margin-left: auto;
                    margin-right: 5px;
                ">
                    <i class="fa-solid fa-xmark" style="font-size: 22px;" ></i>
                </button>
            </div>
        `)

        let subCheck = $subQuest.find('.check')

        subCheck.hover(
            () => {subCheck.removeClass("fa-square").addClass("fa-square-check")},
            () => {
                if(!subquest.check) subCheck.addClass("fa-square")
            },
        )

        subCheck.click(() => {
            subCheck
                .removeClass("fa-square-check")
                .addClass("fa-square")
                .toggleClass("fa-regular fa-square fa-solid fa-square-check")

            subquest.check = !subquest.check

            questCheck
                .removeClass("fa-regular fa-square")
                .addClass("fa-solid fa-square-check")
                
            let hasFalseValue = quests[il].data.some((e) => {return e.check === false})

            if (hasFalseValue) {
                questCheck
                    .removeClass("fa-solid fa-square-check")
                    .addClass("fa-regular fa-square")
            }

            quests[il].check = !hasFalseValue
        })

        $subQuest.find('.delete').click(() => {
            $subQuest.remove()
            quests[il].data.splice(quests[il].data.indexOf(subquest), 1)
        })

        $quest.find(`#${il}`).append($subQuest)

        if (subquest.text === "") {
            let subText = $subQuest.find('p')

            subText.attr('contenteditable', 'true')

            subText.on('focus', function() {
                var selection = window.getSelection()
                var range = document.createRange()
    
                range.selectNodeContents(this)
    
                selection.removeAllRanges()
                selection.addRange(range)
            })
            
            subText.focus()
    
            subText.keydown((e) => {
                if (e.keyCode === 13 && subText[0].innerText !== "") {
                    subText.attr('contenteditable', 'false')
                    quests[il].data.push({"text": subText[0].innerText, "check": false})
                    quests[il].check = false

                    refreshList()
                }
            })

            subText.blur(() => {
                if (subText.attr('contenteditable') === "true") {
                    $subQuest.remove()
                }
            })
            
        } else quests[il].data.push(subquest)
    }

    var questCheck = $quest.find(".check")
    var questDiv = $quest.find(".quest")

    questCheck.hover(
        () => { questCheck.removeClass("fa-square").addClass("fa-square-check")},
        () => {
            if (quests[il]?.check !== undefined && !quests[il].check) {
                questCheck.addClass("fa-square")
            }
        },
    )

    questCheck.click(() => {
        let subCheck = $quest.find(`#${il} > div > i`)

        questCheck
            .removeClass("fa-square-check")
            .addClass("fa-square")
            .toggleClass("fa-regular fa-square fa-solid fa-square-check")

        quests[il].check = !quests[il].check

        if (quests[il].check) {
            subCheck
                .removeClass("fa-regular fa-square")
                .addClass("fa-solid fa-square-check")
        } else {
            subCheck
                .addClass("fa-regular fa-square")
                .removeClass("fa-solid fa-square-check")
        }

        Object.values(quests[il].data).map((e) => {
            e.check = quests[il].check
        })
    })

    $quest.find(".addsubQuest").click(() => {
        addSubQuest({"text": "", "check": false})
    })

    $quest.find('.delete').click((e) => {
        $quest.remove()
        quests.splice(il, 1)
        if (quests.length === 0) return delete storagedQuests[num]
        storagedQuests[num] = []
        storagedQuests[num].push(...quests)
    })

    if(item.data !== undefined) {
        questDiv.css("opacity", "1")
        questDiv.css("margin", "20px")
        item.data.map((e) => {addSubQuest(e)})
    } else questDiv.animate({opacity: 1, margin: "20px"}, 300)
    
    $ul.append(...$quest)
}

const createCalendar = (month, year) => {
    $currentDate.innerText = months[month] + " " + String(year)

    let InitialDay = (new Date(year, month)).getDay()
    days = 1
    let maxDays = monthLength(month, year)

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr")

        for (let j = 0; j < 7; j++) {
            let td = document.createElement("td")
            
            if (j < InitialDay && i === 0 || days > maxDays) {
                td.innerHTML = ""
            } else {
                td.innerHTML = days

                if (Object.keys(storagedQuests).includes(days.toString())) {

                    let count = 0

                    storagedQuests[days].map((e) => {
                        e.check ? count++ : ""
                    })
                    
                    let percent = count + "/" + storagedQuests[days].length
                    let $text = `
                        <div>
                            <p class="calendar-day">${days}</p>
                            <p class="printed-quest"></p>
                            <p>${storagedQuests[days].length !== 1 ? percent : ""}</p>
                        </div>`

                    td.innerHTML = $text

                    let $mainQuest = td.querySelector(".printed-quest")
                    let $calendarDay = td.querySelector(".calendar-day")

                    $mainQuest.style.display = "block"
                    $calendarDay.style.fontSize = "25px"

                    $mainQuest.innerText = storagedQuests[days][0].name

                    td.classList.add("filled-td")
                }

                let save = days
                
                td.addEventListener('click', () => {handlerSetInput(save)})
                days++
            }

            if (new Date(year, month, days).getTime() < date.getTime()) td.style.backgroundColor = "var(--quart-bright)"

            row.append(td)
        }

        $tbody[0].append(row)
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
    } else currentMonth += sign

    let save = $tbody[0].children[0]

    $tbody[0].innerHTML = ""
    $tbody[0].append(save)

    createCalendar(currentMonth, currentYear)
}

const selectorBtn = () => {
    let num = document.querySelector("#daily-quests h3").innerText.split(" ")[0]
    let mainsBtn = document.querySelectorAll("#set-input, #selector-btn")
    let $listCheck = mainsBtn[1].querySelector("i")
    let $selectorOpts = $buttons.querySelectorAll(".options-select-all, .options-complete, .options-delete, div")

    if ($listCheck.classList.contains("fa-xmark")) {
        for (let index = 0; index < $selectorOpts.length; index++) $selectorOpts[index].remove()

        mainsBtn[0].classList.remove("d-none")
        $listCheck.classList.remove("fa-xmark")

        refreshList()

        return
    }
    
    $listCheck.classList.add("fa-xmark")

    let selector = []

    let li = $ul.querySelectorAll("li")
    let findQuests = $('.quest')
    
    findQuests
        .animate({width: "300px", margin: "20px 20px 20px auto"}, 500)
        .addClass("quest-select")

    for (let index = 0; index < li.length; index++) {
        let $check = li[index].querySelector("input")
        
        li[index].classList.add("selector-active")

        $check.addEventListener('click', () => {
            selector.includes(index) ? selector.splice(selector.indexOf(index), 1) : selector.push(index)
            li[index].classList.toggle("selected")
        })
    }

    mainsBtn[0].classList.add("d-none")

    let $optionsBtn = `
        <button class="options-select-all option-btn">
            <i title= "Select all" class="fa-solid fa-list-ul"></i>
        </button>
        <div style="position: absolute;">
            <div class="cycle-options">
                <button weekday=0>S</button>
                <button weekday=1>M</button>
                <button weekday=2>T</button>
                <button weekday=3>W</button>
                <button weekday=4>T</button>
                <button weekday=5>F</button>
                <button weekday=6>S</button>
            </div>
            <button class="option-btn options-repeat">
                <i class="fa-solid fa-repeat"></i>
            </button>
        </div>
        <button class="options-delete option-btn">
            <i title="Delete Quest" class="fa-solid fa-trash"></i>
        </button>
        <button class="options-complete option-btn">
            <i title="Complete Quest" class="fa-regular fa-circle-check"></i>
            </button>
    `

    $buttons.insertAdjacentHTML('beforeend', $optionsBtn)

    $buttons.getElementsByClassName("options-select-all")[0].addEventListener('click',() => {
        if (selector.length !== 0) {
            for (let index = 0; index < li.length; index++) {
                if (li[index].querySelector("input:checked") !== null) li[index].querySelector("input:checked").click()
            }
        } else {
            for (let index = 0; index < li.length; index++) {
                if (li[index].querySelector("input:checked") === null) li[index].querySelector("input").click()
            }
        }
    })

    $buttons.getElementsByClassName("options-delete")[0].addEventListener('click',() => {
        selector.sort((b, a) => {return a - b}).map((e) => {
            quests[e] = "placeholder"
            storagedQuests[num].splice(e, 1)
            li[e].remove()
        })

        if (quests.length === selector.length) {
            mainsBtn[0].classList.remove("d-none")
            $listCheck.classList.remove("fa-xmark")

            $buttons.querySelectorAll(".options-select-all, .options-complete, .options-delete, div").remove()

            refreshList()
        }
    })
    
    $buttons.getElementsByClassName("options-complete")[0].addEventListener('click', () => {
        selector.map((index) => {
            let element = li[index].querySelector(".check")

            quests[index].check = !quests[index].check
            if (quests[index].check) {
                element.classList.remove("fa-regular", "fa-square")
                element.classList.add("fa-solid", "fa-square-check")
            } else {
                element.classList.remove("fa-solid", "fa-square-check")
                element.classList.add("fa-regular", "fa-square")
            }
        })
    })
    
    let $cycleOpts = $buttons.getElementsByClassName("cycle-options")[0]
    let weeklyBtns = $cycleOpts.querySelectorAll("button")
    let repeatedDay = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ]

    $buttons.getElementsByClassName("options-repeat")[0].addEventListener('click',() => {
        if (selector.length === 0) return
        repeatedDay = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
        ]
        let min = 8
        let index

        $cycleOpts.classList.toggle("show-options")
        for (let a = 0; a < weeklyBtns.length; a++) {
            weeklyBtns[a].classList.remove("selected")
        }

        storagedQuests[num].map((e, i) => {
            if (selector.includes(i) && e.cycle.length < min) {
                min = e.cycle.length
                index = i
            }
        })

        selector.map((i) => {
            storagedQuests[num][index].cycle.map((e) => {
                if (storagedQuests[num][i].cycle.includes(e)) {
                    repeatedDay[e]++
                    if (repeatedDay[e] === selector.length) {
                        $cycleOpts.querySelectorAll("button")[e].classList.add("selected")
                    }
                }
            })
        })

    })

    $cycleOpts.addEventListener("click", (e) => {
        let selectedDay = e.target.getAttribute("weekday")
        
        if (selectedDay === null) return

        e.target.classList.toggle("selected")
    
        if (repeatedDay[selectedDay] === selector.length){
            selector.map((index) => {
                storagedQuests[num][index].cycle.splice(storagedQuests[num][index].cycle.indexOf(selectedDay), 1)
            })
            repeatedDay[selectedDay] = 0
        } else {
            selector.map((index) => {
                if (!storagedQuests[num][index].cycle.includes(selectedDay)) storagedQuests[num][index].cycle.push(selectedDay)
                repeatedDay[selectedDay]++
            })
        }
    })
}

const refreshCalendar = () => {
    let save = $tbody[0].children[0]

    $ul.innerHTML = ""
    $tbody[0].innerHTML = ""
    $tbody[0].append(save)

    quests = []
    i = -1

    createCalendar(currentMonth, currentYear)
}

const keyArrow = (e) => {
    if (e.key === "ArrowRight") {
        changeMonth(true)
    }
    if (e.key === "ArrowLeft") {
        changeMonth(false)
    }
}

$arrowBtns[0].addEventListener('keyup', keyArrow)
$arrowBtns[1].addEventListener('keyup', keyArrow)

createCalendar(currentMonth, currentYear)