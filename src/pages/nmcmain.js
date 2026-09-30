import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import {Tab, Container, Tabs, Button} from 'react-bootstrap';

export default function NMCMain() {
  const { t, lang } = useTranslation('nmc-main');
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

      <div className="navbarCarouselWrapper about">
        <Header />
      </div>
      <hr
        style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: 0.5,
          borderColor: '#000000',
        }}
      />
      <Container>
        <h3>Get Registered - ලියාපදිංචි වන්න </h3>

        <Tabs
          defaultActiveKey="English"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="English" title="English">
            <h5>{t('calling_applications_nm_program')}</h5>
            <p>
            {t('nm_program_p1')}
            </p>
            <p>
            {t('nm_program_p2')}
            </p>
            <p>
            {t('nm_program_p3')}
            </p>
            <p>
            {t('nm_program_p4')}
            </p>

          {/*<p>
              The International Institute of Theravada is calling applications
              for the Nissayamuttaka monastic education program which will be
              commencing from December 2022.
            </p> */}
            <h5>{t('course_details')}</h5>
            <p>
              {t('course_details_p1')}
            </p>
            <h5>{t('venue')}</h5>
            <p>
              {t('venue_p1')}
            </p>
            <h5>{t('duration')}</h5>
            <p>
              {t('duration_p1')}
            </p>
            <p>
              <ol>
                <li> {t('basic_stage')} </li>
                <li> {t('intermediate_stage')}</li>
                <li> {t('advanced_stage')}</li>
              </ol>
            </p>
            <p>
              {t('certificate_p1')}
            </p>
            <p>
              {t('academic_semesters_p1')}
            </p>
            <ol>
              <li>
                {t('academic_semesters_li1')}
              </li>
              <li>
                {t('academic_semesters_li2')}
              </li>
            </ol>
            <h5>{t('subjects_taught')}</h5>
            <ol>
              <li>{t('theravada_fundamentals')}</li>
              <li>{t('vinaya')}</li>
              <li>{t('sutta')}</li>
              <li>{t('abhidhamma')}</li>
              <li>{t('pali')}</li>
              <li>{t('samatha')}</li>
              <li>{t('vipassana')}</li>
              <li>{t('history_of_buddhism')}</li>
              <li>{t('navakamma')}</li>
              <li>{t('additional_subjects')}</li>
            </ol>
            <h5>{t('basic_stage')}</h5>
            <ol>
              <li>{t('basic_stage_p1')}</li>
              <li>{t('basic_stage_p2')}</li>
              <li>{t('basic_stage_p3')}</li>
              <li>
                {t('basic_stage_p4')}
              </li>
            </ol>

            <h5>{t('intermediate_stage')}</h5>
            <ol>
              <li>{t('intermediate_stage_p1')} </li>
              <li>{t('intermediate_stage_p2')} </li>
              <li>{t('intermediate_stage_p3')} </li>
              <li>
                {t('intermediate_stage_p4')}
              </li>
              <li>{t('intermediate_stage_p5')} </li>
              <li>{t('intermediate_stage_p6')} </li>
              <li>{t('intermediate_stage_p7')} </li>
              <li>{t('intermediate_stage_p8')} </li>
            </ol>
            <h5>{t('advanced_stage')}</h5>
            <ol>
              <li>{t('advanced_stage_p1')} </li>
              <li>
                {t('advanced_stage_p2')}
              </li>
              <li>
                {t('advanced_stage_p3')}
              </li>
              <li>{t('advanced_stage_p4')} </li>
              <li>
                {t('advanced_stage_p5')}
              </li>
              <li>{t('advanced_stage_p6')}</li>
              <li>
                {t('advanced_stage_p7')}
              </li>
              <li>{t('advanced_stage_p8')} </li>
            </ol>
            <h5>{t('qualifications')}</h5>
            <ul>
              <li>
                {t('qualifications_li1')}
              </li>
              <li>{t('qualifications_li2')} </li>
              <li>{t('qualifications_li3')} </li>
              <li>{t('qualifications_li4')} </li>
            </ul>
            <h5>{t('medium_of_the_course')} </h5>
            <ul>
              <li>
                {t('medium_of_the_course_li1')}
              </li>
            </ul>
            <h5>{t('practical_monastic_training')}</h5>
            <ul>
              <li>
                {t('practical_monastic_training_li1')}
              </li>
              <li>
                {t('practical_monastic_training_li2')}
              </li>
              <li>
                {t('practical_monastic_training_li3')}
              </li>
            </ul>
            <h5>{t('how_to_submit_applications')}</h5>
            <p>
              {t('how_to_submit_applications_p1')}
              <ul>
                <li>
                  {t('how_to_submit_applications_li1')}
                </li>
                <li>
                  {t('how_to_submit_applications_li2')}
                </li>
                <li>
                  {t('how_to_submit_applications_li3')}
                </li>
                <li>
                  {t('how_to_submit_applications_li4')}
                </li>
              </ul>
              <p id="submit">
                {t('application_form')}
                <Button
                  variant="link"
                  href="https://drive.google.com/file/d/1TKHss3ixRy9eDyNOkVbdUWVS4b6BGExj"
                  target="_blank"
                >
                  {t('download_form')}
                </Button>
              </p>
            </p>
            <ul>
              <li>
                {t('option_01')}
                <p>
                  {t('option_01_p1')}
                </p>
                <p>
                  {t('email_address')} <i>academic.iitkaruwalagaswewa@gmail.com</i>
                </p>
              </li>
              <li>
                {t('option_02')}
                <p>
                  {t('option_02_p1')}
                </p>
                <p>
                  {t('postal_address')}
                  <br />
                  <addres>
                    International Institute of Theravada.
                    <br />
                    Heenetikalma, Karuwalagaswewa, Sri Lanka.
                  </addres>
                </p>
              </li>
              <li>
                {t('option_03')}
                <p>
                  {t('option_03_p1')}
                </p>
                <Button
                  variant="primary"
                  href="https://forms.gle/XBmpoPwBV2gt3ngb7"
                  target="_blank"
                >
                  {t('go_to_form')}
                </Button>
              </li>
            </ul>

            <p>
              <Button variant="link" href="mailto:academic.iitkaruwalagaswewa@gmail.com">
                {t('inquiries_email')}
              </Button>
            </p>
            <p>
              <b>
                {t('deadline_extended')}
              </b>
            </p>
          </Tab>
          <Tab eventKey="Sinhala" title={t('tab_sinhala')}>
            <h5>{t('calling_applications_nm_program')}</h5>
            <p>
            {t('sinhala_nm_program_p1')}
            </p>
            <p>
            {t('sinhala_nm_program_p2')}
            </p>
            <p>
            {t('sinhala_nm_program_p3')}
            </p>
            <p>
            {t('sinhala_nm_program_p4')}
            </p>
            {/* <p>
              අන්තර්ජාතික ථේරවාද ධර්මායතනය විසින් 2022 දෙසැම්බර් මාසයේ ආරම්භ
              කරනු ලැබෙන නිශ්‍රය මුක්තක භික්ෂු අධ්‍යාපන වැඩසටහන සඳහා අයදුම්පත්
              කැඳවනු ලැබේ.
            </p> */}
            <h5>{t('course_details')}</h5>
            <p>
              {t('sinhala_course_details_p1')}
            </p>
            <h5>{t('venue')}</h5>
            <p>
              {t('sinhala_venue_p1')}
            </p>
            <h5>{t('duration')}</h5>
            <p>
              {t('sinhala_duration_p1')}
            </p>
            <ol>
              <li>{t('sinhala_basic_stage')}</li>
              <li>{t('sinhala_intermediate_stage')}</li>
              <li>{t('sinhala_advanced_stage')}</li>
            </ol>
            <p>
              {t('sinhala_certificate_p1')}
            </p>
            <ul>
              <li>
                {t('sinhala_academic_semesters_li1')}
              </li>
              <li>
                {t('sinhala_academic_semesters_li2')}
              </li>
              <li>
                {t('sinhala_academic_semesters_li3')}
              </li>
            </ul>
            <h5>{t('subjects_taught')}</h5>
            <ol>
              <li>{t('sinhala_theravada_fundamentals')}</li>
              <li>{t('sinhala_vinaya')}</li>
              <li>{t('sinhala_sutta')}</li>
              <li>{t('sinhala_abhidhamma')}</li>
              <li>{t('sinhala_pali')}</li>
              <li>{t('sinhala_samatha')}</li>
              <li>{t('sinhala_vipassana')}</li>
              <li>{t('sinhala_history_of_buddhism')}</li>
              <li>{t('sinhala_navakamma')}</li>
              <li>{t('sinhala_additional_subjects')}</li>
            </ol>
            <h5>{t('course_details')}</h5>
            <p>{t('basic_stage')}</p>
            <ol>
              <li>
                {t('sinhala_basic_stage_p1')}
              </li>
              <li>{t('sinhala_basic_stage_p2')}</li>
              <li>{t('sinhala_basic_stage_p3')}</li>
              <li>
                {t('sinhala_basic_stage_p4')}
              </li>
            </ol>

            <p>{t('intermediate_stage')}</p>
            <ol>
              <li>
                {t('sinhala_intermediate_stage_p1')}
              </li>
              <li>
                {t('sinhala_intermediate_stage_p2')}
              </li>
              <li>{t('sinhala_intermediate_stage_p3')}</li>
              <li>
                {t('sinhala_intermediate_stage_p4')}
              </li>
              <li>{t('sinhala_intermediate_stage_p5')}</li>
              <li>{t('sinhala_intermediate_stage_p6')}</li>
              <li>{t('sinhala_intermediate_stage_p7')}</li>
              <li>{t('sinhala_intermediate_stage_p8')}</li>
            </ol>
            <p>{t('advanced_stage')}</p>
            <ol>
              <li>{t('sinhala_advanced_stage_p1')}</li>
              <li>
                {t('sinhala_advanced_stage_p2')}
              </li>
              <li>
                {t('sinhala_advanced_stage_p3')}
              </li>
              <li>{t('sinhala_advanced_stage_p4')}</li>
              <li>
                {t('sinhala_advanced_stage_p5')}
              </li>
              <li>{t('sinhala_advanced_stage_p6')}</li>
              <li>{t('sinhala_advanced_stage_p7')}</li>
              <li>{t('sinhala_advanced_stage_p8')}</li>
            </ol>
            <h5>{t('qualifications')}</h5>
            <p>
              {t('sinhala_qualifications_p1')}
            </p>
            <p>
              {t('sinhala_qualifications_p2')}
            </p>
            <h5>{t('medium_of_the_course')}</h5>
            <p>
              {t('sinhala_medium_of_the_course_p1')}
            </p>
            <h5>{t('practical_monastic_training')}</h5>
            <p>
              {t('sinhala_practical_monastic_training_p1')}
            </p>
            <p>
              {t('sinhala_practical_monastic_training_p2')}
            </p>
            <p>
              {t('sinhala_practical_monastic_training_p3')}
            </p>
            <h5>{t('how_to_submit_applications')}</h5>

            <p>{t('sinhala_how_to_submit_applications_p1')}</p>
            <ul>
              <li>
                {t('sinhala_how_to_submit_applications_li1')}
              </li>
              <li>
                {t('sinhala_how_to_submit_applications_li2')}
              </li>
            </ul>

            <p id="submit_sinhala">
              {t('sinhala_application_form')}
              <Button
                variant="link"
                href="https://drive.google.com/file/d/1Ut6Wu8EYrYo57EC_brgIX_8aFfumbVoQ/view?usp=sharing"
                target="_blank"
              >
                {t('sinhala_download_form')}
              </Button>
            </p>
            <ul>
              <li>
                {t('sinhala_option_01')}
                <p>
                  {t('sinhala_option_01_p1')}
                </p>
                <p>
                  {t('sinhala_email_address')} <i>academic.iitkaruwalagaswewa@gmail.com</i>
                </p>
              </li>
              <li>
                {t('sinhala_option_02')}
                <p>
                  {t('sinhala_option_02_p1')}
                </p>
                <p>
                  {t('sinhala_postal_address')}
                  <br />
                  <addres>
                    අන්තර්ජාතික ථේරවාද ධර්මායතනය.
                    <br />
                    හීනටිකල්ම, කරුවලගස්වැව, ශ්‍රී ලංකාව.
                  </addres>
                </p>
              </li>
              <li>
                {t('sinhala_option_03')}
                <p>
                  {t('sinhala_option_03_p1')}
                </p>
                <Button
                  variant="primary"
                  href="https://forms.gle/fqoevRSEUyLLR3pN7"
                  target="_blank"
                >
                  {t('sinhala_go_to_form')}
                </Button>
              </li>
            </ul>

            <p>
              <Button variant="link" href="mailto:academic.iitkaruwalagaswewa@gmail.com">
                {t('sinhala_inquiries_email')}
              </Button>
            </p>
            <p>
              <b>{t('sinhala_deadline_extended')}</b>
            </p>
          </Tab>

          {/* <Tab eventKey="Tamil" title="தமிழ்">
            <h5>நிஷ்ரய முக்தக பாடநெறிக்கான விண்ணப்பங்கள் கோரல்  (NmC)</h5>
            <p>
              தேரவாத சர்வதேச நிறுவனத்தினால் 2022ஆம் ஆண்டு டிசம்பர் மாதம் ஆரம்பிக்கப்படவுள்ள நிஷ்ரய முக்தக துறவற பாடநெறிக்கான விண்ணப்பங்கள் கோரப்படுகின்றன.
            </p>
            <p>
             இந்த பாடத்திட்டமானது, பிக்குகள் மற்றும் புதிய மாணவர்களுக்கு துறவறப் பயிற்சியளிப்பதற்காக தேரவாத போதனைகள் பற்றிய அறிவை வழங்கி, ஆசிரியரைச் சார்ந்திருக்காமல் சுதந்திரமாக செயற்படக்கூடிய பிக்குவான நிஷ்ரய முக்தக பிக்குவிற்கு இருக்க வேண்டிய தகுதிகளை உருவாக்குவதை நோக்கமாகக் கொண்டு வடிவமைக்கப்பட்டுள்ளது.  
            </p>
            <h5>இடம்</h5>
            <p>
             இலங்கை, கருவலகஸ்வேவவில் அமைந்துள்ள தேரவாத சர்வதேச நிறுவனத்தில் தங்கியிருந்து இந்த பாடநெறியை கற்க வேண்டும். 
            </p>
            <h5>கால அளவு</h5>
            <p>
             மூன்று படிநிலைகளைக் கொண்டு ஆறு வருடங்கள் கற்கக்கூடியவாறு இந்த பாடத்திட்டம் வடிவமைக்கப்பட்டுள்ளது.
            </p>
            <p>
              <ol>
                <li> அடிப்படை நிலை – ஒரு வருடம் </li>
                <li> இடைநிலை – மூன்று வருடங்கள்</li>
                <li> உயர்நிலை – இரண்டு வருடங்கள்</li>
              </ol>
            </p>
            <p>
             ஒவ்வொரு படிநிலையையும் வெற்றிகரமாக பூர்த்திசெய்யும் மாணவர்களுக்கு, தேரவாத சர்வதேச நிறுவனத்தால் சான்றிதழ் வழங்கப்படும். 
            </p>
            <p>
             ஒவ்வொரு வருடமும் இரண்டு கல்வித் தவணைகள் உள்ளன. ஒவ்வொரு தவணையும் ஐந்து மாதங்கள் நடைபெறும் மற்றும் ஒவ்வொரு தவணை முடிவிலும் ஒரு மாத விடுமுறை வழங்கப்படும்.
            </p>
            <ol>
              <li>
                டிசம்பர் 01 முதல் ஏப்ரல் 30 வரை முதலாம் தவணை (விடுமுறை - மே 1 முதல் மே 31 வரை)
              </li>
              <li>
                ஜூன் 01 முதல் ஒக்டோபர் 31 வரை இரண்டாம் தவணை (விடுமுறை - நவம்பர் 1 முதல் நவம்பர் 30 வரை)
              </li>
            </ol>
            <h5>கற்பிக்கப்படும் பாடநெறிகள்</h5>
            <ol>
              <li>தேரவாத கோட்பாடுகள்</li>
              <li>வினய</li>
              <li>சூத்ர </li>
              <li>அபிதர்ம</li>
              <li>பாலி</li>
              <li>ஷமத</li>
              <li>விதர்ஷனா</li>
              <li>பௌத்த மத வரலாறு</li>
              <li>நவகர்ம (துறவறத்தில் காணப்படும் திறன்கள்)</li>
              <li>மேலதிக பாடநெறிகள்</li>
            </ol>
            <h5>அடிப்படை நிலை</h5>
            <ol>
              <li>தேரவாத கோட்பாடுகள் - அடிப்படை</li>
              <li>வினய – பிக்கு ப்ராதிமோக்ஷய</li>
              <li>சூத்ர – பொது அறிவு</li>
              <li>
               பாலி – திரிபிடகவைப் பற்றி கற்பதற்கு அவசியமான தத்துவார்த்த அறிவு, வர்ணனைகள் மற்றும் துணை வர்ணனைகள்
              </li>
            </ol>

            <h5>இடைநிலை</h5>
            <ol>
              <li>தேரவாத கோட்பாடுகள் – பகுதி 1 </li>
              <li>வினய – உபதோ விபங்க மற்றும் கந்தக பகுதி 1 </li>
              <li>சூத்ர – தெரிவுசெய்யப்பட்ட சூத்திரங்கள்</li>
              <li>
                பாலி - பல்வேறு இலக்கண மரபுகளை அடிப்படையாகக் கொண்ட விரிவான பாலி இலக்கணம்.
              </li>
              <li>ஷமத- 40 தியான பாடநெறிகள் </li>
              <li>விதர்ஷன – பகுதி 1 </li>
              <li>நவகர்ம – பகுதி 1</li>
              <li>மேலதிக பாடநெறிகள் – அடிப்படை சிங்களம் (கட்டாயமல்ல)</li>
            </ol>
            <h5>உயர்நிலை</h5>
            <ol>
              <li>தேரவாத கோட்பாடுகள் – பகுதி 2 </li>
              <li>
             பாலி, அடிப்படை சமஸ்கிருதம் மற்றும் மொழியியல் - வசனங்களின் தொகுப்பு, வர்ணனைகளை வாசிப்பதற்கான பண்டைய நுட்பங்கள் மற்றும் அவற்றின் பயன்பாடு, பாலி மொழியை எழுதுதல் மற்றும் பேசும் திறன் ஆகியன.
              </li>
              <li>
               வினய – கந்தக பகுதி 2, பரிவார, வினயகர்ம பற்றிய பயிற்சி
              </li>
              <li>சூத்ர - தெரிவுசெய்யப்பட்ட சூத்திரங்கள்</li>
              <li>
                அபிதர்ம – தம்மசங்கனி மாத்ருகா, யமக மற்றும் பண்டைய பர்மிய நுட்பங்களை அடிப்படையாகக் கொண்ட பத்தான
              </li>
              <li>விதர்ஷன – பகுதி 2</li>
              <li>
             பௌத்த மத வரலாறு (அபிதர்மவின் கதாவஸ்து உள்ளடங்கலாக)
              </li>
              <li>நவகர்ம – பகுதி 2</li>
            </ol>
            <h5>பாடநெறிக்கான அடிப்படைத் தகுதிகள்</h5>
            <ul>
              <li>
                விண்ணப்பதாரி தேரவாத பாரம்பரியத்தைச் சேர்ந்த பிக்கு அல்லது புதிய மாணவராக இருத்தல் வேண்டும்.
              </li>
              <li>புதியவராயின் குறைந்தபட்சம் 16 வயதினை பூர்த்திசெய்திருக்க வேண்டும். </li>
              <li>உச்ச வயது வரம்பு இல்லை. </li>
              <li>முன்னரான கல்வித் தகைமைகள் அவசியமில்லை </li>
            </ul>
            <h5>பாடநெறி கற்பிக்கப்படும் மொழி </h5>
            <ul>
              <li>
               பாடநெறியானது, ஆங்கிலம் மற்றும் சிங்கள மொழி மூலம் கற்பிக்கப்படும். ஆங்கில மொழிமூலம் கற்பதற்கு விண்ணப்பித்தவர்கள்,  குறைந்தபட்சம் ஆங்கிலத்தில் அடிப்படைத் திறனைப் பெற்றிருக்க வேண்டும். பாடநெறி ஆரம்பிக்கப்பட்ட முதலாவது மாதத்திற்குள் மாணவர்கள் தமக்கு விருப்பமான மொழியைத் தெரிவுசெய்யலாம். 
              </li>
            </ul>
            <h5>செயற்பாட்டு ரீதியான துறவறப் பயிற்சி</h5>
            <ul>
              <li>
               காவியுடைக்கு வர்ணம் தீட்டுதல், காவியுடை தயாரித்தல், கிண்ணங்களுக்கு வர்ணம் தீட்டுதல், கிண்ணத்தை உருவாக்குதல் போன்ற கைவினைத் திறன்களை மேம்படுத்தும் வாய்ப்பையும் மாணவர்கள் பெறுவார்கள்.
              </li>
              <li>
              நாளாந்த ஓதல், துறவறக் கடமைகள், அன்னதான நிகழ்வுகளில் கலந்துகொள்ளவும், தம்மத்தை (தம்மதேசனா) பிரசங்கம் செய்வதில் திறன்களை வளர்த்துக் கொள்ளல், தம்ம விவாதங்களை (தம்மசாக்கச்சா) நடத்துவது பற்றியும் கற்றுக்கொள்வார்கள்.
              </li>
              <li>
              இவற்றிற்கு மேலதிகமாக, அரகந்தூக்கு இட்டுச்செல்லும் தியான வழி மற்றும் வினயகர்மாக்களை முறையாக பயிற்சி செய்யும் தேரவாத தியான முறைகளில் மாணவர்களுக்கு தத்துவார்த்த மற்றும் நடைமுறை அறிவு வழங்கப்படும்
              </li>
            </ul>
            <h5>விண்ணப்பங்களை சமர்ப்பிக்கும் முறை</h5>
            <p>
              - கீழ்காணும் ஆவணங்களை சமர்ப்பிக்க வேண்டும்.
              <ul>
                <li>
                  <b>அனைத்து விண்ணப்பதாரர்களுக்கும்: </b>உங்கள் அசல் நியமனச் சான்றிதழின் நகல் பிரதி
                </li>
                <li>
                  <b>
                    ஐந்து வருடங்களுக்கு குறைவான அனுபவத்தைக் கொண்ட பிக்குகள் மற்றும் புதிய மாணவர்களுக்கு :
                  </b>IIT க்கான உங்கள் விண்ணப்பத்தை ஆதரிக்கும் தர்மாச்சாரியார் அல்லது ஆசிரியரிடமிருந்து ஒரு கடிதம்.
                </li>
                <li>
                  <b>இலங்கை விண்ணப்பதாரர்களுக்கு : </b>உங்கள் அடையாள அட்டையின் அச்சிடப்பட்ட பிரதி
                </li>
                <li>
                  <b>இலங்கையர் அல்லாத விண்ணப்பதாரர்களுக்கு : </b>உங்கள் புகைப்படத்தின நகல் பிரதி உள்ளடங்கலாக, உங்கள் கடவுச்சீட்டின் அச்சிடப்பட்ட பிரதி
                </li>
              </ul>
              <p>
                - விண்ணப்பப் படிவம் :
                <Button
                  variant="link"
                  href="https://drive.google.com/uc?export=download&id=1CNbZrSJY_8IJMxNdM3pm4_7PHoHIzA62"
                  target="_blank"
                >
                 பதிவிறக்க படிவம்
                </Button>
              </p>
            </p>
            <ul>
              <li>
                தெரிவு 01
                <p>
                  - மேலே உள்ள விண்ணப்பப்படிவத்தை தரவிறக்கம் செய்து, பூர்த்திசெய்து, மேலே குறிப்பிடப்பட்ட ஆவணங்களை இணைத்து, விண்ணப்பத்தை ஸ்கேன் செய்து எமக்கு மின்னஞ்சலில் அனுப்பவும்.
                </p>
                <p>
                  மின்னஞ்சல் முகவரி : <i>academic.iitkaruwalagaswewa@gmail.com</i>
                </p>
              </li>
              <li>
               தெரிவு 02
                <p>
                  - மேலே உள்ள விண்ணப்பப்படிவத்தை தரவிறக்கம் செய்து, பூர்த்திசெய்து, மேலே குறிப்பிடப்பட்ட ஆவணங்களை இணைத்து, தபாலில் அனுப்பிவைக்கவும்.
                </p>
                <p>
                  - தபால் முகவரி :
                  <br />
                  <addres>
                   தேரவாத சர்வதேச நிறுவனம், 
                    <br />
                   ஹீனெடிகல்ம, கருவலகஸ்வேவ, இலங்கை
                  </addres>
                </p>
              </li>
              <li>
               தெரிவு 03
                <p>
                கீழ்காணும் இணைப்பில் உள்ள கூகிள் படிவத்தை நிரப்பவும்   <b>(இதற்கு ஜீமெயில் கணக்கு அவசியம்)</b>
                </p>
                <Button
                  variant="primary"
                  href="https://forms.gle/TrK87pYRfcyZ3R3J8"
                  target="_blank"
                >
                படிவத்திற்குச் செல்லவும்
                </Button>
              </li>
            </ul>

            <p>
              <Button variant="link" href="mailto:academic.iitkaruwalagaswewa@gmail.com">
              விசாரணைகள் - மின்னஞ்சல்
              </Button>
            </p>
            <p>
              <b>
                - விண்ணப்பத்தைச் சமர்ப்பிப்பதற்கான இறுதித் திகதி 2022ஆம் ஆண்டு செப்டெம்பர் 30ஆம் திகதி ஆகும். 
                <br />- பாடநெறியின் முதல் ஆறு வருடங்களில் புதிதாக மாணவர்கள் சேர்த்துக்கொள்ளப்பட மாட்டார்கள். 
              </b>
            </p>
          </Tab> */}

        </Tabs>
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
