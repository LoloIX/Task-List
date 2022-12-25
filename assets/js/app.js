var body = $('body')
var main = $('#main')
var span = $('#daily-quests')

const setInput = (bool) => {
    let $mainButton = $(`
        <button id="set-input" onclick={setInput(${bool})}>
            <i class="fa-solid fa-plus"></i>
            ${bool ? "Add task" : ""}
        </button>
    `)

    let $textBox = $(`
        <div style="margin: 40px 17% 0px">
            <div class="form">
                <div class="form-group">
                    <input type="text" id="input-data" placeholder=" ">
                    <label for="name" class="form-label">${bool ? "Task name" : "Quest name"}</label>
                </div>
            </div>
        </div>
    `)

    $textBox.find('#input-data').blur(() => {
        $textBox.remove()
        bool ? main.append($mainButton) : ""
    })
 
    bool ? $('#set-input').remove() : ""

    $textBox.find('#input-data').keydown((e) => {
        if (e.keyCode === 13) {
            handlerAddTask(undefined, bool)
            $textBox.remove()
            bool ? main.append($mainButton) : ""
        }
    })

    bool ? main.append($textBox) : ul.append($textBox)

    $('#input-data').focus()
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

    if ($('#input-data').val() !== undefined && $('#input-data').val() !== "") {
        result({"name": $('#input-data').val(), "check": false, "expanded": false, owo})
    } else {
        Object.keys(array).map((key) => {
            return result(array[key])
        })
    }
}

$('#sort-input').keyup((e) => {
    refresh()
})