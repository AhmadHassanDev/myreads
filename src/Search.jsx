import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { search, getAll, update } from "./BooksAPI";
import Book from './Book'


const Search = () => {
    const [results, setResults] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [updatedResult, setUpdatedResult] = useState([]);
    const [emptyState, setEmptyState] = useState('');

    const getMyBooks = async () => {
        getAll().then((res) => {
            setMyBooks(res);
        })
    }

    const handleSearch = (event, maxResults) => {
        if (event.length > 0) {
            search(event, maxResults).then((res) => {
                setResults(res);
                console.log(res)
            })
        } else if (event.length === 0) {
            setResults([]);
        }
    }

    const handleUpdate = async (book, event) => {
        await update(book, event).then(() => {
            getAll().then((res) => {
                setMyBooks(res);
            });
        })
    }

    const updatedBooks = () => {
        if (results !== undefined && results.length) {
            setUpdatedResult(
                results.map(book => {
                    myBooks.map(b => {
                        if (b.id === book.id) {
                            book.shelf = b.shelf;
                        } else if (b.id !== book.id) {

                        }
                        return b;
                    })
                    return book;
                }));
        } else {
            setUpdatedResult("No Data To Show!");
        }
    };

    useEffect(() => {
        getMyBooks();
        updatedBooks();
    }, [results, myBooks]);


    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" >
                    <p className="close-search"> Close</p>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(event) => {
                            handleSearch(event.target.value.trim(), 20);
                            emptyState.trim().length === 0 ? setUpdatedResult('notempty') :
                                setEmptyState("fady")
                        }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {updatedResult.map !== undefined && emptyState !== "notempty" ?
                        updatedResult.map((book) => {
                            return <li key={book.id}>
                                <Book handleUpdate={handleUpdate} book={book}
                                    backgroundImage={`url(${book.imageLinks &&
                                        book.imageLinks.thumbnail})`}
                                    value={book.shelf ? book.shelf : 'none'}
                                    title={book.title}
                                    authors={book.authors && book.authors.join(', ')} />
                            </li>
                        }) : "No Data To Show!"}
                </ol>
            </div>
        </div>
    )
}

export default Search