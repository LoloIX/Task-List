let itemlist = []

let i = -1
let canvasPrinted = 0
let dragging
let subdragging

var body = $('body')

const setInput = () => {
    let $mainButton = $(`
        <button class="set-input text-btn" onclick={setInput()}>
            <i class="fa-solid fa-plus"></i>
            Add task
        </button>
    `)

    let $textBox = $(`
        <div style="margin: 40px 17%">
            <form class="form">
                <div class="form-group">
                    <input type="text" class="input-data" placeholder=" ">
                    <label for="name" class="form-label">Task name</label>
                </div>
            </form>
        </div>
    `)

    $textBox.find('.input-data').blur(() => {
        $textBox.remove()
        body.append($mainButton)
    })

    $('.set-input').remove()

    $textBox.find('.input-data').keydown((e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            handlerAddTask()
            $textBox.remove()
            body.append($mainButton)
        }
    })

    body.append($textBox)

    $('.input-data').focus()
}

const handlerAddTask = (array) => {
    if (array === undefined) {
        if ($('.input-data').val() !== "") addTask({"name": $('.input-data').val(), "check": false, "expanded": false, "lock": false})
    } else {
        Object.keys(array).map((key) => {
            return addTask(array[key])
        })
    }
}

const refresh = () => {
    $('.elements > div:not(.unlockedTask)').remove()

    itemlist.map((e, i) => {
        if (e === "placeholder") {
            itemlist.splice(i, 1)
        }
    })

    canvasPrinted = 0

    let refreshList = itemlist
    itemlist = []
    i = -1

    handlerAddTask(refreshList)
}

const addTask = (task) => {
    i++
    let il = i

    if (task === "placeholder") return
    
    let $canvas = $('<canvas width="900" height="900" id="canvas"></canvas>')   
    let percent = task.check ? 100:0

    if (task.data !== undefined && !task.check) {
        task.data.map((e) => {
            e.check ? percent = percent + 100 / task.data.length : ""
        })
    }
    
    itemlist[il] = {name: task.name, check: task.check, expanded: task.expanded, lock: (task.lock !== undefined ) ? task.lock : true, data:[]}

    let $task = $(`
        <div class="task">
            <div draggable="true" class="d-flex">
                <i class="check ${task.check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                <p title="${task.name}" id="text-${il}">${task.name}</p>
                <div class="bar">
                    <div class="progress">
                        <p>${parseInt(percent)}%</p>
                    </div>
                </div>
                <button class="btn tres-p">⁝</button>
                <i class="btn fa-xs fa-solid fa-pen" style="margin-right: 30px"></i>
                <i class="btn fa-xs fa-solid ${task.lock ? "fa-lock" : "fa-lock-open"}" style="margin-right: 30px"></i>
            </div>
            <span id="options-${il}" class="options hidden">
                <button class="text-btn btn-addSubtask">Add subtask</button>
                <button class="text-btn btn-delete">Delete</button>
            </span>
            <button class="btn btn-expand ${(task.data !== undefined && task.data?.length > 0) ? "" : "d-none"} ${task.expanded ? "rotate" : ""}">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <div id=${il} class="hidden"></div>
        </div>
    `)

    var taskCheck = $task.find('.check')
    var textProgress = $task.find('.progress > p')
    var taskOptions = $task.find('.options')
    var taskExpand = $task.find('.btn-expand')
    var findProgress = $task.find('.progress')
    var taskLock = $task.find('div:first-child > i:last-child')

    findProgress.animate({width: `${percent}%`}, 300)

    taskCheck.hover(
        () => { taskCheck.removeClass("fa-square").addClass("fa-square-check")},
        () => {
            if (itemlist[il].check !== undefined && !itemlist[il].check) {
                console.log("i should not work")
                taskCheck.addClass("fa-square")
            }
        },
    )

    taskLock.click(() => {
        itemlist[il].lock = !itemlist[il].lock

        taskLock.toggleClass("fa-lock fa-lock-open")
    })

    taskCheck.click(() => {
        let subCheck = $task.find(`#${il} > div > i`)

        itemlist[il].check = !itemlist[il].check

        if (itemlist[il].check) {
            taskCheck
                .removeClass("fa-square fa-regular")
                .addClass("fa-solid fa-square-check")

            subCheck
                .removeClass("fa-regular fa-square")
                .addClass("fa-solid fa-square-check")

            percent = "100%"

            if (!canvasPrinted) {
                canvasPrinted++
                body.append($canvas)
                PrintConfetti()
            }
        } else {
            taskCheck
                .addClass("fa-regular fa-square")
                .removeClass("fa-solid fa-square-check")

            subCheck
                .addClass("fa-regular fa-square")
                .removeClass("fa-solid fa-square-check")

            percent = "0%"
        }
        
        textProgress.text(percent)
        findProgress.animate({width: percent}, 300)

        Object.values(itemlist[il].data).map((e) => {
            e.check = itemlist[il].check
        })

        if (itemlist[il].check && !itemlist[il].lock) {
            itemlist.splice(il, 1, "placeholder")
            $task[0].classList.add("unlockedTask")
        }
    })

    const addSubTask = (subtask) => {
        let $subtask = $(`
            <div draggable="true" class="subtask">
                <i class="check ${subtask.check ? "fa-solid fa-square-check" : "fa-regular fa-square"}"></i>
                <p title="${subtask.text}">${subtask.text}</p>
                <button class="btn btn-delete fa-solid fa-xmark" style="margin: 0 20px 0 auto"></button>
            </div>
        `)

        let subCheck = $subtask.find('.check')

        subCheck.hover(
            () => {subCheck.removeClass("fa-square").addClass("fa-square-check")},
            () => {
                if(!subtask.check) subCheck.addClass("fa-square")
            },
        )

        subCheck.click(() => {
            subCheck
                .removeClass("fa-square-check")
                .addClass("fa-square")
                .toggleClass("fa-regular fa-square fa-solid fa-square-check")

            subtask.check = !subtask.check

            percent = 0

            Object.values(itemlist[il].data).map((e) => {
                e.check ? percent = percent + 100 / itemlist[il].data.length : ""
            })
            
            if (percent === 100) {
                taskCheck
                    .removeClass("fa-regular fa-square")
                    .addClass("fa-solid fa-square-check")

                if (!canvasPrinted) {
                    canvasPrinted++
                    body.append($canvas)
                    PrintConfetti()
                }
            } else {
                taskCheck
                    .addClass("fa-regular fa-square")
                    .removeClass("fa-solid fa-square-check")
            }

            itemlist[il].check = percent === 100

            textProgress.text(parseInt(percent) + '%')
            findProgress.animate({width: `${percent}%`}, 300)

            if (itemlist[il].check && !itemlist[il].lock) {
                itemlist.splice(il, 1)
                $task[0].classList.add("unlockedTask")
            }
        })

        $subtask.on('dragstart', () => {subdragging = itemlist[il].data.indexOf(subtask)})
        
        // $subtask.on('dragenter', (e) => {$('.subtask').addClass("drag-over")})

        $subtask.on('drop', () => {
            let index = itemlist[il].data.indexOf(subtask)
            
            itemlist[il].data.splice(index + 1, 0, itemlist[il].data[subdragging])
            
            if (subdragging > index) subdragging++
    
            itemlist[il].data.splice(subdragging, 1)
    
            refresh()
        })

        $subtask.find('.btn-delete').click(() => {
            $subtask.remove()
            itemlist[il].data.splice(itemlist[il].data.indexOf(subtask), 1)

            percent = 0

            Object.values(itemlist[il].data).map((e) => {
                e.check ? percent = percent + 100 / itemlist[il].data.length : ""
            })

            textProgress.text(parseInt(percent) + '%')
            findProgress.animate({width: `${percent}%`}, 300)

            itemlist[il].data.length == 0 ? taskExpand.addClass("d-none") : ""
        })

        taskExpand.removeClass("d-none")

        $(`#${il}`).append($subtask)

        if (subtask.text === "") {
            let subText = $subtask.find('p')

            taskExpand.addClass("rotate")

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
                    itemlist[il].data.push({"text": subText[0].innerText, "check": false})
                    itemlist[il].check = false
                    itemlist[il].expanded = true
                    refresh()
                }
            })

            subText.blur(() => {
                if (subText.attr('contenteditable') === "true") {
                subText.attr('contenteditable', 'false')
                $subtask.remove()
                }
            })
        } else {
            itemlist[il].data.push(subtask)
        }
    }

    taskExpand.click(() => {
        taskExpand.toggleClass("rotate")
        itemlist[il].expanded = !itemlist[il].expanded
    })

    $task.find('.fa-pen').click(() => {
        var text = $(`#text-${il}`)

        text.attr('contenteditable', 'true')

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
                itemlist[il].name = text[0].innerText
                text.attr('contenteditable', 'false')
            }
        })

        text.blur(() => {
            text.attr('contenteditable', 'false')
            text[0].innerText = itemlist[il].name
        })
    })

    $task.find('.btn-addSubtask').click(() => {

        $('.modal').remove()

        taskOptions.removeClass("expanded")
        taskExpand.addClass("rotate")

        addSubTask({"text": "","check": false})
    })

    $task.find('.btn-delete').click(() => {
        itemlist.splice(il, 1)
        refresh()
        $('.modal').remove()
    })

    $task.find('.tres-p').click(() => {
        $(`.options:not(#options-${il})`).removeClass("expanded")
        taskOptions.toggleClass("expanded")
        
        let $modal = $('<div class="modal"></div>')
        body.append($modal)

        $modal.click(() => {
            $modal.remove()
            taskOptions.toggleClass("expanded")
        })
    })

    $task.on('dragstart', (e) => {
        e.target.classList.add("dragging")
        dragging = il
    })

    $task.find('div:first-child').on('dragenter', (e) => {
        e.preventDefault()
        $task.addClass("drag-over")
    })

    $task.on('dragover', (e) => {e.preventDefault()})

    $task.on('dragleave', (e) => {e.target.classList.remove("drag-over")})

    $task.on('drop', (e) => {
        e.target.classList.remove("drag-over")
        $('.dragging').removeClass("dragging")
        
        itemlist.splice(il + 1, 0, itemlist[dragging])
        
        if (dragging > il) dragging++

        itemlist.splice(dragging, 1)

        refresh()
    })

    $('.elements').append($task)

    if (task.data !== undefined) {
        $task.css("opacity", "1")
        $task.css("margin", "20px 10px 0px")
        task.data.map((subtask) => {
            addSubTask(subtask)
        })
    }
    else {
        $task.animate({opacity: 1, margin: "20px 10px 0px"}, 300)
    }
}