// document.addEventListener("DOMContentLoaded", function() {});
// const div = document.querySelector("div#list-panel")
const list = document.querySelector("ul#list")
const showDiv = document.querySelector("div#show-panel")
let h3 = ce("h3")
let img = ce("img")
let p = ce("p")
let button = ce("button")
// showDiv.append(h3, img, p, button)
const ul = ce("ul")
// ul.innerText = "*Users who have liked*"

fetch('http://localhost:3000/books')
.then (res => res.json())
.then(books => showBooks(books))

function showBooks(books){

    books.forEach(book => {
        addBook(book)
    })
}

// helper method
function ce(element){
    return document.createElement(element)
}

function addBook(book) {
    let li = ce("li")
    li.innerText = book.title

    // let h3 = ce("h3")
    // h3.innerText = ""

    // let img = ce("img")
    // img.src = ""

    // let p = ce("p")
    // p.innerText = ""

    // button.innerText = ""

    // showDiv.append(h3, img, p, button)

    li.addEventListener("click", () => {
        // let h3 = ce("h3")
        showDiv.innerHTML = ""
        h3.innerText = book.title

        // let img = ce("img")
        img.src = book.img_url

        // let p = ce("p")
        p.innerText = book.description

        // console.log(ul)
        // ul.innerHTML = ""
        ul.innerText = "*Users who have liked*"

        book.users.forEach( user => {
            let li = ce("li")
            li.innerText = user.username
            ul.appendChild(li)
        })
        // debugger

        let button = ce("button")
        button.innerText = "like book <3"
        button.addEventListener("click", () => {
            book.users.push({"id":1, "username":"pouros"})
            fetch(`http://localhost:3000/books/1`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    users: book.users
                })
            })
            .then( res => res.json() )
            .then( updatedBook => {
                book = updatedBook
                ul.innerHTML =""
                ul.innerText="*Users who have liked*"
                book.users.forEach( user => {
                    let li = ce("li")
                    li.innerText = user.username
                    ul.appendChild(li)
                })
            })
        })
        showDiv.append(h3, img, p, ul, button)

    })
    list.appendChild(li)

}

