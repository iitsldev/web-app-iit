import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import CustomCarousel from '../components/carousel/CustomCarousel';
import CardDeckComponent from '../components/carddeck/CardDeckComponent';
import Header from '../components/header/Header';
import NewsAndEventsComponent from '../components/newsandevents/NewsAndEventsComponent';
import Footer from '../components/footer/Footer';
import Testimonials from '../components/testimonials/Testimonials';
import GeneralFAQ from '../components/generalfaq/GeneralFAQ';

export default function Home({ faqs, testimonials, newsAndEvents }) {
  const { t, lang } = useTranslation();
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>Home</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="International Institute of Theravada"
        />
      </Head>

      <div className="navbarCarouselWrapper">
        <div>
          <Header />
        </div>
        <CustomCarousel />
      </div>

      <CardDeckComponent />
      <NewsAndEventsComponent newsAndEvents={newsAndEvents} />
      <Testimonials testimonials={testimonials} />

      {/* Remove below div when GeneralFAQ section added */}
      <div className="mt-4"></div>
      <GeneralFAQ faqs={faqs} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const responseGeneralFAQ = await fetch(`${process.env.API_BASE_URL}/api/general-faqs`);
  const responseTestimonials = await fetch(`${process.env.API_BASE_URL}/api/testimonials`);
  const responseNewsAndEvents = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`);

  let faqs = [];
  let testimonials = [];
  let newsAndEvents = [];

  if (!responseGeneralFAQ.ok) {
    console.error(`Failed to fetch FAQs: ${responseGeneralFAQ.status}`);
  } else {
    faqs = await responseGeneralFAQ.json();
  }

  if (!responseTestimonials.ok) {
    console.error(`Failed to fetch testimonials: ${responseTestimonials.status}`);
  } else {
    testimonials = await responseTestimonials.json();
  }

  if (!responseNewsAndEvents.ok) {
    console.error(`Failed to fetch news and events: ${responseNewsAndEvents.status}`);
  } else {
    newsAndEvents = await responseNewsAndEvents.json();
  }

  return {
    props: {
      faqs,
      testimonials,
      newsAndEvents,
    },
  };
}
