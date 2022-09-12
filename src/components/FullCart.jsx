import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import cat from '../images/котик2.jpeg';

const FullCart = () => {
  const params = useParams();
  const { id } = useParams();
  const [cart, setFullCart] = useState([]);
  const [text, setText] = useState('');
  
  useEffect(() => {
    async function fetchCart() {
      try {
        await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((data) => {
          console.log('data-then', data);
          setFullCart(data.data);
          setText(
            data.data.volumeInfo.description
          );
        });
      } catch (err) {
        console.log('Произошла ошибка, повторите попытку позже :(', err);
      }
    }
    fetchCart();
  }, []);

  if (cart.length != 0) {
    const cartInfo = cart.volumeInfo;
    const cartImage = cart.volumeInfo.imageLinks.thumbnail;
    return (
      <div className="container">
        <div className="cart__wrapper">
          {
            <Link to="/">
              <button className="close">назад</button>
            </Link>
          }
          <div className="cart__left">
            <img className="cart__img" src={cartImage ? cartImage : cat} alt="not found" />
            <div className="cart__info">
              <p className="cart__authors">{cartInfo.authors ? cartInfo.authors.join(' / ') : ''}</p>
              <p className="cart__title">{cartInfo.title}</p>
              <p className="cart__subtitle">{cartInfo.subtitle}</p>
              <p className="cart__country">Язык - {cart.accessInfo.country}</p>
            </div>
          </div>
          <div className="cart__right">
            <h1 className='text__right'>{text ? text : 'Описание отсутствует :('}</h1>
          </div>
        </div>
      </div>
      
    );
  } else {
    return <h1>Загрузка....</h1>;
  }
};

export default FullCart;
