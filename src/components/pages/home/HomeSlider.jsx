import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import style from './HomeSlider.module.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='container'>
        <h2></h2>
        <Slider {...settings}>
          <div>            
            <a href="https://www.emart24.co.kr/event/43" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/NDg3Mg==" alt='이마트 카드할인' />
            </a>         
          </div>
          <div>           
            <a href="https://www.emart24.co.kr/event/41" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/MzM5Nw==" alt='이마트 발렌타인' />
            </a>           
          </div>
          <div>            
            <a href="https://www.emart24.co.kr/event/44" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/NDk3Nw==" alt='이마트 라면행사' />
            </a>             
          </div>
          <div>          
            <a href="https://www.emart24.co.kr/event/61" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/NTAxOA==" alt='발렌타인데이 와인픽업 최대 1만원 페이백!' />
            </a>
          </div>
          <div>
            <a href="https://www.emart24.co.kr/event/81" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/NTA4Nw==/" alt='발렌타인데이 단 하루, 레드 와인 1종 10,800원!' />
            </a>
          </div>
          <div>       
            <a href="https://www.emart24.co.kr/event/26" target="_blank" rel="noopener noreferrer">
              <img src="https://emart24.co.kr/image/Mjk0MQ==" alt='SKYPASS 적립하고 파리가자!' />
            </a>
          </div>
        </Slider>
      </div>
    );
  }
}