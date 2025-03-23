'use client';

import { useState } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaViber, FaFacebook, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import styles from './CustomFooter.module.css';

const translations = {
  english: {
    institute: 'International Institute of Theravada',
    aboutUs: 'About Us',
    whatIsIIT: 'What is IIT?',
    establishment: 'Establishment',
    visionMission: 'Vision & Mission',
    ourFocus: 'Our Focus',
    academy: 'Academy',
    academicStaff: 'Academic Staff',
    monastery: 'Monastery',
    administration: 'Administration',
    education: 'Education',
    courses: 'Courses Conducted',
    dhamma: 'Dhamma Lectures and Sermons',
    meditation: 'Meditation',
    samatha: 'Samatha Meditation',
    vipassana: 'Vipassanā Meditation',
    newsEvents: 'News & Events',
    timeline: 'Timeline',
    contactUs: 'Contact Us',
    address: 'Heenetikalma, Karuwalagaswewa, Sri Lanka.',
    getDirections: 'Get Directions',
    howToSupport: 'How To Support',
    copyright: '©{year} International Institute of Theravada',
    social: {
      facebook: 'Facebook',
      youtube: 'YouTube',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      viber: 'Viber'
    }
  },
  sinhala: {
    institute: 'IIT අන්තර්ජාතික ථේරවාද ධර්මායතනය',
    aboutUs: 'අප ගැන',
    whatIsIIT: 'IIT යනු කුමක්ද?',
    establishment: 'ආයතනය පිහිටුවීම',
    visionMission: 'දැක්ම සහ මෙහෙවර',
    ourFocus: 'අපගේ අවධානය',
    academy: 'ශාස්ත්‍රීය අංශය',
    academicStaff: 'ශාස්ත්‍රීය කාර්ය මණ්ඩලය',
    monastery: 'ආරාමය',
    administration: 'පරිපාලනය',
    education: 'අධ්‍යාපනය',
    courses: 'පවත්වනු ලබන පාඨමාලා',
    dhamma: 'ධර්ම දේශනා සහ දහම් වැඩසටහන්',
    meditation: 'භාවනා',
    samatha: 'සමථ භාවනා',
    vipassana: 'විපස්සනා භාවනා',
    newsEvents: 'පුවත් සහ සිදුවීම්',
    timeline: 'කාලරේඛාව',
    contactUs: 'අප හා සම්බන්ධ වන්න',
    address: 'හීනටිකල්ම, කරුවලගස්වැව, ශ්‍රී ලංකාව.',
    getDirections: 'ප්‍රදේශය දැනගන්න',
    howToSupport: 'උපකාර කරන්නේ කෙසේද',
    copyright: '©{year} IIT අන්තර්ජාතික ථේරවාද ධර්මායතනය',
    social: {
      facebook: 'ෆේස්බුක්',
      youtube: 'යූටියුබ්',
      whatsapp: 'වට්ස්ඇප්',
      telegram: 'ටෙලිග්‍රෑම්',
      viber: 'වයිබර්'
    }
  }
};

const socialLinksEnglish = [
  { href: 'https://www.facebook.com/share/1C5Vh8dEgM/', icon: FaFacebook, key: 'facebook' },
  { href: 'https://youtube.com/@iit-internationalinstitute?si=1-I4qmy0TrAebFEp', icon: FaYoutube, key: 'youtube' },
  { href: 'https://whatsapp.com/channel/0029VaSGqK83GJOweLOLzO1S', icon: FaWhatsapp, key: 'whatsapp' },
  { href: 'https://t.me/iit_en_sl', icon: FaTelegram, key: 'telegram' },
  { href: 'https://invite.viber.com/?g2=AQAJebHrykT5WU74ADSu6OKp8A3tx2WPDZVLAxWEVAlImNSaitThdDoZUwEPHi65', icon: FaViber, key: 'viber' }
];

const socialLinksSinhala = [
  { href: 'https://www.facebook.com/share/167H4H5uax/', icon: FaFacebook, key: 'facebook' },
  { href: 'https://youtube.com/@instituteoftheravada.?si=stKpNc2pE6vWh9kX', icon: FaYoutube, key: 'youtube' },
  { href: 'https://whatsapp.com/channel/0029VaTbpDUBqbrHxI4C6x2O', icon: FaWhatsapp, key: 'whatsapp' },
  { href: 'https://t.me/iit_si_sl', icon: FaTelegram, key: 'telegram' },
  { href: 'https://invite.viber.com/?g2=AQBJQ3CD6VmhZE73%2F9FF2aaUMbL%2Bt%2FpQ9AkCY8SnA3tB3Zxs1CFVag56kWNlRHhB', icon: FaViber, key: 'viber' }
];

function Footer() {
  const [language, setLanguage] = useState('english');
  const t = translations[language];
  const socialLinks = language === 'english' ? socialLinksEnglish : socialLinksSinhala;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'sinhala' : 'english');
  };

  return (
    <footer className="page-footer font-small unique-color-dark">
      <div className={styles.mainDiv}>
        <div className="container">
          <div className="row py-4 align-items-center flex-column-reverse flex-lg-row">
            <div className="col-sm-12 col-md-6 col-lg-7 text-center text-md-left mb-md-0 p-0">
              <h6>
                <div className={styles.instituteHeading}>{t.institute}</div>
              </h6>
            </div>
            <div className={`col-sm-12 col-md-6 col-lg-5 text-end text-md-right p-0 ${styles.footerIcons}`}>
              {socialLinks.map(link => (
                <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" className="mx-2" title={t.social[link.key]}>
                  <link.icon color="white" size={25} />
                </a>
              ))}
              <button onClick={toggleLanguage} className="btn btn-sm btn-outline-warning fw-bold p-2 ms-2">
                {language === 'english' ? 'සිංහල' : 'English'}
              </button>
            </div>
          </div>
        </div>

        <hr className={styles.hrLine} />

        <Container fluid>
          <Row xs={1} md={4} lg={6} style={{ color: 'white' }}>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.removePaddingStyle}>
                <li className={styles.liMain}><Link href="/aboutus">{t.aboutUs}</Link></li>
                <li className={styles.liSub}><Link href="/aboutus#what-is-iit">{t.whatIsIIT}</Link></li>
                <li className={styles.liSub}><Link href="/aboutus#establishment">{t.establishment}</Link></li>
                <li className={styles.liSub}><Link href="/aboutus#our-vision-and-mission">{t.visionMission}</Link></li>
                <li className={styles.liSub}><Link href="/aboutus#our-focus">{t.ourFocus}</Link></li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}><Link href="/institute">{t.institute}</Link></li>
                <li className={styles.liSub}><Link href="/institute#academy">{t.academy}</Link></li>
                <li className={styles.liSub}><Link href="/institute#academic-staff">{t.academicStaff}</Link></li>
                <li className={styles.liSub}><Link href="/institute#monastery">{t.monastery}</Link></li>
                <li className={styles.liSub}><Link href="/institute#administration">{t.administration}</Link></li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}><Link href="/education">{t.education}</Link></li>
                <li className={styles.liSub}><Link href="/education#courses-conducted">{t.courses}</Link></li>
                <li className={styles.liSub}><Link href="/education#dhamma-lectures-and-sermons">{t.dhamma}</Link></li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}><Link href="/meditation">{t.meditation}</Link></li>
                <li className={styles.liSub}><Link href="/meditation#samatha-meditation">{t.samatha}</Link></li>
                <li className={styles.liSub}><Link href="/meditation/#vipassana-meditation">{t.vipassana}</Link></li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}><Link href="/newsandevents">{t.newsEvents}</Link></li>
                <li className={styles.liSub}><Link href="/newsandevents#timeline">{t.timeline}</Link></li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <div className={styles.liContactUs}><Link href="/contactus">{t.contactUs}</Link></div>
                <div className={styles.contactDetails}>
                  <Link href="mailto:inst.theravada@gmail.com">inst.theravada@gmail.com</Link><br />
                  <Link href="tel:0094760908841">+(94)760908841</Link><br />
                  <Link href="tel:0094767253178">+(94)767253178</Link>
                </div>
                <br />
                <div className={styles.contactDetails}>{t.address}</div>
                <br />
                <div className={styles.contactDetails}>{t.getDirections}</div>
                <div className={styles.supportBtn}>
                  <Button variant="warning" href="/howtosupport">{t.howToSupport}</Button>
                </div>
              </ul>
            </Col>
          </Row>

          <Row className={styles.lastLine}>
            <Col className={styles.copyright} xs={12} sm={12} md={12} lg={12}>
              {t.copyright.replace('{year}', GetCurrentYear())}
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

function GetCurrentYear() {
  return new Date().getFullYear();
}

export default Footer;