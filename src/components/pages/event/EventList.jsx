import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "./EventList.module.css";
import { logInState } from '../../state/logInState';
import { CartCountState } from '../../state/CartCountState';
import { useRecoilState, useecoilValue, useSetRecoilState } from 'recoil';

function EventList({product}) {

  const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useRecoilState(CartCountState);
  const [productData, setProductData] = useState(product);

  const handleAddCart = () => {
    fetch(`http://localhost:8080/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: logInData.userId,
        productId: product.id,
        qty: 1
      }),
    })
    .then((res) => {
      res.json();
      if (res.ok) {
        setCartCount(cartCount+1)
        alert(`상품을 장바구니에 추가합니다.`);
        navigate('/cart');
      } else {
        alert("서버 에러");
      }
    })
    .catch((err) => console.error(err));
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
        if (res.ok) {
          alert('주문 완료')
          window.location.reload();
        } else {
          alert("주문 실패")
        }
      })
      .catch(err => console.log(err))
    }

  return (
    <div className={style.eventListWrap}>
      { productData && (
        <>
        <div className={style.rating}>
          <p>👍{productData.rating}</p>
        </div>
        <div className={style.image}>
          <Link to= {`/productDetail/${productData.id}`}>
            <img src={productData.thumbnail} alt={productData.description} />
          </Link>   
        </div>
        <div className={style.productInfo}>
          <p className={style.name}>{productData.name}</p>
          <p className={style.price}>{productData.price.toLocaleString('en-US')}원</p>
        </div>
        <div className={style.cartBtnWrap}>
          <button onClick={handleOrder} className={style.order}>주문</button>
          <button onClick={handleAddCart} className={style.cartBtn}>담기</button>
        </div>
        </>
      )}
    </div>
  );
}

export default EventList;