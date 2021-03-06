class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showAlert(message, className){
        // Create div
        const div = document.createElement('div');
        // Add class name
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
    
        // Get parent and form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        // Insert div
        container.insertBefore(div, form);
    
        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            ui.showAlert('Book successfully removed!', 'success');
        }
    }
}

// Local storage class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            return books = [];
        } else{
            return books = JSON.parse(localStorage.getItem('books'));
        }        
    }

    static displayBooks(){
        const books = this.getBooks();

        books.forEach(function(book){
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        if(book !== null){
            const books = this.getBooks();
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
    }

    static removeBook(target){
        if(target.className === 'delete'){
            const title     = target.parentElement.parentElement.children[0].textContent;
            const author    = target.parentElement.parentElement.children[1].textContent;
            const isbn      = target.parentElement.parentElement.children[2].textContent;
            
            const books = this.getBooks();
            books.forEach(function(book, index){
                if(book.title === title && book.author === author && book.isbn === isbn){
                    books.splice(index,1);
                }
            });

            localStorage.setItem('books', JSON.stringify(books));
        }        
    }
}

// Instantiate UI
const ui = new UI();

// Event Listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.querySelector('#book-form').addEventListener('submit', function(e){
    e.preventDefault();
    
    // Get form values
    const   title   = document.querySelector('#title').value,
            author  = document.querySelector('#author').value,
            isbn    = document.querySelector('#isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else{
        // Add alert
        ui.showAlert('Book added!', 'success');
        // Add book to list
        ui.addBookToList(book);
        // Add to LS
        Store.addBook(book);
        // Clear fields
        ui.clearFields();
    }    
});

document.querySelector('#book-list').addEventListener('click', function(e){
    ui.deleteBook(e.target);
    Store.removeBook(e.target);
    e.preventDefault();
});