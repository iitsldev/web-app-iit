import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import styles from './NewsAndEvents.module.css';
import Carousel from 'react-multi-carousel';
import { CustomButtonGroup } from '../customarrow/CustomArrows';
import useTranslation from 'next-translate/useTranslation';

const NewsAndEventsComponent = ({ newsAndEvents }) => {
  const { t } = useTranslation('news-and-events');

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
      breakpoint: { max: 1024, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  const renderCard = (card, index) => {
    const indexval = index;
    const typeClassName = `type${card.type.charAt(0).toUpperCase()}${card.type.slice(1)}`;

    return (
      <Card
        className={styles.cardBody}
        key={index}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <span className={styles[typeClassName]}>{card.type}</span>

        <Card.Img
          className={styles.custImage}
          variant="top"
          src={card.image}
          alt={card.title}
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop
            e.target.src = '/IIT-1.png'; // Fallback image
          }}
        />

        <Card.Title className={styles.custTitle}>
          <Card.Link href={`/newsandevents/${card.id}`} target="_blank">
            {card.title}
          </Card.Link>
        </Card.Title>
        <Card.Subtitle className={styles.custSubTitle}>
          {card.date.slice(0, 10)}
        </Card.Subtitle>
        <Card.Text className={styles.custDescription}>
          {`${card.description.replace(/<[^>]*>/g, '').slice(0, 200)}...`}
        </Card.Text>
        <Card.Link href={`/newsandevents/${card.id}`} target="_blank">{t('read_more')}</Card.Link>
      </Card>
    );
  };

  return (
    <div className={styles.mainDiv}>
      <Container className={styles.relativeClass}>
        <Row className={styles.newEventsHeaderContainer}>
          <span className={styles.mainText}>{t('news_and_events')}</span>
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
          {newsAndEvents.map(renderCard)}
        </Carousel>
      </Container>
    </div>
  );
};

export default NewsAndEventsComponent;