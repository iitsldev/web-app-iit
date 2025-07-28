import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import NavigationCommonLayout from '../components/navigationcommonlayout/NavigationCommonLayout';

import {
  Tabs,
  CardGroup,
  Card,
  Container,
  Tab,
  Row,
  Col,
  ListGroup,
  Sonnet,
} from 'react-bootstrap';
import {
  BsWatch,
  BsFillBookFill,
  BsCheckSquare,
  BsShieldFillPlus,
  BsCardChecklist,
  BsListStars,
  BsPersonCheckFill,
} from 'react-icons/bs';

export default function HowToSupport() {
  const { t, lang } = useTranslation('how-to-support-page');
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
        photo="/How-to-support-new.png"
        backgroundImg="url(/Ellipse-2.svg)"
      />

      {/* <NavigationCommonLayout navigationList={instituteList} /> */}

      <Container>
        <div className="how-to-support-content">
          <div className="how-to-support-main-body">
            {/* <div className="how-to-support-how-to-donate-header">
              Main Aspects
            </div> */}
            <div className="how-to-support-aspect-container">
              <div className="how-to-support-main-body-col">
                <div className="how-to-support-main-aspects">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-53 margin-right-8"
                    src="/wheelbarrow.svg"
                    alt="construction"
                  />
                  <p className="construct-header">{t('construction')}</p>
                </div>
                <div className="how-to-support-main-aspects-text">
                  {t('construction_description')}
                </div>
              </div>

              <div className="how-to-support-main-body-col mt-7">
                <div className="how-to-support-main-aspects how-to-support-main-aspects-mobile">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-38 margin-right-8"
                    src="/health.svg"
                    alt="healthcare"
                  />
                  <p className="construct-header">{t('healthcare')}</p>
                </div>

                <div className="how-to-support-main-aspects-text">
                  {t('healthcare_description')}
                </div>
                <br></br>
                <br></br>
                <div className="how-to-support-main-aspects">
                  <img
                    className="d-block w-100 banner-social-icon-max-width-53 margin-right-16"
                    src="/dhamma.svg"
                    alt="Dhamma"
                  />
                  <p className="construct-header">{t('propagating_dhamma')}</p>
                </div>
                <div className="how-to-support-main-aspects-text">
                  {t('propagating_dhamma_description')}
                </div>
              </div>
            </div>

            {/* <div className="how-to-support-quote">
              <img
                className="d-block w-100 banner-social-icon-max-width-45"
                src="/leftQuote.svg"
                alt="Quote"
              />
              <div className="how-to-support-hr-quote-container">
                <hr className="how-to-support-hr-quote"></hr>
                <div className="how-to-support-quote-container">
                  <blockquote className="blockquote mb-0 ">
                    <p className="how-to-support-quote-p">
                      Sāgārā anagārā ca - ubho aññoññanissitā, <br />
                      Ᾱrādhayanti saddhammaṃ - yogakkhemaṃ anuttaraṃ.
                    </p>
                    <footer className="how-to-support-source-name">
                      Sutta Pitaka, Kuddaka Nikāya, Itivuttaka, Catukkanipāta,
                      bahukārasuttaṃ
                    </footer>
                    <br />
                    <p className="how-to-support-quote-p">
                      While lay devotees support monks with relevant requisites,
                      monks enrich them with the noble Dhamma. Thus, the
                      disciples of the Tathāgata get freed from suffering.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div> */}
          </div>
          <div className="how-to-support-main-body-bank-info">
            <div className="how-to-support-main-body-bank-info-section1">
              <div className="how-to-support-main-body-bank-info-section1-title">
                {t('how_to_contribute')}
              </div>
              <div className="how-to-support-main-body-bank-info-section1-body">
                {t('how_to_contribute_description')}
              </div>
            </div>

            <div className="how-to-support-main-body-bank-info-section2">
              <div className="how-to-support-main-body-bank-info-section2-subtitle">
                {t('account_name')}
                <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                  {t('account_name_val')}
                </div>
                <hr></hr>
              </div>

              <div className="how-to-support-main-body-bank-info-section2-col2">
                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('account_number')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('account_number_val')}
                  </div>
                  <hr></hr>
                </div>

                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('bank_name')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('bank_name_val')}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className="how-to-support-main-body-bank-info-section2-col2">
                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('branch_name')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('branch_name_val')}
                  </div>
                  <hr></hr>
                </div>

                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('bank_code')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('bank_code_val')}
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div
                className="how-to-support-main-body-bank-info-section2-col2"
                style={{ paddingBottom: '23px' }}
              >
                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('branch_code')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('branch_code_val')}
                  </div>
                  <hr className="how-to-support-main-body-bank-info-separator"></hr>
                </div>

                <div className="how-to-support-main-body-bank-info-section2-subtitle-cust">
                  {t('swift_code')}
                  <div className="how-to-support-main-body-bank-info-section2-subtitle-val">
                    {t('swift_code_val')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="how-to-support-quote">
          <img
            className="d-block w-100 banner-social-icon-max-width-45"
            src="/leftQuote.svg"
            alt="Quote"
          />
          <div className="how-to-support-hr-quote-container">
            <hr className="how-to-support-hr-quote"></hr>
            <div className="how-to-support-quote-container">
              <blockquote className="blockquote mb-0 ">
                <p className="how-to-support-quote-p">
                  {t('quote_p1')}
                </p>
                <footer className="how-to-support-source-name">
                  {t('quote_footer')}
                </footer>
                <br />
                <p className="how-to-support-quote-20">
                  {t('quote_p2')}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </Container>

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
