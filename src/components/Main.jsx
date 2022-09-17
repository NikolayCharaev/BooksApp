import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import cat from '../images/catGif.gif';
import catError from '../images/catError.gif';

import { setLoading,setError,setErrorText, setCounterPagination, setBook, setValue } from '../redux/mainSlices/mainSlice';
import { useSelector, useDispatch } from 'react-redux';

import '../scss/styles.scss';
const Header = () => {

  const loading = useSelector(state => state.mainSlices.loading)
  const error = useSelector(state => state.mainSlices.error)
  const errorText = useSelector(state => state.mainSlices.errorText)
  const counterPagination = useSelector(state => state.mainSlices.counterPagination)
  const value = useSelector(state => state.mainSlices.value)
  // const book = useSelector(state => state.mainSlices.book)
  
  const dispatch = useDispatch()



  // const [value, setValue] = useState('');
  const [book, setBook] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [errorText, setErrorText] = useState('')
  // const [counterPagination, setCounterPagination] = useState(8);

  function buttonPress(e) {
    if (e.key === 'Enter' && value.length > 0) {
      searchBook(e.target.value);
      // setValue('')
      dispatch(setValue(''))
    }
  }

  useEffect(() => {
    if (counterPagination !== 8) {
      searchBook();
    }
  }, [counterPagination]);

  async function searchBook() {
    const key = 'key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY';
    // setLoading(true);
    dispatch(setLoading())
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${value}&${key}&maxResults=${40}`)
      .then((elem) => {
        const data = elem.data.items;
      setBook(
          data
            .filter(
              (elem) =>
                elem.volumeInfo.imageLinks &&
                elem.volumeInfo.authors &&
                elem.volumeInfo.description,
            )
            .slice(0, counterPagination),
        );
        // setLoading(false);
        dispatch(setLoading())
      })
      .catch((err) => {
        dispatch(setLoading()) // cat
        dispatch(setErrorText('Произошла ошибка... ' + err))
        dispatch(setError()) // cat
        dispatch(setValue(''))
        setTimeout(() => {
          dispatch(setError())
        },5000)
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
            maxLength="20"
            onChange={(e) => {
              // setValue(e.target.value);
              dispatch(setValue(e.target.value))
            }}
            onKeyPress={buttonPress}
          />
          <button
            type="submit"
            className="search__button"
            onClick={(e) => {
              if (value.length > 0) {
                searchBook();
                // setValue('');
              }
            }}>
            найти
          </button>
        </div>

        <div className={book.length > 0 ? 'cart' : ''}>
          {loading === true ? <img className="center " src={cat} alt="" /> : null 
          || 
          error === true ? 
          <div className='error__wrapper'>
          <img className="error__image" src={catError} alt="" />  
          <p className='text__error'>{errorText}</p>
          </div>
          : null }
          <div className="cart__inner">
            <CartItem book={book} />
          </div>
          {book.length > 0 ? (
            <button
              className="more__button"
              onClick={() => {
                dispatch(setCounterPagination())
                // setCounterPagination((counterPagination) => (counterPagination += 4));
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
