import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import data from '../../data/testimonialsData.json';
import styles from './Testimonials.module.css';
import ReactPlayer from 'react-player';
import { BsFillChatRightQuoteFill } from 'react-icons/bs';
import $ from 'jquery';

const Testomonials = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playLabel, setPlayLable] = useState('Play');

  const handlePlaying = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setPlayLable('Play');
    } else {
      setIsPlaying(true);
      setPlayLable('Stop');
    }
  };

  function normalizeSlideHeights() {
    $('.testimonial-carousel.carousel').each(function () {
      var items = $('.carousel-item', this);
      // reset the height
      items.css('height', 'auto');
      // set the height
      var maxHeight = Math.max.apply(
        null,
        items
          .map(function () {
            return $(this).outerHeight();
          })
          .get()
      );
      items.css('height', maxHeight + 'px');
    });
  }

  useEffect(() => {
    $(window).on('load resize orientationchange', normalizeSlideHeights);
    setTimeout(() => {
      normalizeSlideHeights();
    }, 300);
    return () => {
      $(window).off('load resize orientationchange');
    };
  }, []);

  const renderCarousel = (item, index) => {
    return (
      <Carousel.Item key={index}>
        <div className="testomonials-main">
          <div className="player-wrapper">
            <ReactPlayer
              width="100%"
              height="100%"
              url={item.video}
              controls={true}
              className="react-player"
            />
          </div>

          <div
            className="testimonial-caption"
            style={{
              textAlign: 'left',
              font: 'normal normal normal 41px/49px Raleway',
              letterSpacing: '0px',
              color: '#FFFFFF',
              opacity: '0.73',
              padding: '10%',
            }}
          >
            <img
              className="d-block w-100 banner-social-icon-max-width-45"
              src="/Path 691.svg"
              alt="Quote"
            />
            <div>{item.quote}</div>
          </div>
        </div>
      </Carousel.Item>
    );
  };

  return (
    <Carousel
      className="testimonial-carousel"
      style={{ background: '#532F00', width: '100%', height: '100%' }}
      interval={null}
    >
      {data.map(renderCarousel)}
    </Carousel>
  );
};
export default Testomonials;
