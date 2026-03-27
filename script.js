const myLibrary = []

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constuctor");
    }
    
    this.id = self.crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        console.log(`${title} by ${author}, ${pages} pages, ${read}`);
    }
}

function getBooks() {
    for (let book of myLibrary) {
        const newBook = document.createElement('div');
        const footerPartBook = document.createElement('div');
        footerPartBook.className = 'footer-part-book';
        newBook.classList.add('book', `book-${myLibrary.indexOf(book)}`);
        myBooks.appendChild(newBook);
        for (let key in book) {
            if (key === "pages") {
                const parameter = document.createElement('div');
                parameter.className = key;
                parameter.textContent = `Number of pages: ${book[key]}`;
                newBook.appendChild(parameter);
            } else if (key === "read") {
                const parameter = document.createElement('div');
                const label = document.createElement('label');
                const input = document.createElement('input');
                parameter.className = key;
                label.setAttribute('for', `read-${myLibrary.indexOf(book)}`);
                input.setAttribute('type', 'checkbox');
                input.setAttribute('id', `read-${book}`);
                input.setAttribute('name', `read-${book}`);
                label.textContent = "Read?";
                input.checked = book[key];
                input.addEventListener('change', (event) => {
                    myLibrary[myLibrary.indexOf(book)]["read"] = event.target.checked;
                })
                footerPartBook.appendChild(parameter);
                parameter.appendChild(label);
                label.appendChild(input);
            } else if (key !== "id" && key !== 'info') {
                const parameter = document.createElement('div');
                parameter.className = key;
                parameter.textContent = book[key];
                newBook.appendChild(parameter);
            }
        }
        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.className = "deleteBook";
        deleteBookBtn.textContent = "Delete";
        footerPartBook.appendChild(deleteBookBtn);
        deleteBookBtn.addEventListener('click', () => {
            myBooks.removeChild(newBook);
            myLibrary.pop(myLibrary.indexOf(book));
        })
        newBook.appendChild(footerPartBook)
    }
}

const content = document.querySelector(".content");
const myBooks = document.querySelector(".my-books");
const newBookBtn = document.querySelector(".new-book");
const createNewBookDialog = document.querySelector(".create-new-book-dialog");
const createNewBookBtn = document.querySelector(".create-new-book");
const cancelBtn = document.querySelector(".cancel");



newBookBtn.addEventListener('click', () => {
    createNewBookDialog.showModal();
})

createNewBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const nameNewBook = document.querySelector("#name-new-book");
    const authorNewBook = document.querySelector("#author-new-book");
    const pagesNewBook = document.querySelector("#pages-new-book");
    const readNewBook = document.querySelector("#read-new-book");
    if (nameNewBook.value !== "" && authorNewBook.value !== "" && pagesNewBook.value !== "") {
        myLibrary.push(new Book(nameNewBook.value, authorNewBook.value, pagesNewBook.value, readNewBook.checked));
        myBooks.innerHTML = "";
        getBooks();
        nameNewBook.value = "";
        authorNewBook.value = "";
        pagesNewBook.value = "";
        readNewBook.checked = false;
        createNewBookDialog.close();
    }
})

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const nameNewBook = document.querySelector("#name-new-book");
    const authorNewBook = document.querySelector("#author-new-book");
    const pagesNewBook = document.querySelector("#pages-new-book");
    const readNewBook = document.querySelector("#read-new-book");
    nameNewBook.value = "";
    authorNewBook.value = "";
    pagesNewBook.value = "";
    readNewBook.checked = false;
    createNewBookDialog.close();
})