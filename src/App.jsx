import "./App.css";
import BookShelf from "./BookShelf";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from "./BooksAPI";

function App() {
  const [getBooks, setGetBooks] = useState([]);

  const ShowBooks = async () => {
    getAll().then((res) => {
      setGetBooks(res);
    });
  }

  const handleUpdate = async (book, event) => {
    await update(book, event).then(() => {
      getAll().then((res) => {
        setGetBooks(res);
      });
    })
  }

  useEffect(() => {
    ShowBooks();
  }, [handleUpdate]);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title={"Currently Reading"} query="currentlyReading"
              booksList={getBooks} handleUpdate={handleUpdate} />
          </div>
          <div>
            <BookShelf title={"Want to Read"} query="wantToRead"
              booksList={getBooks} handleUpdate={handleUpdate} />
          </div>
          <div>
            <BookShelf title={"Read"} query="read"
              booksList={getBooks} handleUpdate={handleUpdate}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="search" >
            <p >Add a book</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
