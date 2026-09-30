import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import styles from './MeditationComponent.module.css';
import VideoCardComponent from '../videoCardComponent/videoCardComponent';
import Slider from '../slider/slider';
import useTranslation from 'next-translate/useTranslation';

function MeditationComponent({ meditations }) {
  const { t } = useTranslation('meditation');

  // Create an array for card components to view in card slider
  const cards = meditations.map((data, index) => {
    return <VideoCardComponent key={index} cardData={data} />;
  });

  // Reference to the Slider component
  const sliderRef = useRef();

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
    <div>
      <Container>
        <div className={styles.meditationHelp}>
          {t('meditation_help')}
        </div>
        <div className={styles.meditationContainer} id="samatha-meditation">
          <div className={styles.meditationInnerContainer}>
            <p className={styles.title}>{t('samatha_meditation')}</p>
            <p className={styles.description}>
              {t('samatha_meditation_description')}
            </p>
          </div>
          <div className={styles.meditationInnerContainer} id="vipassana-meditation">
            <p className={styles.title}>{t('vipassana_meditation')}</p>
            <p className={styles.description}>
              {t('vipassana_meditation_description')}
            </p>
          </div>
        </div>
      </Container>

      <div className={styles.rootContainer}>
        <div className={styles.ourFocusContainer}>
          <div className={styles.ourFocusInnerContainer}>
            <div className={styles.ourFocusHeader}></div>
            <div className={styles.ourFocusSubHeader}>
              <div className={styles.subHeaderText}>
                {t('meditation_instructions')}
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
    </div>
  );
}

export default MeditationComponent;