import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import axios from 'axios';
// import { useLocation, Link, useParams } from 'react-router-dom';
import cat from '../images/catGif.gif';

import '../scss/styles.scss';
const Header = () => {

  const [value, setValue] = useState('');
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counterPagination, setCounterPagination] = useState(8)
  
  function buttonPress(e) {
    if (e.key === 'Enter' && value.length > 0) {
      searchBook(e.target.value);
    }
  }
  
  useEffect(() => {
    if (counterPagination !== 8) {
      searchBook()
    }
  }, [counterPagination])


  async function searchBook() {
    const key = 'key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY';
    setLoading(true);
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${value}&${key}&maxResults=${40}`)
      .then((elem) => {
        const data = elem.data.items
        setBook(data.filter(elem => elem.volumeInfo.imageLinks && elem.volumeInfo.authors && elem.volumeInfo.description).slice(0,counterPagination))
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log('Произошла ошибка... ' + err);
      });
  }

  return (
    <div className="header">
      {console.log(book)}
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
            type="submit"
            className="search__button"
            onClick={(e) => {
              if (value.length > 0) {
                searchBook();
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
                setCounterPagination(counterPagination =>  counterPagination += 4)
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
