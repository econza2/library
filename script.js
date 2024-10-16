const body = document.querySelector("body");
const myLibrary = [];


function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  Book.prototype.toggleRead = function () {
    if(this.read == "yes"){
        return this.read = "no";
    }
    else {
        return this.read = "yes";
    }
  }


const bookContainer = document.querySelector(".book-container");

  function addBookToLibrary() {
    
        if(myLibrary.length > 1){
            bookContainer.textContent = "";
            const titleLabel = document.createElement("div");
            titleLabel.textContent = "Title";
            const authorLabel = document.createElement("div");
            authorLabel.textContent = "Author";
            const pagesLabel = document.createElement("div");
            pagesLabel.textContent = "Pages";
            const readLabel = document.createElement("div");
            readLabel.textContent = "Read";
            const removeLabel = document.createElement("div");
            removeLabel.textContent = "Remove Button";
            
            
            
            bookContainer.appendChild(titleLabel);
            bookContainer.appendChild(authorLabel);
            bookContainer.appendChild(pagesLabel);
            bookContainer.appendChild(readLabel);
            bookContainer.appendChild(removeLabel);
        }

        myLibrary.forEach((book, index) => {
            const titleDiv = document.createElement("div");
            const authorDiv = document.createElement("div");
            const pagesDiv = document.createElement("div");
            const readDiv = document.createElement("button");
            const removeButton = document.createElement("button");

            titleDiv.textContent = book.name;
            authorDiv.textContent = book.author;
            pagesDiv.textContent = book.pages;
            readDiv.textContent = book.read;
            removeButton.textContent = "Remove";
            

            bookContainer.appendChild(titleDiv);
            bookContainer.appendChild(authorDiv);
            bookContainer.appendChild(pagesDiv);
            bookContainer.appendChild(readDiv);
            bookContainer.appendChild(removeButton);


            removeButton.addEventListener("click", () => {
                bookContainer.removeChild(titleDiv);
                bookContainer.removeChild(authorDiv);
                bookContainer.removeChild(pagesDiv);
                bookContainer.removeChild(readDiv);
                bookContainer.removeChild(removeButton);
                myLibrary.splice(index, 1);
            });

            readDiv.addEventListener("click", () => {
                book.toggleRead();

                if(readDiv.textContent == "yes"){
                    readDiv.textContent = "no";
                }
                else {
                    readDiv.textContent = "yes";
                }
            });
        })
  }



  function displayToPage() {

  }



const formButton = document.createElement("button");
formButton.textContent = "Add Book";
body.appendChild(formButton);


const bookForm = document.createElement("form");
bookForm.setAttribute("action", "#");
bookForm.setAttribute("method", "post");


const bookTitleInput = document.createElement("input");
bookTitleInput.setAttribute("type", "text");
bookTitleInput.setAttribute("id", "title");
const bookTitleInputLabel = document.createElement("label");
bookTitleInputLabel.textContent = "Book Title";
bookTitleInputLabel.setAttribute("for", "title");



const bookAuthorInput = document.createElement("input");
bookAuthorInput.setAttribute("type", "text");
bookAuthorInput.setAttribute("id", "author");
const bookAuthorInputLabel = document.createElement("label");
bookAuthorInputLabel.textContent = "Book Author";
bookAuthorInputLabel.setAttribute("for", "author");



const bookPagesInput = document.createElement("input");
bookPagesInput.setAttribute("type", "number");
bookPagesInput.setAttribute("id", "pages");
const bookPagesInputLabel = document.createElement("label");
bookPagesInputLabel.textContent = "Book Pages";
bookPagesInputLabel.setAttribute("for", "pages");



const bookReadInput = document.createElement("input");
bookReadInput.setAttribute("type", "checkbox");
bookReadInput.setAttribute("id", "read");
bookReadInput.setAttribute("value", "yes");
const bookReadInputLabel = document.createElement("label");
bookReadInputLabel.textContent = "Book Read";
bookReadInputLabel.setAttribute("for", "read");

const bookSubmitButton = document.createElement("button");
bookSubmitButton.textContent = "Submit Book";










bookForm.appendChild(bookTitleInputLabel);
bookForm.appendChild(bookTitleInput);
bookForm.appendChild(bookAuthorInputLabel);
bookForm.appendChild(bookAuthorInput);
bookForm.appendChild(bookPagesInputLabel);
bookForm.appendChild(bookPagesInput);
bookForm.appendChild(bookReadInputLabel);
bookForm.appendChild(bookReadInput);
bookForm.appendChild(bookSubmitButton);







formButton.addEventListener("click", () => {
    body.appendChild(bookForm);
});


bookSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    myLibrary.push(new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookReadInput.value));
    console.log(myLibrary);
    body.removeChild(bookForm);
    addBookToLibrary();
})
