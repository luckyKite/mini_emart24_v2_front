import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CartList from './CartList';
import { CartCountState } from '../../state/CartCountState';
import style from "./Cart.module.css";
import { logInState } from '../../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import withAuth from '../../withAuth/withAuth'
import Swal from 'sweetalert2';

function Cart() {
  const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  
  const [cartData, setCartData] = useState();
  const [cartCount, setCartCount] = useRecoilState(CartCountState); 

  useEffect(() => {
    fetch(`http://localhost:8080/carts/all?id=${logInData.userId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let allQty = 0;
      data.map(item => {
        allQty += item.qty;
      })

      if (allQty < cartCount) {
        Swal.fire('장바구니에 삭제된 상품이 있어요!');
      }

      setCartCount(allQty);
      setCartData(data);
    })
  },[logInData])

  return ( 
    <div className='container'>
      <p className={style.cartShow}>내가 담은 상품 🎁</p>
      {
        cartData && cartData.map( cart => (
          <CartList
            key={cart.id}
            cart={cart}
          />
        ))
      }
    </div>
   );
}
export default withAuth(Cart);