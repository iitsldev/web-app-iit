import React, { useEffect } from 'react';
import $ from 'jquery';

function TimeLineComponent() {
  function operateTimeline() {
    var timelineSwiper = new Swiper('.timeline .swiper-container', {
      direction: 'vertical',
      loop: false,
      speed: 1600,
      pagination: '.swiper-pagination',
      paginationBulletRender: function (swiper, index, className) {
        var year = document
          .querySelectorAll('.swiper-slide')
          [index].getAttribute('data-year');
        return '<span class="' + className + '">' + year + '</span>';
      },
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      breakpoints: {
        800: {
          direction: 'horizontal',
        },
      },
    });
  }

  useEffect(() => {
    // $(window).on('load resize', operateTimeline);
    operateTimeline();
    // return () => {
    //   $(window).off('load resize');
    // };
  }, []);

  return (
    <div className="timeline-container">
      <div className="timeline">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div
              className="swiper-slide"
              style={{
                backgroundImage: "url('https://unsplash.it/1920/500?image=11')",
              }}
              data-year="2011"
            >
              <div className="swiper-slide-content">
                <span className="timeline-year">2011</span>
                <h4 className="timeline-title">Our nice super title</h4>
                <p className="timeline-text">
                  Lorem ipsum dolor site amet, consectetur adipscing elit, sed
                  do eisumod tempor incididut ut labore et dolore magna aliqua.
                  Ut enim ad mimim venjam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div
              className="swiper-slide"
              style={{
                backgroundImage: "url('https://unsplash.it/1920/500?image=12')",
              }}
              data-year="2012"
            >
              <div className="swiper-slide-content">
                <span className="timeline-year">2012</span>
                <h4 className="timeline-title">Our nice super title</h4>
                <p className="timeline-text">
                  Lorem ipsum dolor site amet, consectetur adipscing elit, sed
                  do eisumod tempor incididut ut labore et dolore magna aliqua.
                  Ut enim ad mimim venjam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default TimeLineComponent;
