// Book constructor
function Book(title, author, isbn) {
    this.title  = title;
    this.author = author;
    this.isbn   = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e){
    e.preventDefault();
    
    // Get form values
    const   title   = document.querySelector('#title').value,
            author  = document.querySelector('#author').value,
            isbn    = document.querySelector('#isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();

    // Add book to list
    ui.addBookToList(book);
    // Clear fields
    ui.clearFields();
    
});
