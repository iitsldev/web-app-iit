import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';

export default function NewsAndEvents({ newsAndEvents }) {
  const { t } = useTranslation();
  const router = useRouter();

  // Transform the data for Chrono timeline
  const timelineItems = newsAndEvents
    .filter(item => item.type === 'Event')
    .map(element => ({
      title: element.date,
      cardTitle: element.title,
      cardDetailedText: element.description,
      dateStr: element.dateStr,
      url: `/newsandevents/${element.slug}`,
      media: element.image ? {
        type: 'IMAGE',
        source: {
          url: element.image,
        },
      } : null
    }))
    .sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr));

  const newsItems = newsAndEvents
    .filter(item => item.type === 'News')
    .map(element => ({
      title: element.date,
      cardTitle: element.title,
      cardDetailedText: element.description,
      dateStr: element.dateStr,
      url: `/newsandevents/${element.slug}`,
      media: element.image ? {
        type: 'IMAGE',
        source: {
          url: element.image,
        },
      } : null
    }))
    .sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr));

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
              items={timelineItems}
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
        <div>
          <Container className="news-and-events-container-timeline">
            <p className="news-and-events-chrono-title">Timeline</p>
            <Chrono
              items={newsItems}
              mode="VERTICAL"
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

export async function getStaticProps() {
  const newsDirectory = path.join(process.cwd(), 'news_events');
  const filenames = fs.readdirSync(newsDirectory);

  const newsAndEvents = filenames.map(filename => {
    const filePath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Generate slug from filename (remove .md and get the rest)
    const slug = filename.replace(/\.md$/, '');

    return {
      slug,
      content: content.trim(),
      ...data
    };
  });

  return {
    props: {
      newsAndEvents
    },
    // Revalidate every hour
    revalidate: 3600
  };
}