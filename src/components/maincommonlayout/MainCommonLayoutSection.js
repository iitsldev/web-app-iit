import React from 'react';
import styles from './MainLayoutSection.module.css';
import useTranslation from 'next-translate/useTranslation';

function MainCommonLayoutSection({
  title,
  description,
  photo,
  backgroundImg,
  info,
}) {
  const { t } = useTranslation('main-common-layout');

  return (
    <div className={styles.mainHeader}>
      <div
        className={styles.headerBackground}
        style={{ backgroundImage: backgroundImg }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.motoContainer}>
            <div className={styles.bannerTextOne}>{title}</div>
            <div className={styles.bannerTextTwo}>{description}</div>
            <div className={styles.bannerTextThree}>{info}</div>
          </div>

          <div className={styles.headerImageContainer}>
            <img className={styles.headerImage} src={photo} alt={photo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCommonLayoutSection;
