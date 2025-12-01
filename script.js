
document.getElementById('add').addEventListener('click', e=>
    openAddPage('note')
)
document.getElementById('close').addEventListener('click', e=>closePage('note'))
document.getElementById('save').addEventListener('click', e=>saveNote())
function openAddPage(id) {
    document.getElementById(id).style.display = "flex"
    document.getElementById('name').innerText = "Enter name of the note..."
    document.getElementById('content').innerText = "Enter notes content..."
}
function closePage(id) {
    document.getElementById(id).style.display = "none"
    //current = null
}
function saveNote() {
    let head = document.getElementById('name').innerText
    let body = document.getElementById('content').innerText
    // document.getElementById('notes').innerHTML += `<div class="note-item">
    //         <div class="item-content">
    //             <span style="font-weight: 900; font-size: 1.1em;">${head}</span>
    //             <br>
    //             <text>${body.slice(0,100)}</text>
    //             <pre style="justify-self: end;">${["getDate","getMonth","getFullYear"].map(x=>new Date()[x]()).join("/")}</pre>
    //         </div>
    //     </div>`
    closePage('note')
    let el = document.createElement("div")
    let el2 = document.createElement("div")
    let span = document.createElement("span")
    let text = document.createElement("text")
    let pre =  document.createElement("pre")
    let date = ["getDate","getMonth","getFullYear"].map(x=>new Date()[x]()).join("/")
    el.classList.add('note-item')
    el.setAttribute("data-id",(id=getId()))
    el.onclick = e=>openViewPage({head: head, body: body, date: date,id:id })
    el2.classList.add('item-content')
    span.style.fontWeight="900"
    span.style.fontSize="1.1em"
    span.innerText = head
    text.innerText = body.slice(0,100).trim().replaceAll("\n", "") + "..."
    pre.innerText = date
    pre.style.justifySelf="end"
    el2.appendChild(span)
    el2.appendChild(document.createElement("br"))
    el2.appendChild(text)
    el2.appendChild(pre)
    el.appendChild(el2)
    document.getElementById('notes').appendChild(el)
    localStorage.setItem(`note-${id}`, JSON.stringify({head: head, body: body, date: date, id: id}))
    location.reload()
}
function getId() {
    id = localStorage.getItem("id") || 1
    localStorage.setItem("id", Number(id)+1)
    return id
}
function loadNotes() {
    for (let i=1; i<localStorage.getItem("id"); i++) {
        let note = JSON.parse(localStorage.getItem(`note-${i}`))
        if (note) {
            let el = document.createElement("div")
            let el2 = document.createElement("div")
            let span = document.createElement("span")
            let text = document.createElement("text")
            let pre =  document.createElement("pre")
            let date = ["getDate","getMonth","getFullYear"].map(x=>new Date()[x]()).join("/")
            el.classList.add('note-item')
            el.setAttribute("data-id", i)
            el.onclick = e=>openViewPage(note)
            el2.classList.add('item-content')
            span.style.fontWeight="900"
            span.style.fontSize="1.1em"
            span.innerText = note.head
            text.innerText = note.body.slice(0,100).trim().replaceAll("\n", "") + "..."
            pre.innerText = date
            pre.style.justifySelf="end"
            el2.appendChild(span)
            el2.appendChild(document.createElement("br"))
            el2.appendChild(text)
            el2.appendChild(pre)
            el.appendChild(el2)
            document.getElementById('notes').appendChild(el)
        }
    }
}
loadNotes()
let current = null
function openViewPage(note) {
    current = note
    document.getElementById('view').style.display = "flex"
    document.getElementById('view-name').innerHTML = `<h2>${note.head}</h2><hr>`
    document.getElementById('view-content').innerText = note.body
}
document.getElementById('view-close').addEventListener('click', e=>closePage('view'))
document.getElementById('delete-note').addEventListener('click', e=>deleteNote())
document.getElementById('edit').addEventListener('click', e=>edit())
function deleteNote() {
    if (current) {
        localStorage.removeItem(`note-${current.id}`)
        location.reload()
    }
}
function purgeNotes() {
    localStorage.clear()
    location.reload()
}
function edit() {
    if (current) {
        closePage('view')
        openAddPage('note')
        document.getElementById('name').innerText = current.head
        document.getElementById('content').innerText = current.body
        localStorage.removeItem(`note-${current.id}`)
    }
}