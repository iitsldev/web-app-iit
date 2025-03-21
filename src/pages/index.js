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
<<<<<<< HEAD

export async function getServerSideProps(context) {
  const responseGeneralFAQ = await fetch('http://localhost:3000/api/general-faqs');
  const responseTestimonials = await fetch('http://localhost:3000/api/testimonials');
  const responseNewsAndEvents = await fetch('http://localhost:3000/api/news-and-events');
=======
<<<<<<< Updated upstream
=======

export async function getServerSideProps(context) {
  const responseGeneralFAQ = await fetch(`${process.env.API_BASE_URL}/api/general-faqs`);
  const responseTestimonials = await fetch(`${process.env.API_BASE_URL}/api/testimonials`);
  const responseNewsAndEvents = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`);
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js

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
<<<<<<< HEAD
}
=======
}
>>>>>>> Stashed changes
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js
