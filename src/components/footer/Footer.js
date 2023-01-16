import { Row, Container, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import {
  BsFacebook,
  BsYoutube,
  BsWhatsapp,
  BsTelegram,
  BsGoogle,
} from 'react-icons/bs';
import styles from './CustomFooter.module.css';

function Footer() {
  return (
    <footer className="page-footer font-small unique-color-dark">
      <div className={styles.mainDiv}>
        <div className="container">
          <div className="row py-4 align-items-center flex-column-reverse flex-lg-row">
            <div className="col-sm-12 col-md-6 col-lg-7 text-center text-md-left mb-md-0 p-0 ">
              <h6>
                <div className={styles.instituteHeading}>International </div>
                <div className={styles.instituteHeading}>Institute of</div>
                <div className={styles.instituteHeading}>Theravada</div>
              </h6>
            </div>
            <div
              className={`col-sm-12 col-md-6 col-lg-5 text-end  text-md-right p-0 ${styles.footerIcons}`}
            >
              <a
                href="https://www.facebook.com/InstituteOfTheravada/"
                target="_blank"
              >
                <BsFacebook color="white" size={25} />
              </a>
              &nbsp;&nbsp;&nbsp;
              <a
                href="https://www.youtube.com/channel/UCFhy_YsPcufmBl4AqkvaUXA"
                target="_blank"
              >
                <BsYoutube color="white" size={25} />
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://wa.me/94760370189" target="_blank">
                <BsWhatsapp color="white" size={25} />
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://t.me/IITtechnicalassistant" target="_blank">
                <BsTelegram color="white" size={25} />
              </a>
              {/* &nbsp;&nbsp;&nbsp;
              <a href="#" target="_blank">
                <BsGoogle color="white" size={25} />
              </a> */}
            </div>
          </div>
        </div>

        <hr className={styles.hrLine} />

        <Container fluid className="padding-right=0px ">
          <Row xs={1} md={4} lg={6} style={{ color: 'white' }}>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.removePaddingStyle}>
                <li className={styles.liMain}>
                  <Link href="/aboutus">About Us</Link>
                </li>
                {/* <li className={styles.liSub}>
                  {' '}
                  <a href="#"> History of Theravada Buddhism</a>
                </li> */}
                <li className={styles.liSub}>
                  <Link href="/aboutus#what-is-iit">What is IIT?</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/aboutus#establishment">Establishment</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/aboutus#our-vision-and-mission">
                    Vision &amp; Mission
                  </Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/aboutus#our-focus">Our Focus</Link>
                </li>
                {/* <li className={styles.liSub}>
                  <a href="#">Spirituality</a>
                </li> */}
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}>
                  <Link href="/institute">Institute</Link>
                </li>
                {/* <li className={styles.liSub}>
                  {' '}
                  <a href="#"> Academy</a>
                </li> */}
                <li className={styles.liSub}>
                  <Link href="/institute#academy">Academy</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/institute#academic-staff">Academic Staff</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/institute#monastery">Monastery</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/institute#administration">Administration</Link>
                </li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}>
                  <Link href="/education">Education</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/education#courses-conducted">
                    Courses Conducted
                  </Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/education#dhamma-lectures-and-sermons">
                    Dhamma Lectures and Sermons
                  </Link>
                </li>
                {/* <li className={styles.liSub}>
                  {' '}
                  <a href="#"> Programms Trainings</a>
                </li> */}
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}>
                  <Link href="/meditation">Meditation</Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/meditation#samatha-meditation">
                    Samatha Meditation
                  </Link>
                </li>
                <li className={styles.liSub}>
                  <Link href="/meditation/#vipassana-meditation">
                    Vipassanā Meditation
                  </Link>
                </li>
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <li className={styles.liMain}>
                  <Link href="/newsandevents">News &amp; Events</Link>
                </li>
                {/* <li className={styles.liSub}>
                  {' '}
                  <a href="#"> News and Events</a>
                </li> */}
                <li className={styles.liSub}>
                  <Link href="/newsandevents#timeline">Timeline</Link>
                </li>
                {/* <li className={styles.liSub}>
                  {' '}
                  <a href="#"> Messages</a>
                </li> */}
              </ul>
            </Col>
            <Col className={styles.removePaddingStyle}>
              <ul className={styles.ulPaddingStyle}>
                <div className={styles.liContactUs}>
                  <Link href="/contactus">Contact Us</Link>
                </div>
                <div className={styles.contactDetails}>
                  <Link href="mailto:inst.theravada@gmail.com">
                    inst.theravada@gmail.com
                  </Link>
                  <br />
                  <Link href="tel:0094760908841">+(94)760908841</Link> <br />
                  <Link href="tel:0094767253178">+(94)767253178</Link>
                </div>
                <br />
                <div className={styles.contactDetails}>
                  {' '}
                  Heenetikalma, Karuwalagaswewa, Sri Lanka.
                </div>
                <br />
                <div className={styles.contactDetails}> Get Directions</div>
                <div className={styles.supportBtn}>
                  <Button
                    variant="warning"
                    className={styles.supportBtn}
                    href="/howtosupport"
                  >
                    How To Support
                  </Button>
                </div>
              </ul>
            </Col>
          </Row>

          <Row className={styles.lastLine}>
            <Col
              className={styles.removePaddingStyle}
              xs={2}
              sm={3}
              md={2}
              lg={2}
            >
              {/* <a href="#"> Privacy Policy</a> */}
            </Col>
            <Col xs={2} sm={3} md={6} lg={5}>
              {/* <a href="#"> Terms of Use</a> */}
            </Col>
            <Col className={styles.copyright} xs={8} sm={6} md={4} lg={5}>
              ©{GetCurrentYear()} International Institute of Theravada
            </Col>
          </Row>
        </Container>

        <div className={`container ${styles.textColorWhite}`}>
          <div className="row">
            {/* <div className="col-6"><a href='#'> Privacy Policy</a></div>
            <div className="col-6 text-end"><a href='#'> Terms of Use</a></div> */}
          </div>
          <div className={`row ${styles.textOpacity}`}>
            <div className="col-xs-12">
              <a href="#">
                ©{GetCurrentYear()} International Institute of Theravada
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GetCurrentYear() {
  return new Date().getFullYear();
}

export default Footer;
