import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import cat from '../images/котик2.jpeg';
import catGif from '../images/catGif.gif'

const FullCart = () => {
  const { id } = useParams();
  const [cart, setFullCart] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    async function fetchCart() {
      try {
        await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((data) => {
          setLoading(true)
          setFullCart(data.data);
          setText(
            data.data.volumeInfo.description
          );
          setLoading(false)
        });
      } catch (err) {
        setLoading(true)
        console.log('Произошла ошибка, повторите попытку позже :(', err);
      }
    }
    fetchCart();
  },[]);


  if (cart.length !== 0 && loading === false) {
    const cartInfo = cart.volumeInfo;
    const cartImage = cart.volumeInfo.imageLinks.thumbnail;
    return (
      <div className="container">
        <div className="cart__wrapper">
          {
            <Link to="/">
              <button className="close"
               >закрыть</button>
              </Link>
          }
          <div className="cart__left">
            <img className="cart__img" src={cartImage ? cartImage : cat} alt="not found" />
            <div className="cart__info">
              <p className="cart__authors">{cartInfo.authors ? cartInfo.authors.slice(0,2).join(', ') : ''}</p>
              <p className="cart__title">{cartInfo.title}</p>
              <p className="cart__subtitle">{cartInfo.subtitle}</p>
              <p className="cart__country">Язык - {cart.accessInfo.country}</p>
            </div>
          </div>
          <div className="cart__right">
            <h1 className='text__right'>{text ? text : 'Описание отсутствует :('}</h1>
          </div>
          <div className='wrapper__button'>
            <a className='more__button' href={cartInfo.previewLink}  target='_blank' rel="noreferrer" >подробнее</a>
          </div>
        

        </div>
          
      </div>
      
    );
  } else {
    return (
      <div className="container">
      <div className="cart__wrapper">
          <img src={catGif} alt="cat" />
        </div>
        </div>
    );
  }
};

export default FullCart;
