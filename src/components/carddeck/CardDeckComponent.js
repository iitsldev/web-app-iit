import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import styles from './CardDeck.module.css';
import { BsArrowRight } from 'react-icons/bs';
import $ from 'jquery';
import sanitizeHtml from 'sanitize-html';
import useTranslation from 'next-translate/useTranslation';

const CardDeckComponent = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const { t } = useTranslation('card-deck');

  useEffect(() => {
    async function fetchCardData() {
      try {
        const response = await fetch('/api/cards');
        if (!response.ok) throw new Error('Failed to fetch cards');
        const data = await response.json();
        setCardInfo(data);
      } catch (error) {
        console.error('Failed to fetch card data:', error);
      }
    }
    fetchCardData();
  }, []);

  function normalizeCardHeights() {
    $('.card-container').each(function () {
      var items = $('.card-dynamic-height', this);
      items.css('height', 'auto');
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
    $(window).on('load resize orientationchange', normalizeCardHeights);
    normalizeCardHeights();
    return () => {
      $(window).off('load resize orientationchange');
    };
  }, []);

  const renderCard = (card, index) => {
    return (
      <Col key={index}>
        <Card className={styles.cardComponent}>
          <Card.Body
            style={{ background: card.color }}
            className={`card-dynamic-height ${styles.cardBody}`}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card.Img
                variant="top"
                src={card.image}
                className={styles.cardImage}
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>

            <Card.Title
              style={{ color: card.titleColor, textAlign: 'center' }}
              className={styles.cardTitle}
            >
              <Card.Link href={card.link}>
                {card.title}
              </Card.Link>
            </Card.Title>
            <Card.Text
              style={{ color: card.titleColor }}
              className={styles.cardText}
            >
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.description) }} />
            </Card.Text>
          </Card.Body>

        </Card>
      </Col>
    );
  };

  return (
    <Container className={`card-container ${styles.deckContainer}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={styles.deckHeader} style={{ textAlign: 'center' }}>
        <p className={styles.deckHeaderIntro}>
          {t('intro')}
        </p>
      </div>
      <Row xs={1} sm={2} md={2} lg={4} className="justify-content-center">
        {cardInfo.map(renderCard)}
      </Row>
    </Container>
  );
};

export default CardDeckComponent;