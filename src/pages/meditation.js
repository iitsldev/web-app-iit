import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import MeditationComponent from '../components/meditation/MeditationComponent';

export default function Meditation({ meditations }) {
  const { t, lang } = useTranslation();
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>Meditation</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="international institute of theravada"
        />
      </Head>

      <div className="navbarCarouselWrapper contact">
        <Header />
      </div>

      <MainLayoutSection
        title="Meditation"
        description="Meditation is a part of daily life of anyone who is seeking spiritual fulfilment."
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
<<<<<<< HEAD
  const response = await fetch('http://localhost:3000/api/meditations');
=======
<<<<<<< Updated upstream
  // const products = await fetch('https://fakestoreapi.com/products')
  // .then(res=>res.json());

=======
  const response = await fetch(`${process.env.API_BASE_URL}/api/meditations`);
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js
  if (!response.ok) {
    console.error(`Failed to fetch meditations: ${response.status}`);
    return {
      props: {
        meditations: [],
      },
    };
  }
  const meditations = await response.json();
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js
  return {
    props: {
      meditations,
    },
  };
}