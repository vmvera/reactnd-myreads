import React from 'react';
import PropTypes from 'prop-types';
import BookItem from "./BookItem";

/**
 * Set of shelves containing the books of the current user
 */
function Bookshelfs(props) {

    const {books, onChangeShelf} = props

    const bookshelfs = [...new Set(
        books.map((book) => {
            return book.shelf;
        })
    )]

    const bookshelfsLabels = {
        currentlyReading:'Currently reading',
        wantToRead:'Want to read',
        read:'Read',
        other:'Other'
    }

    return (
        <div>
            {bookshelfs.map((bookshelf) => (
                <div className="bookshelf" key={bookshelf}>
                    <h2 className="bookshelf-title">{bookshelfsLabels[bookshelf]}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                                {books.filter((book) =>
                                    book.shelf === bookshelf)
                                    .map((book) => (
                                    <BookItem
                                        book={book}
                                        key={book.id}
                                        onChangeShelf={onChangeShelf} />
                                ))}
                        </ol>
                    </div>
                </div>
            ))}
        </div>
    );
}

Bookshelfs.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};


export default Bookshelfs;