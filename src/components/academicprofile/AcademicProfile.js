import React from 'react';
import styles from './AcademicProfile.module.css';
import sanitizeHtml from 'sanitize-html';


function AcademicProfile({ profileImage, name, title, body, body2 }) {
  return (
    <div className={styles.instAcademicProfileSubSontainer}>
      <div className={styles.instAcademicContainer}>
        <div className={styles.instAcademicAuthorImg}>
          <img
            //   className="d-block w-100 inst-img-max-width"
            className="d-block inst-img-max-width"
            src={profileImage}
            alt="profile"
          />
        </div>
        <div className={styles.intAcademicAuthor}>
          <div className={styles.intAcademicAuthorDiv}>{name}</div>
          <div className={styles.intAcademicAuthorTitle}>{title}</div>
        </div>
      </div>
      <div
        className={styles.intAcademicAuthorBody}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
      ></div>
      <div
        className={styles.intAcademicAuthorBody}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(body2) }}
      ></div>
    </div>
  );
}

export default AcademicProfile;
