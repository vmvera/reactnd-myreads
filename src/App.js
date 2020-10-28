import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from "./components/ListBooks";
import { Route, Switch } from "react-router-dom";
import Search from "./components/Search";

class BooksApp extends React.Component {
    state = {
        books: [],
        showSearchPage: false,
    }

    updateBooks = () => (
            BooksAPI.getAll().then((books) => {
                this.setState(() => ({
                    books
                }));
            })
    )

    componentDidMount() {
        this.updateBooks()
    }


    handleChangeShelf = (bookId, shelf) => {
        console.log('change', bookId, shelf)
        BooksAPI
            .update(bookId, shelf)
            .then((result) => {
                console.log('result', result)
            })
            .then(() => (
                this.updateBooks()
            ))
    }


    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        path="/search"
                        render={() => (
                            <Search
                                currentBooks={this.state.books}
                                onChangeShelf={this.handleChangeShelf}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="list-books">
                                <ListBooks
                                    books={this.state.books}
                                    onChangeShelf={this.handleChangeShelf}
                                />
                            </div>
                        )}
                    />
                </Switch>

            </div>
        )
    }
}

export default BooksApp
