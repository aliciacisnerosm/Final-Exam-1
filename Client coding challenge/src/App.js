import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: 'https://www.googleapis.com/books/v1/volumes',
    };
  }

  render() {
    return (
      <div>
        <BookForm url={this.state.apiUrl} />
      </div>
    );
  }
}

export default App;
