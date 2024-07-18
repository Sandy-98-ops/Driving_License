import React from 'react';
import Slider from 'react-slick';
import homeImage1 from '../../utils/bannerpic1.jpg';
import homeImage2 from '../../utils/organbanner2.jpg';
import homeImage3 from '../../utils/oraganbanner1.jpg';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={homeImage1} alt="Home 1" style={{ width: '100%' }} />
        </div>
        <div>
          <img src={homeImage2} alt="Home 2" style={{ width: '100%' }} />
        </div>
        <div>
          <img src={homeImage3} alt="Home 3" style={{ width: '100%' }} />
        </div>
      </Slider>
    </div>
  );
}

export default Home;
