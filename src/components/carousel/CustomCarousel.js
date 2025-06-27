import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './CustomCarousel.module.css';

// Sample JSON data (to be replaced with DB data later)
const carouselData = [
  {
    id: 1,
    title: 'Poya Day Programs',
    description: 'Join our online Dhamma programs during full moon days, featuring discourses and meditation instructions in Sinhala and English.',
    image: '/temple.svg',
    imageWidth: '100px',
    imageHeight: '100px'
  },
  {
    id: 2,
    title: 'IIT Mission',
    description: 'International Institute of Theravada trains Buddhist monks in attahita, parahita, and vinayadhara, fostering spiritual and scholarly growth.',
    image: '/buddha_20250628.png',
    imageWidth: '400px',
    imageHeight: '500px'
  },
  {
    id: 3,
    title: 'Dhamma Wheel Symbolism',
    description: 'The brown Dhamma Wheel with 24 spokes represents the Noble Truths, supported by palm-leaf books, symbolizing Dhamma and Vinaya studies.',
    image: '/IIT-2.svg',
    imageWidth: '100px',
    imageHeight: '100px'
  }
];

function CustomCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carouselWrapper}>
      <Carousel activeIndex={index} onSelect={handleSelect} className={styles.carousel}>
        {carouselData.map((item) => (
          <Carousel.Item key={item.id}>
            <div className={styles.carouselItem}>
              <img
                className={styles.carouselImage}
                src={item.image}
                alt={item.title}
                style={{ width: item.imageWidth, height: item.imageHeight }}
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <h3 className={styles.carouselTitle}>{item.title}</h3>
                <p className={styles.carouselDescription}>{item.description}</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CustomCarousel;