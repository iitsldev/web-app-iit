import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './CustomCarousel.module.css';


function CustomCarousel() {
  const [carouselData, setCarouselData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/carousel')
      .then(res => res.json())
      .then(data => setCarouselData(data));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };



  return (
    <div className={styles.customCarouselWrapper}>
      <div className={styles.customEllipse}></div>
      <Carousel
        className={styles.mainCarousel}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {carouselData.map((item) => (
          <Carousel.Item key={item.id}>
            <div className={`d-flex flex-column flex-md-row align-items-center align-items-md-stretch ${styles.carouwrap}`}>
              <div className={`container ${styles.motoContainer}`}>
                <div className="row align-items-center">
                  <div className={`col-md-12 col-xl-6 order-xl-2 ${styles.motoItem} d-flex align-items-center justify-content-center`}>
                    <div className={styles.motoImage}>
                      <img
                        className="img-fluid banner-img-max-width border-radius-50"
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        style={{ width: item.imageWidth, height: item.imageHeight }}
                      />
                    </div>
                  </div>
                  <div className={`col-md-12 col-xl-6 order-xl-1 text-white ${styles.motoItem}`}>
                    <div className={styles.bannerTextOne}>
                      <img src="/swirlLeftt.png" width="80px" />
                      {item.title}
                      <img src="/swirlRight.png" width="80px" />
                    </div>
                    <div
                      className={styles.bannerTextTwo}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CustomCarousel;