import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import BookItem from "./BookItem";
import PropTypes from "prop-types";

/**
 * @description Search books from remote api to allow them to be added to a shelf
 */
class Search extends Component {

    state = {
        query: '',
        newBooks: [],
        first: true
    };

    /**
     * @description Get books from the remote api
     * @param event change of shelf
     * @param currentBooks List of books returned by the search api
     */
    getBooks = (event, currentBooks) => {
        const query = event.target.value;
        this.setState({query});

        if (query) {
            BooksAPI.search(query.trim(), 20).then(books => {
                if (books.length > 0) {
                    books.map(book => {
                        const found = currentBooks.find(b => book.id === b.id)
                        book.shelf = (found !== undefined) ? book.shelf = found.shelf : book.shelf = 'none'
                        return book
                    })
                    this.setState({newBooks: books, first: false})
                } else {
                    this.setState({newBooks: [], first: false});
                }
            });
        } else this.setState({newBooks: []});
    }

    /**
     * Handler for the change of shelf in a book
     * @param id id of the book to be changed
     * @param shelf destination shelf of the book
     */
    handleChange(id, shelf) {
        let index = this.state.newBooks.findIndex(b => b.id === id)
        // Call the handler for the remote change of the shelf
        this.props.onChangeShelf(id, shelf);
        // Change the shelf of the book in the search books list
        this.setState(({newBooks}) => ({
            newBooks: [
                ...newBooks.slice(0,index),
                {
                    ...newBooks[index],
                    shelf: shelf,
                },
                ...newBooks.slice(index + 1)
            ]
        }));


    }

    render() {
        const {newBooks, first} = this.state;
        const {currentBooks} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.getBooks(e, currentBooks)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {!first && (
                        <div>
                            <h3>Search returned {newBooks.length} books </h3>
                            <ol className="books-grid">
                                {newBooks.map((book) => (
                                    <BookItem
                                        book={book}
                                        key={book.id}
                                        onChangeShelf={(id, shelf) => this.handleChange(id, shelf)}/>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired
};


export default Search;