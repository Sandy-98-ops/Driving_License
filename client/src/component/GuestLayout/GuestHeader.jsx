import React from 'react'
import logo from '../../utils/Header.png';
import logo2 from '../../utils/Header2.png';

const GuestHeader = () => {
  return (
    <div className='image'>

      <img
        src={logo}
        width="65%"
        height="80"
        className="d-inline-block align-top"
        alt="Logo"
      />
 <img
        src={logo2}
        width="25%"
        height="80"
        className="d-inline-block align-top"
        alt="Logo"
      />
     
    </div>

  )
}

export default GuestHeader
