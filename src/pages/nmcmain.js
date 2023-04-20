import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import {Tab, Container, Tabs, Button} from 'react-bootstrap';

export default function NMCMain() {
  const { t, lang } = useTranslation();
  const router = useRouter();

  return (
    <div className="skeleton">
      <Head>
        <title>NMC: Get Registered - ලියාපදිංචි වන්න</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="international institute of theravada"
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
            <h5>Calling Applications for the Nissayamuttaka Course (NmC)</h5>
            <p>
            The first semester of the Nissayamuttaka monastic training program 
            conducted by the International Institute of Theravada is going to be 
            successfully completed in a few days.
            </p>
            <p>
              At the beginning of the second semester, we have decided to provide 
              the opportunity for a few more students to join the program at the request of many.
            </p>
            <p>
            Monks who have a strong desire to engage in this program can fill the form below 
            and <a href="#submit"><strong>submit</strong></a> the application before <strong>30th of April.</strong>
            </p>
            <p>
            The recruitment is done after an entrance exam on basic Pali and 
            Dhamma-Vinaya knowledge. We provide the books to be studied for the exam.
            </p>
          {/*<p>
              The International Institute of Theravada is calling applications
              for the Nissayamuttaka monastic education program which will be
              commencing from December 2022.
            </p> */}
            <h5>Course Details</h5>
            <p>
              This program is designed to impart knowledge on Theravada
              teachings in bhikkhus and sāmaṇeras and to train them in monastic
              training with the objective of enriching them with the qualities
              expected to be gained by a nissayamuttaka monk, a monk who can
              abide independently without depending on a teacher.
            </p>
            <h5>Venue</h5>
            <p>
              One has to undertake this course residing at the International
              Institute of Theravada located at Karuwalagaswewa, Sri Lanka.
            </p>
            <h5>Duration</h5>
            <p>
              This course is designed into three stages that will run for six
              years.
            </p>
            <p>
              <ol>
                <li> Basic Stage - one year </li>
                <li> Intermediate Stage - three years</li>
                <li> Advanced Stage - two years</li>
              </ol>
            </p>
            <p>
              A certificate issued by the International Institute of Theravada
              shall be given to students who successfully accomplish each stage.
            </p>
            <p>
              Each year has two academic semesters. Each semester will run for
              five months and at the end of each semester comes a
              one-month-holiday.
            </p>
            <ol>
              <li>
                First semester from 01st December to 30th April (holiday - from
                1st May to 31st May)
              </li>
              <li>
                Second semester from 01st June to 31st October (holiday - from
                1st November to 30th November)
              </li>
            </ol>
            <h5>Subjects Taught</h5>
            <ol>
              <li>Theravada Fundamentals</li>
              <li>Vinaya</li>
              <li>Sutta</li>
              <li>Abhidhamma</li>
              <li>Pāli</li>
              <li>Samatha</li>
              <li>Vipassanā</li>
              <li>History of Buddhism</li>
              <li>Navakamma (Skills in monastic crafts)</li>
              <li>Additional subjects</li>
            </ol>
            <h5>Basic Stage</h5>
            <ol>
              <li>Theravada Fundamentals - Basic</li>
              <li>Vinaya - Bhikkhu Pātimokkha</li>
              <li>Sutta - General knowledge</li>
              <li>
                Pāli- Theoretical knowledge necessary to read the Tipiṭaka,
                commentaries and sub-commentaries{' '}
              </li>
            </ol>

            <h5>Intermediate Stage</h5>
            <ol>
              <li>Theravada Fundamentals - Part 1 </li>
              <li>Vinaya - Ubhato Vibhaṅga and Khandhaka part 1 </li>
              <li>Sutta - Selected discourses </li>
              <li>
                Pāli - Comprehensive Pāli grammar based on various grammar
                traditions
              </li>
              <li>Samatha - 40 meditation subjects </li>
              <li>Vipassanā - Part 1 </li>
              <li>Navakamma - Part 1 </li>
              <li>Additional Subjects - Basic Sinhala (Not compulsory) </li>
            </ol>
            <h5>Advanced Stage</h5>
            <ol>
              <li>Theravada Fundamentals - Part 2 </li>
              <li>
                Pāli, basic Sanskrit and Philology - Including composition of
                verses, ancient techniques of reading commentaries and their
                application, Pāli language writing and speaking skills{' '}
              </li>
              <li>
                Vinaya - Khandhaka part 2, Parivāra, training in Vinayakammas{' '}
              </li>
              <li>Sutta - Selected discourses </li>
              <li>
                Abhidhamma - Dhammasaṅgaṇī Mātikā, Dhātukathā, Yamaka, and
                Paṭṭhāna based on ancient Burmese techniques{' '}
              </li>
              <li>Vipassanā - Part 2</li>
              <li>
                History of Buddhism (Including Kathāvatthu of Abhidhamma){' '}
              </li>
              <li>Navakamma - Part 2 </li>
            </ol>
            <h5>Qualifications to be Eligible to the Course</h5>
            <ul>
              <li>
                The candidate should be a monk or novice ordained under the
                tradition of Theravada.
              </li>
              <li>A novice should be at least 16 years old. </li>
              <li>There is no upper age limit. </li>
              <li>No prior educational qualification is required. </li>
            </ul>
            <h5>Medium of the Course </h5>
            <ul>
              <li>
                Course will be conducted by both English and Sinhala mediums.
                Ones who select to continue studies in English medium has to
                have at least basic skills in English. Students can choose their
                preferred medium within the first month of the course.
              </li>
            </ul>
            <h5>Practical Monastic Training</h5>
            <ul>
              <li>
                Students will also gain the opportunity to improve skills in
                crafts such as robe colouring, robe making, colouring bowls,
                making bowl stands and so on.
              </li>
              <li>
                Students will also gain the opportunity to participate in daily
                chanting, monastic duties, going for alms rounds and to develop
                skills in preaching Dhamma (Dhammadesanā) and how to lead Dhamma
                discussions (Dhammasākacchā).
              </li>
              <li>
                In addition, students will be imparted with theoretical and
                practical knowledge in Theravada meditation methods till
                Arahanthood and performance of vinayakammas (formal acts of
                discipline).
              </li>
            </ul>
            <h5>How to Submit the Applications</h5>
            <p>
              - Following documents are required to be submitted.
              <ul>
                <li>
                  <b>For all applicants:</b> A copy of your original ordination
                  certificate.
                </li>
                <li>
                  <b>
                    For all applicants ordained less than five years and
                    Sāmaneras:
                  </b>{' '}
                  A written letter from your Preceptor or teacher supporting
                  your application for IIT.
                </li>
                <li>
                  <b>For Sri Lankan citizens:</b>A scanned copy of your identity
                  card.
                </li>
                <li>
                  <b>For non-Sri Lankans:</b> A scanned copy of your passport
                  including copy of your photo.
                </li>
              </ul>
              <p id="submit">
                - Application Form:
                <Button
                  variant="link"
                  href="https://drive.google.com/uc?export=download&id=1OdY7Q64MDvG3PXCbpg77XUNi8a4lIsX8"
                  target="_blank"
                >
                  Download Form
                </Button>
              </p>
            </p>
            <ul>
              <li>
                Option 01
                <p>
                  - Download the above application form, fill it thoroughly and
                  email us a scanned copy of your application together with the
                  mandatory documents mentioned above.
                </p>
                <p>
                  Email Address: <i>academic.iitkaruwalagaswewa@gmail.com</i>
                </p>
              </li>
              <li>
                Option 02
                <p>
                  - Download the above application form, fill it thoroughly and
                  send it together with the mandatory documents mentioned above
                  via post.
                </p>
                <p>
                  - Postal Address:
                  <br />
                  <addres>
                    International Institute of Theravada.
                    <br />
                    Heenetikalma, Karuwalagaswewa, Sri Lanka.
                  </addres>
                </p>
              </li>
              <li>
                Option 03
                <p>
                  Fill in the Google form found in the below link.{' '}
                  <b>(Must have a Gmail account)</b>
                </p>
                <Button
                  variant="primary"
                  href="https://forms.gle/TrK87pYRfcyZ3R3J8"
                  target="_blank"
                >
                  Go to Form
                </Button>
              </li>
            </ul>

            <p>
              <Button variant="link" href="mailto:academic.iitkaruwalagaswewa@gmail.com">
                Inquiries - Email
              </Button>
            </p>
            <p>
              <b>
                - Deadline for application submission is 30th of April 2023.
                <br />- During the first six years of the course new
                recruitments will not be done.
              </b>
            </p>
          </Tab>
          <Tab eventKey="Sinhala" title="සිංහල">
            <h5>නිශ්‍රය මුක්තක පාඨමාලාව (NmC) සඳහා අයදුම්පත් කැඳවීම</h5>
            <p>
            අන්තර්ජාතික ථෙරවාද ධර්මායතනය විසින් පවත්වනු ලබන නිස්සයමුත්තක 
            භික්ෂු පුහුණු වැඩසටහනේ පළමු සය මස තව දින කිහිපයකින් සාර්ථකව අවසන් වීමට නියමිත ය. 
            </p>
            <p>
            බොහෝ දෙනා කළ ඉල්ලීම මත දෙවැනි සය මස ආරම්භයේ දී තවත් සිසුන් 
            කිහිප නමකට ධර්මායතනයට සම්බන්ධ වීම සඳහා අවස්ථාව සලසා දීමට තීරණය කළෙමු. 
            </p>
            <p>
            පර්යාප්ති ප්‍රතිපත්ති ශාසනික කටයුතුවල යෙදීමට දැඩි ඕනෑකමක් ඇති භික්ෂු 
            සාමණේරයන් වහන්සේලා වෙබ් අඩවියේ ඇති <a href="#submit_sinhala"><strong>පෝරමය</strong></a> පුරවා  
            <strong> අප්‍රේල් මස 30</strong> වන දිනට පෙර යොමු කරන්න. 
            </p>
            {/* <p>
              අන්තර්ජාතික ථේරවාද ධර්මායතනය විසින් 2022 දෙසැම්බර් මාසයේ ආරම්භ
              කරනු ලැබෙන නිශ්‍රය මුක්තක භික්ෂු අධ්‍යාපන වැඩසටහන සඳහා අයදුම්පත්
              කැඳවනු ලැබේ.
            </p> */}
            <h5>පාඨමාලාව</h5>
            <p>
              මෙය භික්ෂු සාමණේරයන් වහන්සේලා ධර්ම විනය දැනුමෙන් සහ ආරාමීය
              පුහුණුවෙන් පෝෂණය කොට “නිශ්‍රය මුක්තක” භික්ෂුවක් සතුව තිබිය යුතු
              සුදුසුකම් ඇති කර දීම ඉලක්ක කොට ගත් වැඩසටහනකි.
            </p>
            <h5>පාඨමාලාව පැවැත්වෙන ස්ථානය</h5>
            <p>
              කරුවලගස්වැව ප්‍රදේශයෙහි පිහිටා ඇති අන්තර්ජාතික ථේරවාද ධර්මායතනය
              තුළ නේවාසිකව වැඩ වසමින් පාඨාමාලාවට සහභාගි විය යුතු වේ.
            </p>
            <h5>ගත වන කාලය</h5>
            <p>
              සම්පූර්ණ වැඩසටහන සඳහා ගත වන කාලය සය අවුුරුද්දකි. මෙය අදියර තුනකින්
              සිදු කෙරේ.
            </p>
            <ol>
              <li>ප්‍රාථමික අදියර - එක් වර්ෂයකි.</li>
              <li>මධ්‍යම අදියර - වර්ෂ තුනකි.</li>
              <li>අවසාන අදියර - වර්ෂ දෙකකි.</li>
            </ol>
            <p>
              සෑම අදියරක් අවසානයේ ම පාඨමාලාවෙන් තාවකාලිකව හෝ සම්පූර්ණයෙන් හෝ
              ඉවත් වීමට අවකාශ ඇත. සම්පූර්ණ කරන ලද සෑම අදියරක් සඳහා ම අන්තර්ජාතික
              ථේරවාද ධර්මායතනය විසින් නිකුත් කරනු ලබන සහතිකපතක් ප්‍රදානය කරනු
              ලැබේ.
            </p>
            <ul>
              <li>
                සෑම වසරකම අධ්‍යයන වාර දෙකක් පවතින අතර එක් අධ්‍යයන වාරයක් මාස
                පහකට සීමා වේ.
              </li>
              <li>
                පළමු වාරය දෙසැම්බර් 1 වැනිදා සිට අප්‍රේල් 30 වැනිදා දක්වා
                පැවැත්වෙන අතර දෙවන වාරය ජුනි 1 වැනිදා සිට ඔක්තෝබර් 31 වැනිදා
                දක්වා පැවැත්වේ.
              </li>
              <li>
                සෑම වසරකම මැයි මස සහ නොවැම්බර් මස නිවාඩු මාස වේ. ඉතිරි මාස දහය
                අධ්‍යයන කාලය යි.
              </li>
            </ul>
            <h5>අධ්‍යයන කරනු ලැබෙන විෂයයන්</h5>
            <ol>
              <li>ථේරවාද සිද්ධාන්ත</li>
              <li>විනය</li>
              <li>සූත්‍ර</li>
              <li>අභිධර්ම</li>
              <li>පාලි</li>
              <li>ශමථ</li>
              <li>විදර්ශනා</li>
              <li>ශාසන ඉතිහාසය</li>
              <li>නවකර්ම</li>
              <li>අතිරේක විෂයයන්</li>
            </ol>
            <h5>විෂය නිර්දේශය</h5>
            <p>ප්‍රාථමික අදියර</p>
            <ol>
              <li>
                ථේරවාද සිද්ධාන්ත - මූලික කොටස (අභිධර්මාර්ථ සංග්‍රහය ඇසුරින්)
              </li>
              <li>විනය - භික්ෂු ප්‍රාතිමෝක්ෂය</li>
              <li>සූත්‍ර - ප්‍රකීර්ණක ධර්ම කරුණු</li>
              <li>
                පාලි - ත්‍රිපිටකය, අර්ථ කථා සහ ටීකා කියැවීමට අවශ්‍ය වන
                න්‍යායාත්මක පාලි දැනුම
              </li>
            </ol>

            <p>මධ්‍යම අදියර</p>
            <ol>
              <li>
                ථේරවාද සිද්ධාන්ත - මධ්‍යම කොටස (සප්‍රත්‍යය නාම රූප පරිග්‍රහය
                දක්වා අදාළ වන දැනුම)
              </li>
              <li>
                විනය - පෙළ අටුවා ටීකා ඇසුරෙන් උභය භික්ෂු විභංගය සහ ඛන්ධක පළමු
                කොටස
              </li>
              <li>සූත්‍ර - තෝරාගත් සූත්‍ර</li>
              <li>
                පාලි - කච්චායන මොග්ගල්ලාන සද්දනීති ආදි ග්‍රන්ථ ඇසුරින්
                සවිස්තරාත්මක පාලි ව්‍යාකරණය
              </li>
              <li>ශමථ - සම සතළිස් කර්මස්ථාන</li>
              <li>විදර්ශනා - පළමු කොටස (සප්‍රත්‍යය නාම රූප පරිග්‍රහය)</li>
              <li>නවකර්ම - පළමු කොටස</li>
              <li>අතිරේක විෂයයන් - මූලික ඉංග්‍රීසි දැනුම (අනිවාර්ය නො වේ.)</li>
            </ol>
            <p>අවසාන අදියර</p>
            <ol>
              <li>ථේරවාද සිද්ධාන්ත - අවසාන කොටස</li>
              <li>
                විනය - ඛන්ධක දෙවන කොටස, පරිවාර පාළිය සහ විනය කර්ම කිරීමේ පුහුණුව
              </li>
              <li>සූත්‍ර - තෝරාගත් සූත්‍ර</li>
              <li>
                අභිධර්මය - පෞරාණික බුරුම නය ක්‍රම ඇසුරින් ධම්මසඞ්ගණී මාතෘකා,
                ධාතුකථා, යමක, පට්ඨාන ප්‍රකරණ
              </li>
              <li>
                පාලි, මූලික සංස්කෘත සහ වාග් විද්‍යාව - ගාථා බන්ධනය සහිත අර්ථ කථා
                අධ්‍යයනය නය ක්‍රම 30, ඒවායේ ප්‍රායෝගික යෙදීම සහ පාලි භාෂා ලේඛන
                සහ කථන පුහුණුව
              </li>
              <li>විදර්ශනා - දෙවන කොටස</li>
              <li>ශාසන ඉතිහාසය - කථාවස්තු ප්‍රකරණය ද ඇතුළත්ව</li>
              <li>නවකර්ම - දෙවන කොටස</li>
            </ol>
            <h5>මූලික සුදුසුකම්</h5>
            <p>
              පාඨමාලාවට ඇතුළත් වීමට මූලික සුදුසුකම වශයෙන් සලකනු ලබන්නේ ථේරවාද
              සම්ප්‍රදායට අයත් භික්ෂුවක් හෝ සාමණේරයෙක් වීම යි.
            </p>
            <p>
              සාමණේරයන් වහන්සේ නමක් නම් අවම වයස අවුරුදු 16 ට වැඩි විය යුතු යි.
              ඉහළ වයස් සීමාවක් නොමැත. වෙනත් පූර්ව අධ්‍යාපන සුදුසුකම් අපේක්ෂා නො
              කරනු ලැබේ.
            </p>
            <h5>පාඨමාලාව පැවැත්වෙන මාධ්‍ය</h5>
            <p>
              සිංහල ඉංග්‍රීසි යන භාෂා ද්වයයෙන් ම පාඨමාලාව පැවැත්වේ. පාඨමාලාව
              ආරම්භ කිරීමෙන් මාසයක කාලයක් තුළ කැමැති මාධ්‍යය තෝරා ගත යුතු ය.
              ඉංග්‍රීසි මාධ්‍යය තෝරා ගන්නේ නම් මූලික ඉංග්‍රීසි දැනුම තිබීම
              අත්‍යවශ්‍ය වේ.
            </p>
            <h5>ප්‍රායෝගික භික්ෂු පුහුණුව</h5>
            <p>
              සිවුරු කැපීම, මැසීම, සහ පඬු පෙවීම, පාත්‍ර කළු කිරීම, පාත්‍ර දරණු
              සැකසීම ආදි වූ භික්ෂුවක් විසින් දැන සිටිය යුතු ක්‍රියාකාරකම් පිළිබඳ
              ප්‍රායෝගික පුහුණුව,
            </p>
            <p>
              බුද්ධ වන්දනාව, වත් පිළිවෙත්, පිණ්ඩපාත පුහුණුව, භාවනා පුහුණුව, ධර්ම
              දේශනා පුහුණුව, ධර්ම සාකච්ඡා පුහුණුව ආදි වූ ආරාමික පුහුණුව සහ
            </p>
            <p>
              නිශ්‍රය මුක්තක භික්ෂුවක් විසින් දත යුතු වූ අර්හත්වය දක්වා වන භාවනා
              මාර්ගය සහ නිවැරදිව විනය කර්ම කිරීමේ හැකියාව ද ශිෂ්‍ය භික්ෂු
              සාමණේරයන් වහන්සේලාට සපයා දෙනු ලැබේ.
            </p>
            <h5>අයදුම්පත් යොමු කළ යුතු ආකාරය</h5>

            <p>- පහත සඳහන් ලියකියවිලි ඔබගේ අයදුම්පත සමඟ ම අප වෙත යොමු කරන්න.</p>
            <ul>
              <li>
                <b>සියලු ම අයදුම්කරුවන්:</b> උපසම්පදා සහතිකය (සාමණේරයන් සඳහා
                පැවිදි සහතිකය), ජාතික හැඳුනුම්පතේ පිටපතක්.
              </li>
              <li>
                <b>වස් පහක් නො පිරුණු භික්ෂූන් සහ සාමණේරයන්:</b> අන්තර්ජාතික
                ථේරවාද ධර්මායතනයට ඔබගේ අනුයුක්ත වීමට කැමැත්ත දක්වමින් ඔබගේ
                ආචාර්යයන් වහන්සේ හෝ උපාධ්‍යායයන් වහන්සේ විසින් ලියා අත්සන් තබා
                දෙන ලද ලිපියක්.
              </li>
            </ul>

            <p id="submit_sinhala">
              - අයදුම්පත:
              <Button
                variant="link"
                href="https://drive.google.com/uc?export=download&id=1ZWiCNAVnMKea4gEn4oD3kjYKHyhBdvWC"
                target="_blank"
              >
                අයදුම්පත බා ගත කර ගන්න
              </Button>
            </p>
            <ul>
              <li>
                01 ක්‍රමය
                <p>
                  - ඉහත දැක්වෙන අපගේ වෙබ් අඩවියෙහි පළ කර ඇති අයදුම්පත බා ගත කර
                  ගන්න. ඔබ විසින් සම්පූර්ණ කරන ලද අයදුම්පතේ ස්කෑන් පිටපතක් පහත
                  දැක්වෙන අපගේ ඊ මේල් ලිපිනයට, ඉහත සදහන් ලියකියවිලි සමග ඊ මේල්
                  කරන්න.
                </p>
                <p>
                  ඊ මේල්: <i>academic.iitkaruwalagaswewa@gmail.com</i>
                </p>
              </li>
              <li>
                02 ක්‍රමය
                <p>
                  - ඉහත දැක්වෙන අපගේ වෙබ් අඩවියෙහි පළ කර ඇති අයදුම්පත බා ගත කර
                  ගන්න. ඔබ විසින් සම්පූර්ණ කරන ලද අයදුම්පතේ පිටපතක්, ඉහත සදහන්
                  ලියකියවිලි සමග, පහත දැක්වෙන අපගේ ලිපිනයට යොමු කරන්න.
                </p>
                <p>
                  - ලිපිනය:
                  <br />
                  <addres>
                    අන්තර්ජාතික ථේරවාද ධර්මායතනය.
                    <br />
                    හීනටිකල්ම, කරුවලගස්වැව, ශ්‍රී ලංකාව.
                  </addres>
                </p>
              </li>
              <li>
                03 ක්‍රමය
                <p>
                  - පහත සබැදිය(link) අනුගමනය කොට අදාළ ගූගල් පෝරමය සම්පුර්ණ
                  කරන්න. <b>(Gmail ගිණුමක් තිබීම අනිවාර්‍යය වේ)</b>
                </p>
                <Button
                  variant="primary"
                  href="https://forms.gle/r7YdAjP8TY7NuKMt5"
                  target="_blank"
                >
                  අයදුම්පත වෙත
                </Button>
              </li>
            </ul>

            <p>
              <Button variant="link" href="mailto:academic.iitkaruwalagaswewa@gmail.com">
                විමසීම් - ඊ මේල්
              </Button>
            </p>
            <p>
              <b>- අයදුම්පත් භාර ගන්නා අවසාන දිනය - 2023 අප්‍රේල් මස 30.</b>
              <br />
              <b>
                - පලමු වසර 6 සදහා පාඨමාලාව අතරතුර අලුතින් බදවාගැනීම් සිදු නොකෙරේ.
              </b>
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
