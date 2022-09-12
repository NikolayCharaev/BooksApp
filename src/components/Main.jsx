import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import cat from '../images/котик2.jpeg';
import { useLocation, Link, useParams } from 'react-router-dom';
import FullCart from './FullCart';

import '../scss/styles.scss';
const Header = () => {
  const location = useLocation();

  const [value, setValue] = useState('');
  const [book, setBook] = useState([]);
  const [id,setId] = useState('')

  const searchBook = (elem) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY`,
      )
      .then((elem) => setBook(elem.data.items))
      .catch((err) => console.log('Произошла ошибка... ' + err));
  };
  return (
    <div className="header">
      <div className="container">
        <div className="header__top">
          <input
            className="search__input"
            type="text"
            placeholder="поиск книги..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="search__button"
            onClick={() => {
              searchBook(value);
              setValue('');
            }}>
            найти
          </button>
        </div>
          <div className="cart">
            <div className="cart__inner">
              <CartItem book={book} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Header;
