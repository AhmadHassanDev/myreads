import React from 'react'

const Book = ({ backgroundImage, value, title, authors, book, handleUpdate }) => {
    return (
        <div>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                backgroundImage,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={value} onChange={(event) => handleUpdate(book, event.target.value)}>
                            <option value="temp" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </div>
    )
}

export default Book