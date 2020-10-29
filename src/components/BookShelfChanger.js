import React from 'react';
import PropTypes from 'prop-types';

/**
 * Menu for change shelf of the current book
 */
function BookShelfChanger(props) {

    const {shelf, onChangeShelf} = props

    return (
        <div className="book-shelf-changer">
            <select
                value={shelf}
                onChange={ (event) =>
                    onChangeShelf(event.target.value) }
            >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};


export default BookShelfChanger;