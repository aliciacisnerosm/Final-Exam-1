import React from 'react';
import './App.css';
import Book from './Book';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      apiUrl: this.props.url,
      results: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onchangeTerm = this.onchangeTerm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let url = `${this.state.apiUrl}?q=${this.state.term}`;
    let settings = {
      method: 'GET',
    };
    fetch(url, settings)
      .then((booksGoogle) => {
        if (booksGoogle.ok) {
          return booksGoogle.json();
        }
        throw new Error(booksGoogle.message);
      })
      .then((jsonGoogleBooks) => {
        this.setState({ results: jsonGoogleBooks });
      })
      .catch((err) => {
        this.setState({ err: err });
      });
  }
  onchangeTerm(e) {
    console.log(e);
    //console.log(e);
    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Books form</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="term"> Search for a term</label>
          <input
            onChange={this.onchangeTerm}
            type="text"
            id="term-id"
            name="term"
          />
          <button type="submit"> search</button>
        </form>
        <Book results={this.state.results}></Book>
      </div>
    );
  }
}

export default BookForm;
