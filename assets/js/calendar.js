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
let storagedQuests = {}

let i = -1
let days
let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()

let currentDate = document.getElementById("CurrentDate")
let arrowBtns = document.getElementsByClassName("text-btn")
let tbody = document.getElementsByTagName("tbody")
let btn = $("#buttons")
let ul = span.find('ul')

const showSpan = () => {
    document.body.dataset.quests = "false"

    let save = tbody[0].children[0]

    tbody[0].innerHTML = ""
    tbody[0].append(save)

    createCalendar(currentMonth, currentYear)
}

const monthLength = (month, year) => {
    return 32 - (new Date(year, month, 32)).getDate()
}

const handlerSetInput = (event) => {
    let findDate = span.find('h3')
    let $date = document.createElement('h3')

    document.body.dataset.quests = "true"

    if (findDate !== undefined) findDate.remove()

    $date.innerText = event.path[0].innerText + " " + currentDate.innerText
    span.prepend($date)

    handlerAddTask(storagedQuests[event.path[0].innerText], false)

    setInput(false)
}

const refresh = () => {
    ul.find('li').remove()
                    
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
        cycle: item.cycle,
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

                    refresh()
                }
            })

            subText.blur(() => {
                if (subText.attr('contenteditable') === "true") {
                    $subQuest.remove()
                }
            })
            
        } else {
            quests[il].data.push(subquest)
        }
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
        storagedQuests[num] = []
        storagedQuests[num].push(...quests)
    })

    if(item.data !== undefined) {
        questDiv.css("opacity", "1")
        questDiv.css("margin", "20px")
        item.data.map((e) => {
            addSubQuest(e)
        })
    } else {
        questDiv.animate({opacity: 1, margin: "20px"}, 300)
    }
    
    ul.append($quest)
}

const createCalendar = (month, year) => {
    currentDate.innerText = months[month] + " " + String(year)

    let InitialDay = (new Date(year, month)).getDay()
    days = 1
    let maxDays = monthLength(month, year)

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr")

        for (let j = 0; j < 7; j++) {

            let td = document.createElement("td")

            td.innerText = days
            
            if (j < InitialDay && i === 0 || days > maxDays) {
                td.innerHTML = ""
            } else {
                if (Object.keys(storagedQuests).includes(`${days}`)) {
                    td.style.backgroundColor = "red"
                }
                
                td.addEventListener("click", handlerSetInput)
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

const selectQuest = () => {
    let mainsBtn = document.querySelectorAll("#set-input, #selector-btn")
    let $listCheck = mainsBtn[1].querySelector("i")
    let $selectorOpts = document.querySelectorAll(".options-select-all, .options-complete, .options-delete, .options-repeat")

    if ($listCheck.classList.contains("fa-xmark")) {
        for (let index = 0; index < $selectorOpts.length; index++) $selectorOpts[index].remove()

        mainsBtn[0].classList.remove("d-none")
        $listCheck.classList.toggle("fa-xmark")

        refresh()

        return
    }
    
    $listCheck.classList.toggle("fa-xmark")

    let selector = []
    let buttons = document.getElementById("buttons")

    let li = ul.find('li')
    let findQuests = $('.quest')
    
    findQuests
        .animate({width: "300px", margin: "20px 20px 20px auto"}, 500)
        .addClass("select")

    for (let index = 0; index < li.length; index++) {
        let $check = $(li[index]).find('> .btn')
    
        $check.click(() => {
            selector.includes(index) ? selector.splice(selector.indexOf(index), 1) : selector.push(index)
        })
        
        $check.animate({translate: "0px"}, 1)
    }

    mainsBtn[0].classList.add("d-none")

    let $optionsBtn = $(`
        <button class="options-delete option-btn">
            <i title="Delete Quest" class="fa-solid fa-trash"></i>
        </button>
        <button class="options-complete option-btn">
            <i title="Complete Quest" class="fa-regular fa-circle-check"></i>
        </button>
        <button class="options-select-all option-btn">
            <i title= "Select all" class="fa-solid fa-list-ul"></i>
        </button>
        <button class="option-btn options-repeat">
            <i class="fa-solid fa-repeat"></i>
        </button>
    `)

    buttons.append(...$optionsBtn)

    $('.options-select-all').click(() => {li.find('> input').click()})

    $('.options-delete').click(() => {
        selector.map((e) => {
            quests[e] = "placeholder"
            li[e].remove()
            li.splice(e, 1, "placeholder")
        })

        if (selector.length === quests.length) {
            mainsBtn[0].classList.remove("d-none")
            $listCheck.classList.remove("fa-xmark")

            $optionsBtn.remove()

            refresh()
        }
    })
    
    $('.options-complete').click(() => {
        selector.map((e) => {
            quests[e].check = !quests[e].check
            let element = $(li[e]).find('.check')

            if (quests[e].check) {
                element
                    .removeClass("fa-regular fa-square")
                    .addClass("fa-solid fa-square-check")
            } else {
                element
                    .removeClass("fa-solid fa-square-check")
                    .addClass("fa-regular fa-square")
            }
        })
    })
}

const keyArrow = (e) => {
    if (e.key === "ArrowRight") {
        changeMonth(true)
    }
    if (e.key === "ArrowLeft") {
        changeMonth(false)
    }
}

arrowBtns[0].addEventListener("keyup", keyArrow)
arrowBtns[1].addEventListener("keyup", keyArrow)

createCalendar(currentMonth, currentYear)