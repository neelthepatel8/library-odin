// Elements
let newBookBtn = document.querySelector(".create-new-book");
const formErrors = document.querySelector(".form-errors");
const formDiv = document.querySelector(".book-form-div");
const form = document.querySelector(".book-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submitBtn = document.getElementById("add-book");
const closeBtn = document.querySelector(".close");
const bookSubmitted = document.querySelector(".book-submitted");


const viewBooks = document.getElementById("view-books");
const libraryDiv = document.querySelector(".library");

//card elements:

const books = document.createElement("div");
books.classList = "book-cards";

const libCloseBtn = document.createElement("button");
libCloseBtn.textContent = "x";
libCloseBtn.classList = "button close";

// Event Listeners:
newBookBtn.addEventListener("click", createNewBookForm);
submitBtn.addEventListener("click", addBookToLibrary);
viewBooks.addEventListener("click", displayLibrary);
closeBtn.addEventListener("click", closeWindow);
libCloseBtn.addEventListener("click", closeLibrary);

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let readText = read ? "already read" : "not read yet";
    return `${title} by ${author}, ${pages} pages, ${readText}.`;
  };
}

function addBookToLibrary(e) {
  e.preventDefault();

  // Form Validation:
  if (isFormValid()) {
    const newBook = new Book(
      title.value,
      author.value,
      pages.value,
      read.checked
    );
    myLibrary.push(newBook);
    const newBookCard = createBookCard(newBook);
    books.appendChild(newBookCard);
    bookSubmitted.textContent = `${newBook.title} Added!`;
    resetForm();
    

  }


  console.log(myLibrary);
}

function isFormValid() {
    let messages = [];

  if (title.value.length === 0) messages.push("Book needs a title");
  if (author.value.length === 0) messages.push("Book needs an author");
  if (messages.length != 0) {
    formErrors.innerHTML = "<p>" + messages.join("<p></p>") + "</p>";
    return false;
  } else return true;
    
}

function createBookCard(book) {
  let card = document.createElement("div");
  card.classList = "card";

  let cardTitle = document.createElement("p");
  cardTitle.classList = "card-element card-title";
  cardTitle.textContent = book.title;

  let cardAuthor = document.createElement("p");
  cardAuthor.classList = "card-element card-author";
  cardAuthor.textContent = book.author;

  let cardPages = document.createElement("p");
  cardPages.classList = "card-element card-pages";
  cardPages.textContent = book.pages;

  let cardRead = document.createElement("button");
  cardRead.classList = "card-element card-read";
  cardRead.style.backgroundColor = book.read ? "green" : "red";
  cardRead.textContent = book.read ? "Read" : "Not Read";

  let bookDeleterBtn = document.createElement("button");
  bookDeleterBtn.textContent = "x";
  bookDeleterBtn.classList = "button close";

  cardRead.addEventListener("click", changeBookStatus);
  function changeBookStatus(){
    let notRead = cardRead.textContent == "Not Read";
    cardRead.style.backgroundColor = notRead ? "green" : "red";
    cardRead.textContent = notRead ? "Read" : "Not Read";
    book.read = notRead ? true : false;
  }

  bookDeleterBtn.addEventListener("click", removeBook);
  function removeBook(e){
    books.removeChild(e.path[1]);

    let index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);

    if (books.childElementCount === 0) closeLibrary();
    // books.removeChild(e.)
  }

  let cardElements = document.getElementsByClassName(".card-element");

  // display all elements in a column style

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardRead);
  card.appendChild(bookDeleterBtn);

  return card;
}

function createNewBookForm() {
  formDiv.style.display = "";
  bookSubmitted.textContent = "";
}

function closeWindow() {
  formDiv.style.display = "none";
  resetForm();
}
function resetForm() {
  title.value = null;
  author.value = null;
  pages.value = null;
  read.checked = false;
  formErrors.innerHTML = "";
}
function displayLibrary() {
    libraryDiv.appendChild(libCloseBtn);
  libraryDiv.appendChild(books);

      if (books.childElementCount === 0) closeLibrary();
}



function closeLibrary() {
  libraryDiv.removeChild(libCloseBtn);
  libraryDiv.removeChild(books);
}

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 234, true);
const book2 = new Book("Brooklyn 99", "RR Martin", 886, false);
// const book3 = new Book("How to get away with a murder", "Neel Patel", 121, true);
// const book4 = new Book("The Chronicles of Narnia", "JK Rowling", 652, true);
// const book5 = new Book("Fly High", "Windsor Fellow", 544, false);

myLibrary.push(book1);
myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);
// myLibrary.push(book5);
