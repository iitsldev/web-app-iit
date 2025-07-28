import React, { useEffect } from 'react';
import $ from 'jquery';
import useTranslation from 'next-translate/useTranslation';

function TimeLineComponent() {
  const { t } = useTranslation('timeline');

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
        768: {
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
                <span className="timeline-year">{t('timeline_year')}</span>
                <h4 className="timeline-title">{t('timeline_title')}</h4>
                <p className="timeline-text">
                  {t('timeline_text')}
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
                <span className="timeline-year">{t('timeline_year')}</span>
                <h4 className="timeline-title">{t('timeline_title')}</h4>
                <p className="timeline-text">
                  {t('timeline_text')}
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
