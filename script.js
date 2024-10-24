const body = document.querySelector("body");
const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read == "yes") {
    return (this.read = "no");
  } else {
    return (this.read = "yes");
  }
};

const bookContainer = document.querySelector(".book-container");

function addBookToLibrary() {
  if (myLibrary.length > 1) {
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

      if (readDiv.textContent == "yes") {
        readDiv.textContent = "no";
      } else {
        readDiv.textContent = "yes";
      }
    });
  });
}

function displayToPage() {}

const formButton = document.createElement("button");
formButton.textContent = "Add Book";
body.appendChild(formButton);

const bookForm = document.createElement("form");
bookForm.setAttribute("action", "#");
bookForm.setAttribute("method", "post");
bookForm.noValidate = true;

const bookTitleInput = document.createElement("input");
bookTitleInput.setAttribute("type", "text");
bookTitleInput.setAttribute("id", "title");
bookTitleInput.setAttribute("required", "");
const bookTitleInputLabel = document.createElement("label");
bookTitleInputLabel.textContent = "Book Title";
bookTitleInputLabel.setAttribute("for", "title");

const bookTitleError = document.createElement("span");
bookTitleError.classList.add("book-title-error");
bookTitleError.classList.add("error");

const bookAuthorInput = document.createElement("input");
bookAuthorInput.setAttribute("type", "text");
bookAuthorInput.setAttribute("id", "author");
bookAuthorInput.setAttribute("required", "");
const bookAuthorInputLabel = document.createElement("label");
bookAuthorInputLabel.textContent = "Book Author";
bookAuthorInputLabel.setAttribute("for", "author");

const bookAuthorError = document.createElement("span");
bookAuthorError.classList.add("book-author-error");
bookAuthorError.classList.add("error");

const bookPagesInput = document.createElement("input");
bookPagesInput.setAttribute("type", "number");
bookPagesInput.setAttribute("id", "pages");
bookPagesInput.setAttribute("required", "");
bookPagesInput.setAttribute("min", "200");
const bookPagesInputLabel = document.createElement("label");
bookPagesInputLabel.textContent = "Book Pages";
bookPagesInputLabel.setAttribute("for", "pages");

const bookPagesErrorRequired = document.createElement("span");
bookPagesErrorRequired.classList.add("book-pages-error-required");
bookPagesErrorRequired.classList.add("error");

const bookPagesErrorMin = document.createElement("span");
bookPagesErrorMin.classList.add("book-pages-error-min");
bookPagesErrorMin.classList.add("error");

const bookReadInput = document.createElement("input");
bookReadInput.setAttribute("type", "checkbox");
bookReadInput.setAttribute("id", "read");
const bookReadInputLabel = document.createElement("label");
bookReadInputLabel.textContent = "Book Read";
bookReadInputLabel.setAttribute("for", "read");

const bookSubmitButton = document.createElement("button");
bookSubmitButton.textContent = "Submit Book";

bookForm.appendChild(bookTitleInputLabel);
bookForm.appendChild(bookTitleInput);
bookForm.appendChild(bookTitleError);
bookForm.appendChild(bookAuthorInputLabel);
bookForm.appendChild(bookAuthorInput);
bookForm.appendChild(bookAuthorError);
bookForm.appendChild(bookPagesInputLabel);
bookForm.appendChild(bookPagesInput);
bookForm.appendChild(bookPagesErrorRequired);
bookForm.appendChild(bookPagesErrorMin);
bookForm.appendChild(bookReadInputLabel);
bookForm.appendChild(bookReadInput);
bookForm.appendChild(bookSubmitButton);

bookTitleInput.addEventListener("input", () => {
  if (bookTitleInput.validity.valid) {
    bookTitleError.textContent = "";
  } else {
    showError();
  }
});

bookAuthorInput.addEventListener("input", () => {
  if (bookAuthorInput.validity.valid) {
    bookAuthorError.textContent = "";
  } else {
    showError();
  }
});

bookPagesInput.addEventListener("input", () => {
  if (bookPagesInput.validity.valid) {
    bookPagesErrorRequired.textContent = "";
    bookPagesErrorMin.textContent = "";
  } else {
    showError();
  }
});

function showError() {
  if (bookTitleInput.validity.valueMissing) {
    bookTitleError.textContent = "Book Title Is Required";
  }

  if (bookAuthorInput.validity.valueMissing) {
    bookAuthorError.textContent = "Book Author Is Required";
  }

  if (bookPagesInput.validity.valueMissing) {
    bookPagesErrorRequired.textContent = "Book Pages Is Required";
  }

  if (bookPagesInput.validity.rangeUnderflow) {
    bookPagesErrorMin.textContent = "Book Pages Must be Above 200";
  }
}

formButton.addEventListener("click", () => {
  body.appendChild(bookForm);
});

bookSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    !bookTitleInput.validity.valid ||
    !bookAuthorInput.validity.valid ||
    !bookPagesInput.validity.valid
  ) {
    showError();
    event.preventDefault();
  } else {
    if (bookReadInput.checked) {
      bookReadInput.setAttribute("value", "yes");
    } else {
      bookReadInput.setAttribute("value", "no");
    }

    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;
    let bookRead = bookReadInput.value;

    myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead));

    console.log(myLibrary);
    body.removeChild(bookForm);
    addBookToLibrary();
  }
});
