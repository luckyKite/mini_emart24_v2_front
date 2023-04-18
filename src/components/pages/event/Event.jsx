import React, { useEffect, useState } from 'react';
import EventList from './EventList';
import style from "./Event.module.css";

function Event() {
  const [eventId, setEventId] = useState(1);
  const [eventList, setEventList] = useState();
  const [eventInfo, setEventInfo] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/events/all`)
      .then(res => res.json())
      .then(data => {
        setEventList(data);
      })
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/events/${eventId}`) 
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setEventInfo(data);
      })
  }, [eventId]);

  const handleSelectEvent = (e) => {
    setEventId(e.target.value);
  }
  return (
    <div className='container'>
      <p className={style.comment}>이벤트가 진행되는 상품을 확인하세요 ☺️ </p>
      <section className={style.types}>
        <select onChange={handleSelectEvent}>
          {           
            eventList && eventList.map(item => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))
          }
        </select>
      </section>
      <ul className={style.eventProductList}>
        {
          eventInfo && eventInfo.map(data => (
            <EventList key={data.product.id} product={data.product} />
          ))
        }
      </ul>
    </div>
  );
}

export default Event;