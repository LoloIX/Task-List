// let $mainButton = $(`
//         <button id="set-input" onclick={setInput(${bool})}>
//             <i class="fa-solid fa-plus"></i>
//             "Add task"
//         </button>
//     `)

//     let $textBox = $(`
//         <div style="margin: 40px 17% 0px">
//             <div class="form">
//                 <div class="form-group">
//                     <input type="text" id="input-data" placeholder=" ">
//                     <label for="name" class="form-label">${bool ? "Task" : "Quest"} name</label>
//                 </div>
//             </div>
//         </div>
//     `)
// $textBox.find('#input-data').blur(() => {
//         $textBox.remove()
//         append
//     })

//     $textBox.find('#input-data').keydown((e) => {
//         if (e.keyCode === 13) {
//             handlerAddTask(undefined, bool)
//             $textBox.remove()
//             append
//         }
//     })

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

    $main.innerHTML += $textBox

    let $inputData = $main.querySelector('#input-data')

    $inputData.addEventListener("blur", () => {
        $main.querySelector('div:last-child:not(.progress, .hidden)').remove()
        $main.innerHTML += $mainButton
    })
    
    $inputData.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            handlerAddTask(undefined, true)
            $main.querySelector('div:last-child:not(.progress, .hidden)').remove()
            $main.innerHTML += $mainButton
        }
    })

    $inputData.focus()
}

const showMenu = () => {
    document.body.dataset.menu = document.body.dataset.menu === "true" ? "false" : "true"
}

const handlerAddTask = (array, bool) => {
    let result = bool ? addTask : dailyQuests
    let entry = [
        {"lock": false},
        {"cycle": undefined}
    ]
    let owo = bool ? entry[0] : entry[1]

    if (array === undefined) {
        if ($('#input-data').val() !== "" && $('#input-data').val() !== undefined) {
            result({"name": $('#input-data').val(), "check": false, "expanded": false, owo})
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