let body = $('body')

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