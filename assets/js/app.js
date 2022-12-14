var body = $('body')

const setInput = () => {
    let $mainButton = $(`
        <button id="set-input" onclick={setInput()}>
            <i class="fa-solid fa-plus"></i>
            Add task
        </button>
    `)

    let $textBox = $(`
        <div style="margin: 40px 17%">
            <div class="form">
                <div class="form-group">
                    <input type="text" id="input-data" placeholder=" ">
                    <label for="name" class="form-label">Task name</label>
                </div>
            </div>
        </div>
    `)

    $textBox.find('#input-data').blur(() => {
        $textBox.remove()
        $('#main').append($mainButton)
    })

    $('#set-input').remove()

    $textBox.find('#input-data').keydown((e) => {
        if (e.keyCode === 13) {
            handlerAddTask()
            $textBox.remove()
            $('#main').append($mainButton)
        }
    })

    $('#main').append($textBox)

    $('#input-data').focus()
}

const showMenu = () => {
    document.body.dataset.menu = document.body.dataset.menu === "true" ? "false" : "true"
}

$('#sort-input').keyup((e) => {
    refresh()
})