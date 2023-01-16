import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import cat from '../images/котик2.jpeg';
import catGif from '../images/catGif.gif';

import { useSelector, useDispatch } from 'react-redux';
import { setFullCart, setDeleteCart, setText } from '../redux/cartRendering/cartRenderingSlice';

import { setError, setErrorText, deleteInfo } from '../redux/requestSlices/requestSlices';

const FullCart = () => {
  const cart = useSelector((state) => state.cartRendering.cart),
    text = useSelector((state) => state.cartRendering.text);

  const dispatch = useDispatch();
  const { id } = useParams();
   const errorText = useSelector((state) => state.requestSlices.errorText);
  useEffect(() => {
    async function fetchCart() {
      try {
        await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((data) => {
          dispatch(setFullCart(data.data));
          dispatch(setText(data.data.volumeInfo.description));
        });
      } catch (err) {
        dispatch(setError());
        dispatch(setErrorText(err.message));
      }
    }
    fetchCart();
  }, []);

  if (cart.length !== 0) {
    const cartInfo = cart.volumeInfo;
    const cartImage = cart.volumeInfo.imageLinks.thumbnail;
    return (
      <div className="container">
        <div className="cart__wrapper">
          {
            <Link to="/">
              <button
                onClick={() => {
                  dispatch(setDeleteCart());
                  dispatch(deleteInfo())
                }}
                className="close">
                закрыть
              </button>
            </Link>
          }
          <div className="cart__left">
            <img className="cart__img" src={cartImage ? cartImage : cat} alt="not found" />
            <div className="cart__info">
              <p className="cart__authors">
                {cartInfo.authors ? cartInfo.authors.slice(0, 2).join(', ') : ''}
              </p>
              <p className="cart__title">{cartInfo.title}</p>
              <div className="wrapper__bottom-content">
                <div className="bottom__wrapper">
                  <p className="cart__published-date">
                    {cartInfo.publishedDate
                      ? cartInfo.publishedDate.replace(/-/g, '.').slice(0, 4)
                      : null}
                    г.
                  </p>
                  <p className="cart__country">Язык - {cart.accessInfo.country}</p>
                </div>
                <div className="cart__publishing">
                  <p>{cartInfo.publisher ? cartInfo.publisher.replace(/"/g, ' ') : null}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cart__right">
            <h1 className="text__right">{text ? new DOMParser().parseFromString(text,'text/html').body.textContent : 'Описание отсутствует :('}</h1>
          </div>
          <div className="wrapper__button">
            <a
              className="more__button"
              
              href={cartInfo.previewLink}
              target="_blank"
              rel="noreferrer">
              подробнее
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
          <div className="error__wrapper error__center">
            <img className="error__image " src={catGif} alt="" />
            <p className="text__error">{errorText}</p>
          </div>
      </div>
    );
  }
};

export default FullCart;
