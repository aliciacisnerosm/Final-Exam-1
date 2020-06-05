import React from 'react';

function Book(props) {
  let results = props.results;
  if (props.results == '') {
    return <div></div>;
  }
  console.log(results.items[0].volumeInfo.title); //siempre alice
  let arrayResults = results.items;
  return (
    <div>
      {arrayResults.forEach((element) => {
        console.log(element);
        return (
          <div className="book-div">
            <h1>{element.volumeInfo.title}</h1>
            <img
              src={element.volumeInfo.imageLinks.smallThumbnail}
              alt="un libro"
            ></img>
            <h4> Author: {element.volumeInfo.authors[0]}</h4>
            <p>{element.searchInfo.textSnippet}</p>
          </div>
        );
      })}
      {}
    </div>
  );
}

export default Book;
