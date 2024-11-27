import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Cr.css'
import Amaran from '../images/AMARAN.jpg'
import ok from '../images/ok.jpg'
import sita from '../images/sita.jpg'

function CarouselComponent() {
  return (
    <Carousel interval={5000} className="custom-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 custom-carousel-image"
          src={Amaran}
          alt="First slide"
        />
        <Carousel.Caption>
          <p>Amaran</p>
          <p>Grab your tickets.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 custom-carousel-image"
          src={ok}
          alt="Second slide"
        />
        <Carousel.Caption>
          <p>Ok kanmani</p>
          <p>Grab your tickets.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 custom-carousel-image"
          src={sita}
          alt="Third slide"
        />
        <Carousel.Caption>
          <p>Sita Ramam</p>
          <p>Grab your tickets.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
