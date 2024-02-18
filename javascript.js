//for the add book on our page, when people click it, it will show the modal
const dialog = document.querySelector("dialog");
const addBtn = document.getElementById("addBook");
addBtn.addEventListener("click", () => {
    dialog.showModal(); 
});


//for the close button in the modal that will close the modal 
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
    dialog.close();
});


// reset form
function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}


// when you submit the form
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, read);
    shelf.innerText = "";
    displayBooks();

    resetForm();
});


// to read and unread
const readBtn = document.getElementsByClassName("read-button");
function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
} 


//removing a book from the library
const deleteBtn = document.getElementsByClassName("delete-button");
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}


// our library will be an empty array which we will use to add books to it. 
const myLibrary = [];
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


//creates elements to display the book as cards
const shelf = document.getElementById("shelf");
function displayBooks() {
    shelf.innerText = "";

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.dataset.index = index;
    
        const title = document.createElement("h3");
        title.innerText = book.name;
        
        const author = document.createElement("p");
        author.innerText = `By ${book.author}`;
        
        const pages = document.createElement("p");
        pages.innerText = `${book.pages} pages`;
        
        const readBtn = document.createElement("button");
        readBtn.innerText = book.read ? "Read" : "Unread";
        readBtn.classList.add(book.read ? "btn-read" : "btn-unread");
        readBtn.addEventListener("click", () => toggleRead(index));
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => removeBook(index));

        const buttonGroup = document.createElement("div");
        const infoGroup = document.createElement("div");

        shelf.appendChild(card).className = "card";
        card.appendChild(infoGroup).className = "info-group"
        card.appendChild(buttonGroup).className = "button-group";
        infoGroup.appendChild(title).className = "title";
        infoGroup.appendChild(author).className = "author";
        infoGroup.appendChild(pages).className = "pages";
        buttonGroup.appendChild(readBtn);
        buttonGroup.appendChild(deleteBtn).className = "delete-button";
    });
}

addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, true);
addBookToLibrary("When Breath Becomes Air", "Paul Kalanithi", 228, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 496, false);

displayBooks();