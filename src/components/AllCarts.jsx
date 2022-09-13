import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cat from '../images/catGif.gif';
import CartItem from './CartItem';
// {loading,cat,book,setCounterPagination}

const AllCarts = ({ value }) => {
  console.log(value);

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counterPagination, setCounterPagination] = useState(8);

  //   function buttonPress(e) {
  //     if (e.key === 'Enter' && value.length > 0) {
  //       searchBook(e.target.value);
  //     }
  //   }
  useEffect(() => {
    if (counterPagination !== 8) {
      searchBook();
    }
  }, [counterPagination]);

  async function searchBook() {
    const key = 'key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY';
    setLoading(true);
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&${key}&maxResults=${counterPagination}`,
      )
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log('Произошла ошибка... ' + err);
      });
  }
  return (
    // <div className={book.length > 0 ? 'cart' : ''}>
    <div className="cart">
      {loading === true ? <img className="center " src={cat} alt="" /> : null}
      <div className="cart__inner">
        <CartItem book={book} />
      </div>
      {/* {book.length > 0 ? ( */}
      <button
        className="more__button"
        onClick={() => {
          searchBook();

          setCounterPagination((counterPagination) => (counterPagination += 4));
        }}>
        еще
      </button>
      {/* ) : null} */}
    </div>
  );
};

export default AllCarts;
