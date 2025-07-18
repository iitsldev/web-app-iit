import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './CustomCarousel.module.css';
import $ from 'jquery';

const carouselData = [
  {
    id: 1,
    imageSrc: "/buddha_20250628.png",
    imageAlt: "Buddha Image",
    title: "IIT",
    description: "International Institute of Theravada is an inclusive bhikkhu training center aiming at capacitating attahita, parahita and vinayadhara Buddhist monks.",
    imageWidth: "100%",
    imageHeight: "auto",
  },
  {
    id: 2,
    imageSrc: "/temple.svg",
    imageAlt: "Temple Image",
    title: "Dhamma Programs",
    description: "IIT holds online Dhamma programs during full moon days. You can listen to various dhamma discourses, meditation instructions in both Sinhala and English medium.",
    imageWidth: "100px",
    imageHeight: "auto"
  },
  {
    id: 3,
    imageSrc: "/IIT-2.svg",
    imageAlt: "IIT Logo",
    title: "Wheel of Dhamma",
    description: "<p><strong>Brown Coloured Large Wheel of Dhamma</strong> indicates how the dispensation of the Buddha is spread all over the world.</p><p><strong>Twenty-four Spokes</strong> of the wheel represent the twenty-four factors of the Noble Truths.</p><p><strong>Palm-Leaf-Books</strong> which holds the wheel of Dhamma indicates how the dispensation depends upon studies on Dhamma and Vinaya after the passing away of the Buddha.</p><p><strong>The Pen and the Palm Leaf</strong> inside the wheel depicts how a monk is involved in studies of Dhamma and Vinaya – pariyatti sāsana.</p><p><strong>The Meditative Figure</strong> shows how a monk is involved in developing spiritual qualities – paṭipatti sāsana.</p><p><strong>The Pagoda</strong> depicts how a monk who involves in both scriptural studies and spiritual practice becomes a noble being who deserves to be venerated having a pagoda built for him.</p>",
    imageWidth: "400px",
    imageHeight: "auto",
  }
];

function CustomCarousel() {
  const [index, setIndex] = useState(0);

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