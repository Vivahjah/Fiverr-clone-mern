import React from 'react'
import "./Slide.scss"
import Slider from 'infinite-react-carousel';

//children takes the form of anything pass to the slide
const Slide = ({children, slidesToShow, arrowsScroll}) => {
  return (
   <div className="slide">
    <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
           {children} 
        </Slider>
    </div>
   </div>
);
  
}

export default Slide