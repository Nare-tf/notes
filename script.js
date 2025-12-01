
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
    el2.classList.add('item-content')
    span.style.fontWeight="900"
    span.style.fontSize="1.1em"
    span.innerText = head
    text.innerText = body.slice(0,100).trim().replaceAll("\n", "") + "......."
    pre.innerText = date
    pre.style.justifySelf="end"
    el2.appendChild(span)
    el2.appendChild(document.createElement("br"))
    el2.appendChild(text)
    el2.appendChild(pre)
    el.appendChild(el2)
    document.getElementById('notes').appendChild(el)
}