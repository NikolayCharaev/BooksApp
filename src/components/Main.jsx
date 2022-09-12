import React, { useEffect, useState, Component } from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import { useLocation, Link, useParams } from 'react-router-dom';
import Test from './ResponceServer';
import cat from '../images/catGif.gif';

import '../scss/styles.scss';
const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState('');
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  function buttonPress(e) {
    if (e.key === 'Enter') {
      searchBook(e.target.value);
    }
  }
  function searchBook() {
    let maxResults = 40;
    let pagination = 8;
    const key = 'key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY';
    console.log(location);
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${value}&${key}&maxResults=${maxResults}`)
      .then((elem) => {
        console.log(loading)
        setBook(elem.data.items.slice(0, pagination));
        setLoading(false);
        console.log(loading)
      })
      .then((pagination += 8))
      .catch((err) => {
        setLoading(true);
        console.log('Произошла ошибка... ' + err);
      });
  }
  return (
    <div className="header">
      <div className="container">
        <div className={book.length > 0 ? 'header__top' : 'header__center'}>
          <input
            className="search__input"
            type="text"
            placeholder="поиск книги..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={buttonPress}
          />
          <button
            className="search__button"
            onClick={(e) => {
              searchBook(value);
              setValue('');
            }}>
            найти
          </button>
        </div>

        <div className={book.length > 0 ? 'cart' : ''}>
          {loading === true ? <img className="center " src={cat} alt="" /> : null}
          <div className="cart__inner">
            <CartItem book={book} />
          </div>
          {book.length > 0 ? (
            <button
              className="more__button"
              onClick={() => {
                searchBook();
              }}>
              еще
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
