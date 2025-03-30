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
import fs from 'fs/promises'; // Use promises-based fs for async operations

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
  let faqs = [];
  let testimonials = [];
  let newsAndEvents = [];

  // Helper function to log errors to /tmp/error.log
  const logError = async (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    try {
      await fs.appendFile('/tmp/error.log', logMessage);
    } catch (fsError) {
      console.error(`Failed to write to /tmp/error.log: ${fsError.message}`);
    }
  };

  try {
    // Fetch General FAQs
    const responseGeneralFAQ = await fetch(`${process.env.API_BASE_URL}/api/general-faqs`);
    if (!responseGeneralFAQ.ok) {
      const errorMsg = `Failed to fetch FAQs: ${responseGeneralFAQ.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      faqs = await responseGeneralFAQ.json();
    }

    // Fetch Testimonials
    const responseTestimonials = await fetch(`${process.env.API_BASE_URL}/api/testimonials`);
    if (!responseTestimonials.ok) {
      const errorMsg = `Failed to fetch testimonials: ${responseTestimonials.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      testimonials = await responseTestimonials.json();
    }

    // Fetch News and Events
    const responseNewsAndEvents = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`);
    if (!responseNewsAndEvents.ok) {
      const errorMsg = `Failed to fetch news and events: ${responseNewsAndEvents.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      newsAndEvents = await responseNewsAndEvents.json();
    }
  } catch (error) {
    // Catch any unexpected errors (e.g., network issues, JSON parsing errors)
    const errorMsg = `Unexpected error in getServerSideProps: ${error.message}`;
    await logError(errorMsg);
    console.error(errorMsg);
  }

  return {
    props: {
      faqs, // Will be empty array if fetch fails
      testimonials, // Will be empty array if fetch fails
      newsAndEvents, // Will be empty array if fetch fails
    },
  };
}