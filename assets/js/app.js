var body = $('body')
var main = $('#main')

const setInput = (bool) => {
    let $mainButton = $(`
        <button id="set-input" onclick={setInput(${bool})}>
            <i class="fa-solid fa-plus"></i>
            ${bool ? "Add task" : "Add quest"}
        </button>
    `)

    let $textBox = $(`
        <div style="margin: 40px 17%">
            <div class="form">
                <div class="form-group">
                    <input type="text" id="input-data" placeholder=" ">
                    <label for="name" class="form-label">${bool ? "Task name" : "Quest name"}</label>
                </div>
            </div>
        </div>
    `)

    let tab = bool ? main : span 

    $textBox.find('#input-data').blur(() => {
        $textBox.remove()
        tab.append($mainButton)
    })

    $('#set-input').remove()

    $textBox.find('#input-data').keydown((e) => {
        if (e.keyCode === 13) {
            handlerAddTask(undefined, bool)
            $textBox.remove()
            tab.append($mainButton)
        }
    })

    tab.append($textBox)

    $('#input-data').focus()
}

const showMenu = () => {
    document.body.dataset.menu = document.body.dataset.menu === "true" ? "false" : "true"
}

const handlerAddTask = (array, bool) => {
    let result = bool ? addTask : dailyQuests
    let entry = bool ? {"lock": false} : {"cycle": undefined}

    if ($('#input-data').val() !== undefined) {
        result({"name": $('#input-data').val(), "check": false, "expanded": false, entry})
    } else {
        Object.keys(array).map((key) => {
            return result(array[key])
        })
    }
}

$('#sort-input').keyup((e) => {
    refresh()
})