import React from "react";
import { Container, Accordion } from "react-bootstrap";
import styles from './GeneralFaqSection.module.css';

const GeneralFAQ = ({ faqs }) => {
  const renderAccordion = (card, index) => {
    return (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>
          <div className={styles.questionSpan}>Q.</div>
          <div className={styles.header}>{card.question}</div>
        </Accordion.Header>
        <Accordion.Body>
          <div className={styles.answerSpan}>A.</div>
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