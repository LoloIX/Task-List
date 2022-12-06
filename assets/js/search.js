let sortList = []

$('#search-input').keyup((e) => { 
    let regex = new RegExp(e.target.value, 'i')

    itemlist.map((e) => {
        if (regex.test(e.name)) {
            let index = itemlist.indexOf(e)

            console.log(sortList)

            sortList.push(itemlist[index])

            console.log(sortList)
        }
    })

    $('.elements > div').remove()
    let RefreshSortList = sortList
    sortList = []
    i = -1
    handlerAddTask(RefreshSortList)

    if ($('#search-input').val() === "") {
        refresh()
    }

})