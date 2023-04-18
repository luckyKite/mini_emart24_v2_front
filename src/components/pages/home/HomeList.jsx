import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './HomeList.module.css';


function HomeList() {

  const [home, setHomes] = useState([
    {
      "id": 1,
      "name": "아임이",
      "image": "https://emart24.co.kr/image/Njg=",
      "title": "사는 맛, 딱 한 방울",
      "link": "https://www.emart24.co.kr/goods/pl?search=&category_seq=6&page=1&align="
    },
    {
      "id": 2,
      "name": "Fresh Food",
      "image": "https://emart24.co.kr/image/NzI=",
      "title": "차별화 된 이마트24 Fresh Food",
      "link": "https://www.emart24.co.kr/goods/ff"
    },
    {
      "id": 3,
      "name": "김토끼 스튜됴",
      "image": "https://emart24.co.kr/image/NzQ=",
      "title": "2023년 토끼해를 맞이하여, 김토끼 콜라보",
      "link": "https://www.emart24.co.kr/goods/pl?search=&category_seq=21&page=1&align="
    },
    {
      "id": 4,
      "name": "점신",
      "image": "https://emart24.co.kr/image/MjMyMg==",
      "title": "2023년 운세 제작소 점신 콜라보",
      "link": "https://www.emart24.co.kr/goods/pl?search=&category_seq=22&page=1&align="
    }
  ]);


  return (
    <div>
      <div className='container'>
        <p className={style.homeMain}>ONLY 이마트24</p>
        <p className={style.homeDetail}>이마트24에서만 있는 차별화 상품을 만나보세요.</p>
        <div className={style.homeListWrap}>
          {
            home && home.map( homeData => 
              <div key={homeData.id} className={style.homeWrap}>
                <Link to= {homeData.link}>                  
                  <img src={homeData.image} alt='홈화면 이벤트 이미지' />
                </Link> 
                <p className={style.homeName}>{homeData.name}</p>
                <p className={style.homeTitle}>{homeData.title}</p>
              </div>
            )       
          } 
        </div>
      </div> 
    </div>
  );
}

export default HomeList;