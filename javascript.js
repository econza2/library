let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function (){
    this.read = !this.read;
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    render();
}

function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i=0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.innerHTML = `<h3>${book.title}<h3>
                            <h5>by ${book.author}
                            <p>${book.pages}
                            <p>${book.read ? "Read" : "Not Read Yet"}<p>
                            <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
                            <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>`;
        libraryEl.appendChild(bookEl); 
    }
}

function removeBook(index){
    myLibrary.splice(index, 1);
    render();
}

function addBookToLibrary(){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    render();
}

let newBookBtn = document.querySelector('#new-book-btn');

newBookBtn.addEventListener('click',
    function(){
        let newBookForm = document.querySelector('#new-book-form');
        newBookForm.style.display = "block";
    }
)

document.querySelector("#new-book-form").addEventListener("submit",
    function(event){
        event.preventDefault();
        addBookToLibrary();
    }
)