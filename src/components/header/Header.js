import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './CustomHeader.module.css';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

function Header() {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'si-LK', name: 'Sinhala', flag: '🇱🇰' },
    // { code: 'vi-VN', name: 'Vietnamese', flag: '🇻🇳' },
  ];

  const currentLanguage = languages.find((l) => l.code === lang);

  return (
    <div className={styles.navBarContainer}>
      <Navbar collapseOnSelect expand="xl" className={styles.navBarTop}>
        <Navbar.Brand
          className={styles.custBrand}
          onClick={() => router.push('/')}
        >
          <div className={styles.headerContainer}>
            <div className={styles.headerIconContainer}>
              <img src="/IIT-1.png" className={styles.bannerImage} />
            </div>
            <div className={styles.bannerText}>
              <div><strong>INTERNATIONAL INSTITUTE OF THERAVADA</strong></div>
              <div><i>Karuwalagaswewa, Sri Lanka</i></div>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.navToggle}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H26M4 15H26M4 23H26" stroke="#380805" strokeWidth="3" />
          </svg>
        </Navbar.Toggle>

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className={styles.navItems}>
            <Nav.Link onClick={() => router.push('/aboutus')}>
              About Us
            </Nav.Link>
            <Nav.Link onClick={() => router.push('/institute')}>
              Institute
            </Nav.Link>
            <Nav.Link onClick={() => router.push('/education')}>
              Education
            </Nav.Link>
            <Nav.Link onClick={() => router.push('/meditation')}>
              Meditation
            </Nav.Link>
            <Nav.Link onClick={() => router.push('/newsandevents')}>
              News & Events
            </Nav.Link>
            {/* <Nav.Link onClick={() => router.push('#publications')}>
              Publications
            </Nav.Link> */}
            <Nav.Link onClick={() => router.push('/contactus')}>
              Contact Us
            </Nav.Link>
            <Nav.Link onClick={() => router.push('/howtosupport')}>
              <span className={styles.supportButton}>How To Support</span>
            </Nav.Link>
            <NavDropdown title={<span>{currentLanguage.flag}</span>} id="collasible-nav-dropdown">
              {languages.map((language) => (
                <Link href={router.asPath} locale={language.code} key={language.code} passHref>
                  <NavDropdown.Item>{language.flag}</NavDropdown.Item>
                </Link>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
