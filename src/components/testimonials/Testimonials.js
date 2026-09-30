import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './Testimonials.module.css';
import ReactPlayer from 'react-player';
import $ from 'jquery';
import sanitizeHtml from 'sanitize-html';
import useTranslation from 'next-translate/useTranslation';

const Testimonials = ({ testimonials }) => {
  const { t } = useTranslation('testimonials');

  function normalizeSlideHeights() {
    $('.testimonial-carousel.carousel').each(function () {
      var items = $('.carousel-item', this);
      items.css('height', 'auto');
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
        <div className="testimonials-main">
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
              alt={t('quote')}
            />
            <div>{item.quote}</div>
            <div
              style={{ color: '#ccc', fontSize: '1.5rem' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }} />

          </div>
        </div>
      </Carousel.Item >
    );
  };

  return (
    <Carousel
      className="testimonial-carousel"
      style={{ background: '#532F00', width: '100%', height: '100%' }}
      interval={null}
    >
      {testimonials.map(renderCarousel)}
    </Carousel>
  );
};

export default Testimonials;