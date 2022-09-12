import { Link } from "react-router-dom";

const CartItem = ({ book }) => {
  return (
    <>
      {book.filter(elem => elem.volumeInfo.imageLinks && elem.volumeInfo.authors && elem.volumeInfo.description ).map((item,i) => {
        const info = item.volumeInfo;
        const infoImage = item.volumeInfo.imageLinks;
        return (
          <Link to={`/cart/${item.id}`}>
            <div className="cart__item">
              <img
                className="cart__img"
                src={
                  infoImage.smallThumbnail 
                    ? infoImage.smallThumbnail
                    : infoImage.thumbnail 
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
