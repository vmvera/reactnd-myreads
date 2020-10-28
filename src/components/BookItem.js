import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from "./BookShelfChanger";


function BookItem(props) {
    const {book} = props

    const handleChangeShelf = (shelf) => {
        props.onChangeShelf(book.id, shelf)
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    { book.imageLinks !== undefined &&
                        <div className="book-cover" style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}/>
                    }
                    <BookShelfChanger
                        shelf={book.shelf || "none"}
                        onChangeShelf={handleChangeShelf}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors !== undefined ? book.authors.join(', ') : ''}</div>
            </div>
        </li>);
}

BookItem.propTypes = {
    book: PropTypes.object.isRequired
};


export default BookItem;