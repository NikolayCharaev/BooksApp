import { Link } from "react-router-dom";

const CartItem = ({book}) => {
  return (
    <>
      {
      book.map((item,i)=> {
        const info = item.volumeInfo;
        const infoImage = item.volumeInfo.imageLinks;
        return (
          <Link className='full__cart-link' to={`/cart/${item.id}`} key={i}>
            <div className="cart__item" >
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
                  {info.authors ? info.authors.slice(0,2).join(', ') : 'не найдено автора :('}
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
