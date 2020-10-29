import React from 'react';
import PropTypes from 'prop-types';
import Bookshelfs from "./Bookshelfs";
import {Link} from "react-router-dom";

/**
 * List of books of the authenticated user
 */
function ListBooks(props) {

    const {books, onChangeShelf} = props

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelfs
                        books={books}
                        onChangeShelf={onChangeShelf}
                    />
                </div>
            </div>

            <div className="open-search">
                <Link  to='/search'>
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default ListBooks;
