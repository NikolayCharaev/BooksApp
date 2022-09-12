import { Link } from "react-router-dom";

const CartItem = ({ book }) => {
  console.log('BOOK', book);
  return (
    <>
      {book.map((item, i) => {
        // console.log('BOOK ITEM', item);
        const info = item.volumeInfo;
        return (
          <Link to={`/cart/${item.id}`}>
            <div className="cart__item">
              <img
                className="cart__img"
                src={
                  info.imageLinks.smallThumbnail 
                    ? info.imageLinks.smallThumbnail
                    : info.imageLinks.thumbnail
                }
                alt="котик"
              />
              <div className="cart__content">
                <h3 className="cart__title">
                  {info.authors ? info.authors : 'не найдено автора :('}
                </h3>
                <p className="cart__description">
                  {info.description
                    ? info.description.slice(0, 100) + '...'
                    : 'У этой книжки нет описания :('}
                </p>
              </div>
            </div>
            </Link>
        );
      })}
    </>
  );
};

export default CartItem;
