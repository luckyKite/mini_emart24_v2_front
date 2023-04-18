import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { SearchState } from '../../state/SearchState';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CartCountState } from '../../state/CartCountState';
import style from './SearchList.module.css';
import ProductList from '../product/ProductList';


function SearchList({product}) {
  
  const searchResult  = useRecoilValue(SearchState); 
  
  const userId = 1;
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useRecoilState(CartCountState);


  const handleAddCart = () => {
    fetch(`http://localhost:8080/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        productId: product.id,
        qty: 1
      }),
    })
    .then((res) => {
      res.json();
      if (res.ok) {
        setCartCount(cartCount+1)
        alert(`${product.name}이/가 장바구니에 담겼습니다.`);
        navigate('/cart');
      } else {
        alert("서버 에러");
      }
    })
    .catch((err) => console.error(err)); 
  }

  return (
    <div className='container'>
      <p className={style.comment}>찾으시는 상품을 확인해보세요! 🔍 </p>
      {
        searchResult &&
        searchResult.map(item =>
          <ProductList key={item.id} product={item} showRating={false} />
        )
      }
    </div>
  );
}

export default SearchList;