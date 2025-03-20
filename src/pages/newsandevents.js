import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
//import TimeLine from '../components/timelineComponent/TimelineComponent';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import newsAndEvents from '../data/newsAndEventsData.json';
import React, { useState } from 'react';

export default function NewsAndEvents() {
  const { t, lang } = useTranslation();
  const router = useRouter();

  var array = [];
  newsAndEvents.map((element, index) => {
    if (element.type.indexOf('Event') > -1) {
      var item = {};
      item.title = element.date;
      item.cardTitle = element.title;
      item.cardDetailedText = element.description;
      item.dateStr = element.dateStr;
      item.url = 'http://www.history.com'; // '/newsandevents/' + index +1;
      item.media = {
        type: 'IMAGE',
        source: {
          url: element.image,
        },
      };
      array.push(item);
    }
  });

  const [arrayNews, setArrayNews] = useState([]);
  const [arrayEvents, setArrayEvents] = useState([]);

  var newArr = array.sort(function (a, b) {
    return new Date(b.dateStr) - new Date(a.dateStr);
  });

  arrayEvents.sort(function (a, b) {
    return new Date(b.dateStr) - new Date(a.dateStr);
  });

  return (
    <div>
      <title>News and Events</title>
      <div className="navbarCarouselWrapper institute">
        <Header />
        <MainLayoutSection
          title="News and Events"
          description="Be informed of our wholesome activities. Join, Rejoice, and Accumulate Great Merits."
          photo="/Group 1071.png"
          backgroundImg="url(/MaskGroup3.svg)"
        />
      </div>

      <div>
        <div className="news-and-events-chrono-container">
          <Container className="news-and-events-container-timeline">
            <p className="news-and-events-chrono-title">Timeline</p>
            <Chrono
              items={newArr}
              mode="HORIZONTAL"
              theme={{
                primary: '#532F00',
                secondary: '#FFD607',
                cardBgColor: 'transparent',
                cardForeColor: '#545454',
                titleColor: '#616057',
              }}
            />
            {/* <TimeLine /> */}
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`); // Fixed API endpoint
    if (!response.ok) {
      console.error(`Failed to fetch news and events: ${response.status}`);
      return {
        props: {
          initialNewsAndEvents: [],
        },
      };
    }
    const newsAndEvents = await response.json();
    return {
      props: {
        initialNewsAndEvents: newsAndEvents
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
          .map((item) => ({
            ...item,
            date: item.date,
          })),
      },
    };
  } catch (error) {
    console.error('Error fetching news and events:', error);
    return {
      props: {
        initialNewsAndEvents: [],
      },
    };
  }
}
