var body = $('body')
var span = $('#daily-quests')

const setInput = () => {
    let $main = document.getElementById("main")
    let $setInput = document.getElementById("set-input")

    $setInput.remove()

    let $mainButton = `
        <button id="set-input" onclick={setInput()}>
            <i class="fa-solid fa-plus"></i>
            Add task
        </button>
    `

    let $textBox = `
        <div class="input-task">
            <input type="text" id="input-data" placeholder=" ">
            <label for="name">Task name</label>
        </div>
    `

    $main.insertAdjacentHTML("beforeend", $textBox)

    let $inputData = $main.querySelector('#input-data')
    let $inputTask = $main.getElementsByClassName('input-task')
    
    $inputData.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            handlerAddTask(undefined, true)
            $inputTask[0].setAttribute("deleting", "true")
            $inputTask[0].remove()
            $main.insertAdjacentHTML("beforeend", $mainButton)
        }
    })

    $inputData.addEventListener("blur", () => {
        if ($inputTask[0].attributes?.deleting?.value !== "true") {
            $inputTask[0].remove()
            $main.insertAdjacentHTML("beforeend", $mainButton)
        }
    })
    
    $inputData.focus()
}

const showMenu = () => {
    document.body.dataset.menu = document.body.dataset.menu === "true" ? "false" : "true"
}

const handlerAddTask = (array, bool) => {
    let result = bool ? addTask : dailyQuests

    if (array === undefined) {
        if ($('#input-data').val() !== "" && $('#input-data').val() !== undefined) {
            result({"name": $('#input-data').val(), "check": false, "expanded": false, "lock": false})
        }
    } else {
        Object.keys(array).map((key) => {
            return result(array[key])
        })
    }
}

$('#sort-input').keyup((e) => {
    refresh()
})