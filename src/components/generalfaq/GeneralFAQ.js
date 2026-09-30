import React from "react";
import { Container, Accordion } from "react-bootstrap";
import styles from './GeneralFaqSection.module.css';
import useTranslation from 'next-translate/useTranslation';

const GeneralFAQ = ({ faqs }) => {
  const { t } = useTranslation('general-faq');

  const renderAccordion = (card, index) => {
    return (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>
          <div className={styles.questionSpan}>{t('question_prefix')}</div>
          <div className={styles.header}>{card.question}</div>
        </Accordion.Header>
        <Accordion.Body>
          <div className={styles.answerSpan}>{t('answer_prefix')}</div>
          <div className={styles.header}>{card.answer}</div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <Container className={styles.generalFAQContainer}>
      <Accordion flush>
        {faqs.map(renderAccordion)}
      </Accordion>
    </Container>
  );
};

export default GeneralFAQ;