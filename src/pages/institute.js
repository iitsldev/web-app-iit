import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NavigationCommonLayout from '../components/navigationcommonlayout/NavigationCommonLayout';
import { Container, Row, Col } from 'react-bootstrap';
import { instituteList } from '../data/commonLayoutNavigationData';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import AcademicProfile from '../components/academicprofile/AcademicProfile';

export default function Institute({ instituteList, academicProfiles }) {
    const { t, lang } = useTranslation();
    const router = useRouter();

    // Ensure academicProfiles is an array, provide fallback if not
    const profiles = Array.isArray(academicProfiles) ? academicProfiles : [];

    return (
        <div className="skeleton">
            <Head>
                <title>Institute</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="international institute of theravada"
                />
            </Head>
            <div className="navbarCarouselWrapper institute">
                <Header />
            </div>
            <MainLayoutSection
                title="Institute"
                description="IIT as an institution has both monastic features and, at the same time, features of a well-organized academic institute autonomously governed by its own peculiar constitution."
                photo="/Institute.png"
                backgroundImg="url(/Ellipse-4.svg)"
            />
            <NavigationCommonLayout navigationList={instituteList} />
            <Container>
                <div className="inst-academic-header" id="academy">
                    Academy
                </div>
                <div className="inst-academic-academy-text">
                    In our Academy, we impart Theravada teachings in their purest form in
                    Buddhist monks and train them in authentic Theravada meditation
                    techniques. Foremost objective of our Academy is to capacitate our
                    students who have profound apprehension on fundamentals of the
                    doctrine and meditation practice as preserved by the tradition of
                    Theravada.
                </div>
                <div className="inst-academic-header" id="academic-staff">
                    Academic Staff
                </div>
                <Row className="inst-academic-row">
                    {profiles.length > 0 ? (
                        profiles.map((profile, index) => (
                            <Col key={index} md={6} lg={4}>
                                <AcademicProfile
                                    body={profile.body}
                                    name={profile.name}
                                    profileImage={profile.profileImage}
                                    title={profile.title}
                                    body2={profile.body2}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No academic profiles available at this time.</p>
                        </Col>
                    )}
                </Row>

                <div className="inst-academic-header" id="monastery">
                    Monastery
                </div>
                <div className="inst-academic-academy-text">
                    IIT, being a monk-training center, has a monastery. In it, students
                    can lead their lives well according to the disciplinary code advocated
                    under the Theravada Vinaya. Monks in IIT fully abstain from using or
                    handling money as admonished by the Buddha and strive to achieve their
                    aspired sublime goals as per doctrine they have studied in the
                    Academy.
                </div>
            </Container>

            <Container className="inst-admin-struct-container" id="administration">
                {/* Rest of the administration section remains the same */}
                <div className="inst-admin-struct-header">
                    Administrational Structure
                </div>
                {/* ... rest of the administration content ... */}
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
