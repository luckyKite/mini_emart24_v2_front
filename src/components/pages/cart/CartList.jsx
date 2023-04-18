import React, { useEffect, useState } from 'react';
import style from "./CartList.module.css";
import { useRecoilState } from 'recoil';
import { CartCountState } from '../../state/CartCountState';

const CartList = ({cart}) => {

  const [cartQty, setCartQty] = useRecoilState(CartCountState);

  const[cartObj, setCartObj] = useState(
    {
      id: cart.id,
      userId: cart.user.id,
      productId: cart.product.id,
      productImg: "",
      productName: "",
      productPrice: 0,
      qty: cart.qty,
    }
  );

  const url = `http://localhost:8080/products/${cart.product.id}`;

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setCartObj({
        ...cartObj,
        productImg: data.thumbnail,
        productName: data.name,
        productPrice: data.price,
      })
    })
  },[url])
  
 //여기부터 오류 남! => +,- 누르면 qty 수량이 현재 qty를 더해진 수로 바뀜 (클릭할때마다)
  const handleQtyPatch = (qty) => {
    fetch(`http://localhost:8080/carts/update/${cartObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        ...cartObj,
        qty: qty
      })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const handleQtyIncre = () => {
    //state
    setCartObj({
        ...cartObj,
        qty: cartObj.qty + 1
    })
    setCartQty(cartQty + 1);
    //database
    handleQtyPatch(1);
  }

  const handleQtyDecre = () => {
    //state
    if(cartObj.qty === 1)
    return alert("최소 수량은 1개입니다.");
    setCartObj({
      ...cartObj,
      qty: cartObj.qty - 1
    })
    setCartQty(cartQty - 1);
    //database
    handleQtyPatch(-1);
  }

  const handleDelete = () => {
    fetch(`http://localhost:8080/carts/delete/${cartObj.id}`, {
      method: "DELETE",
    }).then(res => {
      console.log(res)
      if (res.ok) {
        window.location.reload();
      } else {
        alert("삭제 실패")
      }
    })
    .catch(err => console.log(err))
  }

  // 주문 버튼을 통해 주문 페이지로 이동
  const handleOrder = () => {
    fetch(`http://localhost:8080/order/add`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId: cartObj.id,
        userId: cartObj.userId,
        productId: cartObj.productId,
        qty: cartObj.qty
      })
    }).then(res => {
      console.log(res)
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
    <>
      <div className={style.cartList}>
        <img src={cartObj.productImg} alt={cartObj.productName} />
        <div className={style.button}>
          <button className={style.mi} onClick={handleQtyDecre}>-</button>
          <p className={style.qty}>총 수량 : {cartObj.qty}개</p>
          <button className={style.pl} onClick={handleQtyIncre}>+</button>
          <p className={style.total}>총 금액 : {(cartObj.productPrice * cartObj.qty).toLocaleString('en-US')}원</p>
          <button className={style.order} onClick={handleOrder}>주문</button>
          <button className={style.del} onClick={handleDelete}>삭제</button>
        </div>
      </div>
    
    </>
  );
}

export default CartList;