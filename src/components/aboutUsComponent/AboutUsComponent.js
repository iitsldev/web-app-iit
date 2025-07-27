import React, { useRef, useEffect, useState } from 'react';
import styles from './aboutUsComponent.module.css';
import OurFocusCardComponent2 from '../ourFocusCardComponent/ourFocusCardComponent2';
import Slider from '../slider/slider';
import useTranslation from 'next-translate/useTranslation';

function AboutUsComponent({ missions, ourFocus }) {
  const sliderRef = useRef();
  const { t } = useTranslation('about-us');

  const cards = ourFocus.map((data, index) => {
    return <OurFocusCardComponent2 key={index} cardData={data} />;
  });

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.slideLeft();
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.slideRight();
    }
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.aboutUsContainer}>
        <div className={styles.aboutUsHeader} id="what-is-iit">
          <h1 className={styles.mainHeader}>{t('what_is_iit')}</h1>
          <p className={styles.aboutUsMainIntro}>
            {t('iit_description')}
          </p>
        </div>

        <div className={styles.map}>
          <iframe
            height="100%"
            width="100%"
            position="absolute"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=International%20Institute%20of%20Therav%C4%81da,%20Heenatikalmavatta,%20Rajavigama,%20Karuwalagaswewa&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <div className={styles.mapInformation}>
          <div className={styles.mapInformationDetails}>
            <h2 className={styles.subHeading1}>{t('where_is_iit')}</h2>
            <p className={styles.mapTextInfo}>
              {t('location_description')}
            </p>
          </div>
          <div className={styles.mapInformationLink}>
            <div className={styles.mapIcon}>
              <img src="/GetDirections.svg" className={styles.mapIconImage} />
            </div>
            <div className={styles.directionText}>
              <div className={styles.directionHeading}>{t('get_directions')}</div>
              <div className={styles.directionSubHeading}>
                {t('view_in_google_map')}
              </div>
            </div>
            <div className={styles.linkArrow}>
              <a
                href="https://www.google.com/maps/place/International+Institute+of+Therav%C4%81da/@7.964815,79.98393,13z/data=!4m5!3m4!1s0x0:0x55e0440823643e03!8m2!3d7.9662346!4d79.9838372?hl=en-GB"
                target="_blank"
              >
                <img src="/Arrow01.svg" className={styles.arrowImage} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.establishment} id="establishment">
          <h1 className={styles.mainHeader}>{t('establishment')}</h1>
          <div className={styles.establishmentContent}>
            <p className="mbEstablishmentPara">
              {t('establishment_p1')}
            </p>

            <p className="mbEstablishmentPara">
              {t('establishment_p2')}
            </p>

            <div className={`${styles.establishmentSub} ${styles.establishmentSub1}`}>
              <div>
                <img
                  src="/kuti.png"
                  className={`${styles.establishmentImage} ${styles.establishmentImage1}`}
                />
              </div>
              <p className="mbEstablishmentPara">
                {t('establishment_p3')}
              </p>
            </div>

            <div className={`${styles.establishmentSub} ${styles.establishmentSub2}`}>
              <div>
                <img
                  src="/mahathero.png"
                  className={`${styles.establishmentImage} ${styles.establishmentImage2}`}
                />
              </div>
              <p className="mbEstablishmentPara">
                {t('establishment_p4')}
              </p>

              <p className="establishmentPara">
                {t('establishment_p5')}
              </p>
            </div>

            <p>
              {t('establishment_p6')}
            </p>
          </div>
        </div>
        <div className={styles.missionHeading} id="our-vision-and-mission">
          <h2 className={styles.subHeading2}>{t('vision_mission')}</h2>
        </div>
        <div className={styles.missionDetails}>
          <div className={styles.missionBriefing}>
            <p className={styles.brefingText}>
              {t('vision_mission_description')}
            </p>
          </div>
          <div className={styles.missionInfo}>
            {missions.map((data, index) => (
              <div key={index} className={styles.missionDataContainer}>
                <div className={styles.missionImageContainer}>
                  <img src={data.image} className={styles.missionImage} />
                </div>
                <div className={styles.missionText}>{data.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ... rest of your existing JSX ... */}
      <div className={styles.ourFocusContainer} id="our-focus">
        <div className={styles.ourFocusInnerContainer}>
          <div className={styles.ourFocusHeader}>{t('our_focus')}</div>
          <div className={styles.ourFocusSubHeader}>
            <div className={styles.subHeaderText}>
              {t('our_focus_description')}
            </div>
            <div className={styles.sliderButtonContainer}>
              <div className={styles.sliderButton} onClick={slideRight}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-chevron-left ${styles.buttonLeftImage}`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </div>
              <div className={styles.sliderButton} onClick={slideLeft}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-chevron-right ${styles.buttonRightImage}`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.focusCards}>
          <Slider cardInfo={cards} ref={sliderRef} />
        </div>
      </div>
    </div>
  );
}

export default AboutUsComponent;