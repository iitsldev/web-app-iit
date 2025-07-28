import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NavigationCommonLayout from '../components/navigationcommonlayout/NavigationCommonLayout';
import { Container, Row, Col } from 'react-bootstrap';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import AcademicProfile from '../components/academicprofile/AcademicProfile';

export default function Institute({ instituteList, academicProfiles }) {
  const { t, lang } = useTranslation('institute-page');
  const router = useRouter();

  // Ensure academicProfiles is an array, provide fallback if not
  const profiles = Array.isArray(academicProfiles) ? academicProfiles : [];

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
      <div className="navbarCarouselWrapper institute">
        <Header />
      </div>
      <MainLayoutSection
        title={t('main_layout_title')}
        description={t('main_layout_description')}
        photo="/Institute.png"
        backgroundImg="url(/Ellipse-4.svg)"
      />
      <NavigationCommonLayout navigationList={instituteList} />
      <Container>
        <div className="inst-academic-header" id="academy">
          {t('academy')}
        </div>
        <div className="inst-academic-academy-text">
          {t('academy_description')}
        </div>
        <div className="inst-academic-header" id="academic-staff">
          {t('faculty_members')}
        </div>

        <div className="inst-academic-masonry">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <div className="inst-masonry-item" key={index}>
                <AcademicProfile
                  body={profile.body}
                  name={profile.name}
                  profileImage={profile.profileImage}
                  title={profile.title}
                  body2={profile.body2}
                />
              </div>
            ))
          ) : (
            <p>{t('no_academic_profiles')}</p>
          )}
        </div>


        <div className="inst-academic-header" id="monastery">
          {t('monastery')}
        </div>
        <div className="inst-academic-academy-text">
          {t('monastery_description')}
        </div>
      </Container>

      <Container className="inst-admin-struct-container" id="administration">
        {/* Rest of the administration section remains the same */}
        <div className="inst-admin-struct-header">
          {t('administrational_structure')}
        </div>
        <div className="inst-admin-struct-main-text">
          {t('administrational_structure_main_text')}
        </div>

        <div className="inst-admin-struct-sub-text">
          {t('administrational_structure_sub_text')}
        </div>

        <div className="inst-admin-struct-general">{t('general_assembly')}</div>

        <div className="inst-admin-struct-general-subtext">
          <div className="inst-assembly-container">
            <p className="inst-admin-executive-content">
              {t('executive_board_description')}
            </p>
            <hr className="inst-assembly-vert-line"></hr>
            <hr className="inst-assembly-horiz-line"></hr>
            <div className="inst-council-container">
              <div className="inst-council-container-col">
                <div className="inst-council-container-col-item">
                  <span className="inst-council-container-col-title">
                    {t('executive_board')}
                  </span>
                  <p className="inst-council-container-col-desc">
                    {t('executive_board_description')}
                  </p>
                </div>
                <div className="inst-assembly-vert-line-short-container">
                  <hr className="inst-assembly-vert-line-short"></hr>
                </div>
                <div className="inst-council-container-col-item">
                  <p className="inst-council-container-col-title-two">
                    {t('study_council')}
                  </p>
                  <p className="inst-council-container-col-desc">
                    {t('study_council_description')}
                  </p>
                </div>
                <div className="inst-assembly-vert-line-short-container">
                  <hr className="inst-assembly-vert-line-short"></hr>
                </div>
                <div className="inst-council-container-col-item">
                  <p className="inst-council-container-col-title-two">
                    {t('monastic_council')}
                  </p>
                  <p className="inst-council-container-col-desc">
                    {t('monastic_council_description')}
                  </p>
                </div>
              </div>
              <div className="inst-council-container-col">
                <span className="inst-council-container-col-title">{t('senat')}</span>
                <p className="inst-council-container-col-desc">
                  {t('senat_description')}
                </p>
              </div>
              <div className="inst-council-container-col">
                <span className="inst-council-container-col-title">
                  {t('vinaya_council')}
                </span>
                <p className="inst-council-container-col-desc">
                  {t('vinaya_council_description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const [instituteResponse, profilesResponse] = await Promise.all([
      fetch(`${process.env.API_BASE_URL}/api/navigation/institute`),
      fetch(`${process.env.API_BASE_URL}/api/academic-profiles`)
    ]);

    const instituteList = await instituteResponse.json();
    const academicProfiles = await profilesResponse.json();

    return {
      props: {
        instituteList: instituteList || [],
        academicProfiles: academicProfiles || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        instituteList: [],
        academicProfiles: [],
      },
    };
  }
}