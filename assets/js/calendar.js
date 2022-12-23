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

    setInput(false)
}

const refresh = () => {
    ul.find('li').remove()
    
    quests.map((e, i) => {
        if (e === "placeholder") {
            quests.splice(i, 1)
        }
    })
                    
    let refreshList = quests
    quests = []
    i = -1
    
    handlerAddTask(refreshList, false)
}

const dailyQuests = (item) => {
    i++
    let il = i

    if (item === "placeholder") return

    quests[il] = {
        name: item.name,
        check: item.check,
        cycle: item.cycle,
        data:[]
    }

    let $quest = $(`
        <li>
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
            if (quests[il].check !== undefined && !quests[il].check) {
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
                days++
                td.addEventListener("click", handlerSetInput)
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
    let selector = []

    let li = ul.find('li')
    let findQuests = $('.quest')
    
    li.find('> .btn').remove()
    
    findQuests.addClass("select")
    findQuests.css("margin-left", "auto")

    for (let index = 0; index < li.length; index++) {
        selector[index] = {"element": li[index], "selected": false}

        let $check = $(`
            <i class="btn fa-regular fa-square"></i>
        `)
    
        $check.hover(
            () => {$check.removeClass("fa-square").addClass("fa-square-check")},
            () => {
                if (!selector[index].selected) {
                    $check.addClass("fa-square")
                }
            },
        )
    
        $check.click(() => {
            $check
                .removeClass("fa-square-check")
                .addClass("fa-square")
                .toggleClass("fa-regular fa-square fa-solid fa-square-check")

            selector[index].selected = !selector[index].selected
        })
    
        li[index].prepend($check[0])
    }

    let buttons = document.getElementById("buttons")
    let mainsBtn = $('#set-input, #selector-btn')
    mainsBtn.addClass("d-none")

    let $optionsBtn = $(`
        <button class="options-select-all option-btn">
            <p>Select all</p>
        </button>
        <button class="options-complete option-btn">
            <p>Complete</p>
        </button>
        <button class="options-delete option-btn">
            <p>Delete</p>
        </button>
    `)
    
    buttons.append(...$optionsBtn)

    $('.options-select-all').click(() => {
        li.find('> .btn')
            .removeClass("fa-regular fa-square")
            .addClass("fa-solid fa-square-check")

        selector.map((e) => {
            e.selected = true
        })
    })

    $('.options-delete').click(() => {
        let count = 0
        selector.map((e, i) => {
            if (e.selected) {
                quests.splice(i, 1, "placeholder")
                count++
            }
        })

        if (count !== 0) {
            refresh()
            mainsBtn.removeClass("d-none")
            $optionsBtn.remove()
        }
    })
    
    $('.options-complete').click(() => {
        selector.map((e, i) => {
            if (e.selected) {
                quests[i].check = true
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