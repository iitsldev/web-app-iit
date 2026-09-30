import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import AboutUsComponent from '../components/aboutUsComponent/AboutUsComponent';
import NavigationCommonLayout from '../components/navigationcommonlayout/NavigationCommonLayout';
import fs from 'fs/promises'; // For async file operations

export default function AboutUs({ aboutUsList, missions, ourFocus }) {
  const { t, lang } = useTranslation('about-us-page');
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>{t('page_title')}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t('page_description')}
        />
      </Head>
      <div className="navbarCarouselWrapper about">
        <Header />
      </div>
      <MainLayoutSection
        title={t('main_layout_title')}
        description={t('main_layout_description')}
        photo="/aboutus.png"
        backgroundImg="url(/Ellipse-4.svg)"
      />
      <NavigationCommonLayout navigationList={aboutUsList} />
      <AboutUsComponent missions={missions} ourFocus={ourFocus} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  let aboutUsList = [];
  let missions = [];
  let ourFocus = [];

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
    // Fetch About Us Navigation List
    const aboutUsResponse = await fetch(`${process.env.API_BASE_URL}/api/navigation/aboutUs`);
    if (!aboutUsResponse.ok) {
      const errorMsg = `Failed to fetch aboutUsList: ${aboutUsResponse.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      aboutUsList = await aboutUsResponse.json();
    }

    // Fetch Missions
    const missionsResponse = await fetch(`${process.env.API_BASE_URL}/api/missions`);
    if (!missionsResponse.ok) {
      const errorMsg = `Failed to fetch missions: ${missionsResponse.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      missions = await missionsResponse.json();
    }

    // Fetch Our Focus
    const ourFocusResponse = await fetch(`${process.env.API_BASE_URL}/api/our-focus`);
    if (!ourFocusResponse.ok) {
      const errorMsg = `Failed to fetch our focus: ${ourFocusResponse.status}`;
      await logError(errorMsg);
      console.error(errorMsg);
    } else {
      ourFocus = await ourFocusResponse.json();
    }
  } catch (error) {
    // Catch unexpected errors (e.g., network issues, JSON parsing errors)
    const errorMsg = `Unexpected error in getServerSideProps: ${error.message}`;
    await logError(errorMsg);
    console.error(errorMsg);
  }

  return {
    props: {
      aboutUsList, // Empty array if fetch fails
      missions, // Empty array if fetch fails
      ourFocus, // Empty array if fetch fails
    },
  };
}