import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import styles from './Education.module.css';
import Carousel from 'react-multi-carousel';
import { CustomButtonGroup } from '../customarrow/CustomArrows';
import useTranslation from 'next-translate/useTranslation';

function EducationComponent() {
  const { t } = useTranslation('education');
  console.log('bstc_courses:', t('bstc_courses', {}, { returnObjects: true }));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1410, min: 1017 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1016, min: 0 },
      items: 1,
    },
  };

  const renderCard = (card, index) => {
    return (
      <Card
        className={styles.cardBody}
        key={index}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {card.type === 'News' ? (
          <span className={styles.typeNews}> {card.type}</span>
        ) : (
          <span className={styles.typeEvent}> {card.type}</span>
        )}
        <Card.Subtitle className={styles.custSubTitle}>
          {card.date}
        </Card.Subtitle>
        <Card.Title className={styles.custTitle}>{card.title}</Card.Title>
        <Card.Text className={styles.custDescription}>
          {`${card.description.slice(0, 200)}...`}
        </Card.Text>
        <Card.Link href="#">Read more...</Card.Link>
      </Card>
    );
  };

  return (
    <div className={styles.eduMainDiv}>
      <Container>
        <div className={styles.eduIntroduction}>
          <p>
            {t('intro')}
          </p>
        </div>
      </Container>
      <Container className={styles.relativeClass}>
        <Row className={styles.eductionHeaderContainer}>
          <span className={styles.mainText}>{t('courses_conducted')}</span>
        </Row>
        <Carousel
          className={styles.shsslkCardListCarousel}
          ssr
          itemClass="image-item"
          responsive={responsive}
          infinite={true}
          arrows={false}
          customButtonGroup={<CustomButtonGroup />}
          renderButtonGroupOutside={true}
        >
          {/* {newsAndEvents.map(renderCard)} */}
          <Card
            className={styles.cardBody}
            // key={index}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFD426',
              border: 'none',
            }}
          >
            <div className={styles.courseHeader}>
              <span className={styles.courseName}>
                {t('nissayamuttaka_course')}{' '}
                <span className={styles.smallText}>{t('nmc')}</span>
              </span>
              <img
                className="d-block w-100 course-icon-max-width-99"
                src="/courseIcon-1.svg"
                alt="Nissayamuttaka Course"
              />
            </div>
            <div className={styles.courseDescription}>
              {t('nissayamuttaka_description')}
            </div>
            <div className={styles.courseDetailListContainer}>
              <ul className={styles.courseDetailList}>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Duration.svg"
                    alt="Duration"
                  />
                  <div>
                    <p className={styles.detailTitle}>{t('duration_of_the_course')}</p>
                    <p className={styles.detailDesc}>{t('six_years')}</p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Subjects.svg"
                    alt="Subjects"
                  />
                  <div>
                    <p className={styles.detailTitle}>{t('subjects')}</p>
                    <p className={styles.detailDesc}>
                      {t('nmc_subjects')}
                    </p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Practice.svg"
                    alt="Practice"
                  />
                  <div>
                    <p className={styles.detailTitle}>{t('practice')}</p>
                    <p className={styles.detailDesc}>
                      {t('nmc_practice')}
                    </p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Skills.svg"
                    alt="Skills"
                  />
                  <div>
                    <p className={styles.detailTitle}>{t('skills')}</p>
                    <p className={styles.detailDesc}>
                      {t('nmc_skills')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Card>

          <Card
            className={styles.cardBody}
            // key={index}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#025BC1',
              border: 'none',
            }}
          >
            <div className={styles.courseHeader}>
              <span className={styles.courseName} style={{ color: '#FFFFFF' }}>
                {t('parisupatthaka_course')}{' '}
                <span className={styles.smallText} style={{ color: '#FFFFFF' }}>
                  {t('puc')}
                </span>
              </span>
              <img
                className="d-block w-100 course-icon-max-width-99"
                src="/courseIcon-2.svg"
                alt="Nissayamuttaka Course"
              />
            </div>
            <div
              className={styles.courseDescription}
              style={{ color: '#FFFFFF' }}
            >
              {t('parisupatthaka_description')}
            </div>
            <div className={styles.courseDetailListContainer}>
              <ul className={styles.courseDetailList}>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Duration-white.svg"
                    alt="Duration"
                  />
                  <div>
                    <p
                      className={styles.detailTitle}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('duration_of_the_course')}
                    </p>
                    <p
                      className={styles.detailDesc}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('two_years')}
                    </p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Subjects-white.svg"
                    alt="Subjects"
                  />
                  <div>
                    <p
                      className={styles.detailTitle}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('subjects')}
                    </p>
                    <p
                      className={styles.detailDesc}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('puc_subjects')}
                    </p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Practice-white.svg"
                    alt="Practice"
                  />
                  <div>
                    <p
                      className={styles.detailTitle}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('practice')}
                    </p>
                    <p
                      className={styles.detailDesc}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('puc_practice')}
                    </p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Skills-white.svg"
                    alt="Skills"
                  />
                  <div>
                    <p
                      className={styles.detailTitle}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('skills')}
                    </p>
                    <p
                      className={styles.detailDesc}
                      style={{ color: '#FFFFFF' }}
                    >
                      {t('puc_skills')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Card>

          <Card
            className={styles.cardBody}
            // key={index}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#FFE5A8',
              border: 'none',
            }}
          >
            <div className={styles.courseHeader}>
              <span className={styles.courseName}>
                {t('bahussuta_course')}{' '}
                <span className={styles.smallText}>{t('bstc')}</span>
              </span>
              <img
                className="d-block w-100 course-icon-max-width-99"
                src="/courseIcon-3.svg"
                alt="Nissayamuttaka Course"
              />
            </div>
            <div className={styles.courseDescription}>
              {t('bahussuta_description')}
            </div>
            <div className={styles.courseDetailListContainer}>
              <ul className={styles.courseDetailList}>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Duration.svg"
                    alt="Duration"
                  />
                  <div>
                    <p className={styles.detailTitle}>{t('duration_of_the_course')}</p>
                    <p className={styles.detailDesc}>{t('depends_on_the_subject')}</p>
                  </div>
                </li>
                <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Courses-list.svg"
                    alt="Courses"
                  />
                  <div className={styles.courseListContainer}>
                    <p className={styles.detailTitle}>{t('courses')}</p>
                    <ul>
                      {t('bstc_courses', {}, { returnObjects: true }).map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </li>
                {/* <li className={styles.courseDetailListItem}>
                  <img
                    className={`d-block w-100 course-item-icon-max-width-49 ${styles.courseIcon}`}
                    src="/Practice.svg"
                    alt="Tasks"
                  />
                  <div>
                    <p className={styles.detailTitle}>Tasks</p>
                    <p className={styles.detailDesc}>
                      Vinaya, Suttanat, Abhidhamma, Pāḷi, Samatha, Vipassanā,
                      History of the Sāsana, English and few more
                    </p>
                  </div>
                </li> */}
              </ul>
            </div>
          </Card>
        </Carousel>
      </Container>
    </div>
  );
}

export default EducationComponent;
