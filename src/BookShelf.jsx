import React from 'react'
import Book from './Book'

const BookShelf = ({ title, query, booksList, handleUpdate }) => {
    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksList.filter(book => book.shelf === query).map((book) => {
                            return <li key={book.id}>
                                <Book handleUpdate={handleUpdate} book={book}
                                    backgroundImage={`url(${book.imageLinks &&
                                        book.imageLinks.thumbnail})`}
                                    value={book.shelf ? book.shelf : 'none'} title={book.title}
                                    authors={book.authors && book.authors.join(', ')} />
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default BookShelf