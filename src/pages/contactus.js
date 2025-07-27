import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import ContactUs from '../components/contactus/ContactUs';
import Map from '../components/maps/Map';

export default function AboutUs() {
  const { t, lang } = useTranslation('contact-us-page');
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

      <div className="navbarCarouselWrapper contact">
        <Header />
      </div>

      <MainLayoutSection
        title={t('main_layout_title')}
        description={t('main_layout_description')}
        photo="/contactus.png"
        backgroundImg="url(/Ellipse-3.svg)"
      />

      <ContactUs />

      <div className='mapWrapper'>
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7902.62781765002!2d79.98147722617234!3d7.966475121082108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afd239053e24295%3A0x55e0440823643e03!2sIIT-%20International%20Institute%20of%20Therav%C4%81da!5e0!3m2!1sen!2slk!4v1751105066135!5m2!1sen!2slk"
          width="600" height="450" style="border:0;" allowFullScreen=""
          loading="lazy" referrerpolicy="no-referrer-when-downgrade">

        </iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7902.62781765002!2d79.98147722617234!3d7.966475121082108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afd239053e24295%3A0x55e0440823643e03!2sIIT-%20International%20Institute%20of%20Therav%C4%81da!5e0!3m2!1sen!2slk!4v1751105066135!5m2!1sen!2slk"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mapWrapper">
        <Map
          locationDetails={[
            { lat: 7.977506380440952, long: 79.98450023230482 },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // const products = await fetch('https://fakestoreapi.com/products')
  // .then(res=>res.json());

  return {
    props: {
      //products
    },
  };
}
