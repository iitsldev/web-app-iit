import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import MeditationComponent from '../components/meditation/MeditationComponent';

export default function Meditation({ meditations }) {
  const { t, lang } = useTranslation('common');
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>{t('meditation_title')}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t('meditation_description')}
        />
      </Head>

      <div className="navbarCarouselWrapper contact">
        <Header />
      </div>

      <MainLayoutSection
        title={t('meditation_title')}
        description={t('meditation_description')}
        photo="/Meditate.png"
        backgroundImg="url(/Ellipse-7.svg)"
      // info="Are you looking for guidance for your mediation? IIT is willing to render a helping hand in your noble quest."
      />

      <MeditationComponent meditations={meditations} />

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {

  const response = await fetch(`${process.env.API_BASE_URL}/api/meditations`);
  if (!response.ok) {
    console.error(`Failed to fetch meditations: ${response.status}`);
    return {
      props: {
        meditations: [],
      },
    };
  }
  const meditations = await response.json();
  return {
    props: {
      meditations,
    },
  };
}