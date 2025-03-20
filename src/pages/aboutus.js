import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import AboutUsComponent from '../components/aboutUsComponent/aboutUsComponent';
import { aboutUsList } from '../data/commonLayoutNavigationData';
import NavigationCommonLayout from '../components/navigationcommonlayout/NavigationCommonLayout';

export default function AboutUs() {
  const { t, lang } = useTranslation();
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>About Us</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="international institute of theravada"
        />
      </Head>

      <div className="navbarCarouselWrapper about">
        <Header />
      </div>

      <MainLayoutSection
        title="About Us"
        description="Comprehensive training institute aimed at facilitating spiritual and academic development of Buddhist monks, based on Theravada teachings."
        photo="/aboutus.png"
        backgroundImg="url(/Ellipse-4.svg)"
      />

      <NavigationCommonLayout navigationList={aboutUsList} />
      <AboutUsComponent />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const aboutUsResponse = await fetch(`${process.env.API_BASE_URL}/api/navigation/aboutUs`);
  const missionsResponse = await fetch(`${process.env.API_BASE_URL}/api/missions`);
  const ourFocusResponse = await fetch(`${process.env.API_BASE_URL}/api/our-focus`);

  let aboutUsList = [];
  let missions = [];
  let ourFocus = [];

  if (!aboutUsResponse.ok) {
    console.error(`Failed to fetch aboutUsList: ${aboutUsResponse.status}`);
  } else {
    aboutUsList = await aboutUsResponse.json();
  }

  if (!missionsResponse.ok) {
    console.error(`Failed to fetch missions: ${missionsResponse.status}`);
  } else {
    missions = await missionsResponse.json();
  }

  if (!ourFocusResponse.ok) {
    console.error(`Failed to fetch our focus: ${ourFocusResponse.status}`);
  } else {
    ourFocus = await ourFocusResponse.json();
  }

  return {
    props: {
      //products
    },
  };
}
