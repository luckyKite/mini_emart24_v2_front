import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./ProductList.module.css";
import { CartCountState } from '../../state/CartCountState';
import { logInState } from '../../state/logInState';
import { useRecoilState, useecoilValue, useSetRecoilState } from 'recoil';

function ProductList({ product, showRating }) {
  const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useRecoilState(CartCountState);

  const handleAddCart = () => {
    console.log(product.id);
      fetch('http://localhost:8080/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: logInData.userId,
          productId: product.id,
          qty: 1 //장바구니에 담을 때 기본 1개로 담는 설정
        })
      })
      .then(res => {
        setCartCount(cartCount+1)
        alert(`${product.name}이/가 장바구니 추가되었습니다.`);
        navigate('/cart');
      })
      .catch(err => console.error(err));
  }

// 주문 버튼을 통해 주문 페이지로 이동
const handleOrder = () => {
  fetch(`http://localhost:8080/order/add`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: logInData.userId,
      productId: product.id,
      qty: 1
    })
  }).then(res => {
    console.log(res)
    if (res.ok) {
      alert('주문 완료')
      // window.location.reload();
    } else {
      alert("주문 실패")
    }
  })
  .catch(err => console.log(err))
}

  return (
    <div className={style.productListWrap}>
      { showRating && 
        <div className={style.rating}>
          <p>👍{product.rating}</p>
        </div>
      }
      <div className={style.image}>
        <Link to={`/productDetail/${product.id}`}>
          <img src={product.thumbnail} alt={product.description} />
        </Link>
      </div>
      <div className={style.productInfo}>
        <p className={style.name}>{product.name}</p>
        <p className={style.price}>{product.price.toLocaleString('en-US')}원</p>
      </div>
      <div className={style.cartBtnWrap}>
        <button onClick={handleOrder} className={style.order}>주문</button>
        <button onClick={handleAddCart} className={style.cartBtn}>담기</button>
      </div>
    </div>
  );
}

export default ProductList;