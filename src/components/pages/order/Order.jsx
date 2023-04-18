import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Order() {

  const navigate = useNavigate();
  const [logInData, setLogInData] = useRecoilState(logInState);

  return (
    <div className='container'>
      
    </div>
  );
}
