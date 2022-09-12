import React, { useState } from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import { useLocation, Link, useParams } from 'react-router-dom';
import cat from '../images/catGif.gif';

import '../scss/styles.scss';
const Header = () => {
  const location = useLocation();
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(location);
  console.log(id);

  function buttonPress(e) {
    if (e.key === 'Enter' && value.length > 0) {
      searchBook(e.target.value);
    }
  }
  async function searchBook() {
    let pagination = 8;
    let maxResults = pagination;
    console.log(location);
    const key = 'key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY';
    setLoading(true);
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${value}&${key}&maxResults=${maxResults}`)
      .then((elem) => {
        setBook(elem.data.items.slice(0, pagination));
        setLoading(false);
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
            required
            placeholder="поиск книги..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyPress={buttonPress}
          />
          <button
            type='submit'
            className="search__button"
            onClick={(e) => {
              if (value.length > 0 ) {
                searchBook(value);
                setValue('');
              }
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
