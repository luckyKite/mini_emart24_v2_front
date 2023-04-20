import React, { useEffect, useState } from "react";
import style from "./MyOrderList.module.css";
import { logInState } from "../../state/logInState";
import { useRecoilState } from "recoil";

function MyOrderList() {
  //const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [orderProdArr, setOrderProdArr] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/order/all?id=` + logInData.userId)
      .then((res) => res.json())
      .then((data) => {
        let tempArr= [];
        for (let i of data) {
          const { product, qty, state } = i;
          let obj = { product: product, qty: qty, state: state };
          console.log(obj);
          tempArr.push(obj);
        }
        console.log(tempArr)
        setOrderProdArr(tempArr);
      }); 
  }, [logInData]);

  return (
    <div className='container'>
      <p className={style.comment}>배달의 민족 주문~~!!~🎶</p>
      <div className={style.productList}>
        <ul>
          {
            orderProdArr && orderProdArr.map( (orderProd, index) =>
              <div key={index}>
                <img className={style.productImg} src={orderProd.product.thumbnail} />
                <div className={style.text}>
                  <p>주문상품 : {orderProd.product.name}</p>
                  <p>수량 : {orderProd.qty}</p>
                  <p>주문상태 : {orderProd.state}</p>
                  <p className={style.total}>총 주문금액 : {orderProd.qty * orderProd.product.price}원</p>
                </div>
                
              </div>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default MyOrderList;
