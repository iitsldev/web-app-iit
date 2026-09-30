import React from 'react';
import styles from './ourFocusCardComponent.module.css';
import useTranslation from 'next-translate/useTranslation';

function OurFocusCardComponent2(props) {
  const { t } = useTranslation('our-focus-card');

  return (
    <div className={styles.mainContainer}>
      <div className={styles.ourFocusCardContainer}>
        <div className={styles.ourFocusImageContainer}>
          <img src={props.cardData.image} className={styles.ourFocusImage} />
        </div>
        <div className={styles.ourFocusHeader}>{props.cardData.title}</div>
        <div className={styles.ourFocusDetails}>{props.cardData.body}</div>
      </div>
    </div>
  );
}

export default OurFocusCardComponent2;
