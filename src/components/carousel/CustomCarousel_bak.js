import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import styles from './CustomCarousel.module.css';
import $ from 'jquery';
import useTranslation from 'next-translate/useTranslation';

function CustomCarousel() {
  const { t } = useTranslation('custom-carousel');
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function normalizeSlideHeights() {
    $('.main-carousel.carousel').each(function () {
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
    }, 400);
    return () => {
      $(window).off('load resize orientationchange');
    };
  }, []);

  return (
    <div className={styles.customCarouselWrapper}>
      <div className={styles.customEllipse}></div>
      <Carousel
        className="main-carousel"
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <div className={styles.carouwrap}>
            <div className={styles.bannerOneRight}>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-31"
                    src="/temple.svg"
                    alt="owada"
                  />
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('poya_day')}</p>
                </div>
              </div>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-53"
                    src="/owada.svg"
                    alt="owada"
                  />
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('logo')}</p>
                </div>
              </div>
            </div>
            <div className={styles.motoContainer}>
              <div className={styles.motoItem}>
                <div className={styles.motoImage}>
                  <img
                    className="d-block w-100 banner-img-max-width"
                    src="/buddha_20250628.png"
                    alt="Second slide"
                  />
                </div>
              </div>
              <div className={styles.motoItem}>
                <div className={styles.bannerTextOne}>
                  <img src="/swirlLeftt.png" width="200px" />
                  &nbsp;IIT&nbsp;
                  <img src="/swirlRight.png" width="200px" />
                </div>
                <div className={styles.bannerTextTwo}>
                  {t('iit_moto')}
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className={styles.carouwrap}>
            <div className={styles.bannerOneRight}>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-53"
                    src="/owada.svg"
                    alt="owada"
                  />
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('logo')}</p>
                </div>
              </div>
            </div>
            <div className={styles.sliderTwoContainer}>
              <div className={styles.outer}>
                <div className={styles.sliderTwoInnerCont}>
                  <div className="width-25-per sliderTwoTemple">
                    <img
                      className="d-block w-100 banner-img-max-width"
                      src="/temple.svg"
                      alt="Second slide"
                    />
                  </div>
                  <Carousel.Caption className="caroucap pd-30 width-75-per banner-text-left">
                    <div className={styles.sliderTwoText}>
                      {t('iit_dhamma_programs')}
                    </div>
                  </Carousel.Caption>
                </div>
                <div className={styles.outerTextThree}>
                  <div className="text-container text-width-121 height-100-per">
                    <p className="text-white rotate-90-deg font-17">{t('poya_day')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bannerOneLeft}>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                  {/* <img
                    className="d-block w-100 banner-social-icon-max-width-53"
                    src="/owada.svg"
                    alt="owada"
                  /> */}
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('iit')}</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.carouwrap}>
            <div className={styles.sliderThreeContainer}>
              <div className={styles.outer}>
                <div className={styles.sliderTwoInnerCont}>
                  <div className="width-25-per sliderThreeLogo">
                    <img
                      className="d-block w-100 "
                      src="/IIT-2.png"
                      alt="Third slide"
                    />
                  </div>
                  {/* <Carousel.Caption className="caroucap pd-30 width-75-per banner-text-left"> */}
                  <Carousel.Caption className="caroucap width-75-per banner-text-left">
                    <div className={styles.sliderThreeText}>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('brown_coloured_large_wheel_of_dhamma')}</strong>{' '}
                        {t('indicates_how_the_dispensation_of_the_buddha_is_spread_all_over_the_world')}
                      </div>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('twenty_four_spokes')}</strong>{' '}
                        {t('of_the_wheel_represent_the_twenty_four_factors_of_the_noble_truths')}
                      </div>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('palm_leaf_books')}</strong>{' '}
                        {t('which_holds_the_wheel_of_dhamma_indicates_how_the_dispensation_depends_upon_studies_on_dhamma_and_vinaya_after_the_passing_away_of_the_buddha')}
                      </div>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('the_pen_and_the_palm_leaf')}</strong>{' '}
                        {t('inside_the_wheel_depicts_how_a_monk_is_involved_in_studies_of_dhamma_and_vinaya_pariyatti_sasana')}
                      </div>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('the_meditative_figure')}</strong>{' '}
                        {t('shows_how_a_monk_is_involved_in_developing_spiritual_qualities_patipatti_sasana')}
                      </div>
                      <div className={styles.sliderThreeTextLine}>
                        <strong>{t('the_pagoda')}</strong>{' '}
                        {t('depicts_how_a_monk_who_involves_in_both_scriptural_studies_and_spiritual_practice_becomes_a_noble_being_who_deserves_to_be_venerated_having_a_pagoda_built_for_him')}{' '}
                      </div>
                    </div>
                  </Carousel.Caption>
                </div>
                <div className={styles.outerTextThree}>
                  <div className="text-container text-width-215 height-100-per">
                    <p className="text-white rotate-90-deg font-17">{t('logo')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bannerOneLeft}>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('iit')}</p>
                </div>
              </div>
              <div className={styles.iconsButton2}>
                <div className="img-container">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-53"
                    src="/temple.svg"
                    alt="owada"
                  />
                </div>
                <div className="text-container text-width-215">
                  <p className="text-white rotate-90-deg font-17">{t('poya_day')}</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CustomCarousel;
