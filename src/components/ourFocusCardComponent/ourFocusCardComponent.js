import React from 'react';
import styles from './ourFocusCardComponent.module.css';
import sanitizeHtml from 'sanitize-html'
import useTranslation from 'next-translate/useTranslation';

function OurFocusCardComponent(props) {
  const { t } = useTranslation('our-focus-card');

  function goToYoutubePlaylist(linkToYourtube) {
    window.open(linkToYourtube, '_blank');
  }

  return (
    <div
      className={styles.mainContainer}
      onClick={() => goToYoutubePlaylist(props.cardData.link)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.ourFocusCardContainer}>
        <div className={styles.ourFocusImageContainer}>
          <img src={props.cardData.image} className={styles.ourFocusImage} />
        </div>
        <div className={styles.ourFocusHeader}>{props.cardData.title}</div>
        <div className={styles.ourFocusDetails} dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.cardData.body) }}></div>

      </div>
    </div>
  );
}

export default OurFocusCardComponent;
