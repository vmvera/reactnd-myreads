import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import BookItem from "./BookItem";
import PropTypes from "prop-types";

class Search extends Component {

    state = {
        query: '',
        newBooks: [],
        first: true
    };

    getBooks = (event, currentBooks) => {
        const query = event.target.value;
        this.setState({query});

        if (query) {
            BooksAPI.search(query.trim(), 20).then(books => {
                if (books.length > 0) {
                    books.map(book => {
                        let finded = currentBooks.find(f => book.id === f.id)
                        book.shelf = (finded !== undefined) ? book.shelf = finded.shelf : book.shelf = 'none'
                        return book
                    })
                    this.setState({newBooks: books, first: false})
                } else {
                    this.setState({newBooks: [], first: false});
                }
            });
        } else this.setState({newBooks: []});
    }

    handleClick(id, shelf) {
        let index = this.state.newBooks.findIndex(b => b.id === id)
        this.props.onChangeShelf(id, shelf);
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
                                        onChangeShelf={(id, shelf) => this.handleClick(id, shelf)}/>
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