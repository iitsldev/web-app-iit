const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const bcrypt = require('bcrypt');

async function main() {
    const missionData = [
        {
            image: 'DhammaChakra.svg',
            text: 'Creating and propagating a Buddhist monastic community which clearly understands the path to ultimate liberation or Nibbāna, and whose primary goal is to encourage striving towards it.',
        },
        {
            image: 'DhammaChakra.svg',
            text: 'Establishing a community of monastics who would share the Theravāda teachings, and guide monks, nuns and lay persons in practicing the dhamma-vinaya according to the original teachings of the Buddha as published in the Pāli Canon and Commentaries.',
        },
        {
            image: 'DhammaChakra.svg',
            text: 'Building the capacity of monks in executing formal disciplinary acts (Vinaya kamma) in order to prolong the sanctity of monks’ lineage.',
        },
    ];

    const cardData = [
        {
            title: 'Courses Conducted',
            image: 'coursesAndTrainningIcon.svg',
            description: 'IIT provides three courses – Nissayamuttaka Course (NmC), Parisupaṭṭhāka Course (PuC) and Bhussuta Course (BstC).',
            link: '/education',
            color: '#FFD426',
            titleColor: '#132072',
            arrowColor: ''
        },
        {
            title: 'Dhamma Lectures and Sermons',
            image: 'ourServicesIcon.svg',
            description: 'In addition to occasional Dhamma discourses, IIT currently holds few valuable online Dhamma courses related to Theravada in both Sinhala and English medium.',
            link: 'https://www.youtube.com/watch?v=pQY_xMowfRA&list=PLdluojKrWhDe6PRlcaHvxqvqKA5kwo1Dz',
            color: '#025BC1',
            titleColor: '#FFFFFF',
            arrowColor: ''
        },
        {
            title: 'Meditation Instructions (Sinhala Medium)',
            image: 'meditationProgIcon.svg',
            description: 'Meditation becomes successful with proper guidance.',
            link: '/meditation',
            color: '#FFEDA5',
            titleColor: '#132072',
            arrowColor: ''
        },
        {
            title: 'Calling Applications for the Nissayamuttaka Course (NmC)',
            image: 'getRegisteredIcon.svg',
            description: 'Monks who are willing to register for this course, can use the given link (Deadline is 20th of August 2023.)',
            link: '/nmcmain',
            color: '#1E1EA2',
            titleColor: '#FFFFFF',
            arrowColor: ''
        }
    ];

    const aboutUsList = [
        { title: 'What is IIT?', htmlId: 'what-is-iit', category: 'aboutUs' },
        { title: 'Establishment', htmlId: 'establishment', category: 'aboutUs' },
        { title: 'Vision & Mission', htmlId: 'our-vision-and-mission', category: 'aboutUs' },
        { title: 'Our Focus', htmlId: 'our-focus', category: 'aboutUs' },
    ];

    const instituteList = [
        { title: 'Academy', htmlId: 'academy', category: 'institute' },
        { title: 'Faculty Members', htmlId: 'academic-staff', category: 'institute' },
        { title: 'Monastery', htmlId: 'monastery', category: 'institute' },
        { title: 'Administration', htmlId: 'administration', category: 'institute' },
    ];

    const eduList = [
        { title: 'Subjects', htmlId: 'subjects', category: 'edu' },
        { title: 'Courses', htmlId: 'courses', category: 'edu' },
    ];

    const dhammaLectureData = [
        {
            title: 'Fundamentals of Theravada Buddhism/',
            body: 'Ven Watagoda Maggavihari Thera',
            image: '/lecture/2.jpg',
            link: 'https://www.youtube.com/watch?v=WeF9BYgeqF8&list=PLDkufrwzs8aUDYUHQQGODzJtMzVhdm6MZ'
        },
        {
            title: 'සූවිසි ප්‍රත්‍යය අභිධර්ම සම්භාෂණය',
            body: 'පූජ්‍ය දෙනියායේ උපසම ස්වාමීන්වහන්සේ',
            image: '/lecture/3.jpg',
            link: 'https://www.youtube.com/watch?v=LvMGieIA4Ys&list=PLDkufrwzs8aVdSzzBdFDHeBy0Tx6nst_j'
        },
        {
            title: 'සූත්‍ර සම්භාෂණය',
            body: 'පූජ්‍ය උඩදිගන සිද්ධත්ථ ස්වාමීන්වහන්සේ',
            image: '/lecture/4.jpg',
            link: 'https://www.youtube.com/watch?v=CknJSJcYHMY&list=PLDkufrwzs8aVe0y6qca85fAap1kzTsZZA'
        },
        {
            title: 'ආර්ය උතුමෝ',
            body: 'පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ',
            image: '/lecture/5.jpg',
            link: 'https://www.youtube.com/watch?v=sbOSDQJVdNY&list=PLDkufrwzs8aUYyM16uaYzq4leyX6toIXE'
        },
        {
            title: 'ජාතක කතා',
            body: 'පූජ්‍යපාද පස්සර පදුමසිරි ස්වාමීන්වහනසේ',
            image: '/lecture/6.jpg',
            link: 'https://www.youtube.com/watch?v=lA2VV-D73H0&list=PLDkufrwzs8aWMVLDNJ7O4OQeUAla9eaTU'
        },
        {
            title: 'විමාන වස්තු',
            body: 'පූජ්‍ය වලල්ලාවිට වජිරඤාණ ස්වාමීන්වහන්සේ',
            image: '/lecture/7.jpg',
            link: 'https://www.youtube.com/watch?v=_CTEOO2eByg&list=PLDkufrwzs8aXyJMqC1YThc7txU1D2Qg32'
        },
        {
            title: 'ධර්ම විනිශ්චය',
            body: 'පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ',
            image: '/lecture/8.jpg',
            link: 'https://www.youtube.com/watch?v=05jKhN-T_o8&list=PLDkufrwzs8aW7yzS6FOOXhEIfV_dO2zsd'
        },
        {
            title: 'අධිචිත්ත සික්ඛා',
            body: '<p>🧘චිත්ත විශුද්ධිය කෙළෙස් වලින් පරම විශුද්ධියට පදනම වෙයි.</p>\n<p>චිත්ත විශුද්ධියට මග ථෙරවාද සම්ප්‍රදායට අනුව මුල පටන් සරළව, පැහැදිලිව සහ ප්‍රායෝගිකව විස්තර කරන දේශනා මාලාව </p>\n<p>ශාස්ත්‍රපති පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමින්වහන්සේ </p>\n<p>දිනය සහ වේලාව:</p>\n<p>සතියේ සෑම අඟහරුවාදා දිනකම</p>\n<p>ප.ව. 5.00 (Sri Lanka)</p>\n<p>ප.ව. 10.30 (Melbourne)</p>',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250617_bhawana.jpg',
            link: 'https://www.youtube.com/watch?v=hbfDgWpIG7I&list=PLDkufrwzs8aUn-nwvOXn9gtDiBwEhBTGm'
        },
        {
            title: 'ථේරවාද බුදු දහමේ සිද්ධාන්ත',
            body: 'පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ',
            image: '/lecture/1.jpg',
            link: 'https://www.youtube.com/watch?v=u7iEJt4c57c&list=PLDkufrwzs8aWqIP4gnYxKI9bDZ6Nsu2fR'
        },
        {
            title: 'new1',
            body: '<p>newfdf</p>',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_abidarmaya_15.jpeg',
            link: 'https://www.youtube.com/watch?v=2'
        },
        {
            title: 'new2',
            body: 'new',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_Dhammavinicchaya%20.jpeg',
            link: 'https://www.youtube.com/watch?v='
        },
        {
            title: 'new3',
            body: 'new',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_FUNDAMENTAL_46.jpeg',
            link: 'https://www.youtube.com/watch?v='
        },
        {
            title: 'new4',
            body: 'new',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_parami_12.jpeg',
            link: 'https://www.youtube.com/watch?v='
        },
        {
            title: 'new5',
            body: 'new',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_sagi%20warnana_1.jpeg',
            link: 'https://www.youtube.com/watch?v='
        },
        {
            title: 'new6',
            body: 'new',
            image: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/uploads/20250624_wohars%20deshana.jpeg',
            link: 'https://www.youtube.com/watch?v='
        }
    ];

    const faqData = [
        {
            question: 'What is the International Institute of Theravada (IIT)?',
            answer: 'The International Institute of Theravada (IIT) is a comprehensive training institute aimed at facilitating the spiritual and academic development of Buddhist monks based on Theravada teachings. It provides education in Buddhist scriptures, meditation, and monastic discipline.'
        },
        {
            question: 'Who can join the IIT?',
            answer: 'IIT is primarily designed for Buddhist monks of the Theravada tradition, regardless of sect (Nikaya). Lay practitioners may participate in certain public lectures and courses offered by the institute.'
        },
        {
            question: 'What courses does IIT offer?',
            answer: 'IIT offers three main courses: Nissayamuttaka Course (NmC), Parisupaṭṭhāka Course (PuC), and Bhussuta Course (BstC), focusing on Theravada doctrine, meditation, and monastic training.'
        },
        {
            question: 'Are the lectures available online?',
            answer: 'Yes, IIT provides online Dhamma lectures and sermons in both Sinhala and English, accessible via platforms like YouTube. Check our Education page for links.'
        },
        {
            question: 'How is IIT governed?',
            answer: 'IIT is autonomously governed by its General Assembly, which includes the Executive Board, Senate, and Vinaya Council, ensuring both academic and monastic oversight.'
        },
        {
            question: 'Can I donate to support IIT?',
            answer: 'Yes, IIT welcomes donations to support its mission. Please contact our administration through the official website for details on how to contribute.'
        },
        {
            question: 'What is the focus of IIT’s meditation training?',
            answer: 'IIT’s meditation training emphasizes authentic Theravada techniques, such as mindfulness of breathing (Anapanasati) and insight meditation (Vipassana), guided by experienced monks.'
        }
    ];

    const meditationData = [
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=H1TmDmqW8d8&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=1',
            image: 'bhawana/1.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=VQ49f7_cBL4&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=2',
            image: 'bhawana/2.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=4qQGaItF_vA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=3',
            image: 'bhawana/3.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=wFivrNw978U&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=4',
            image: 'bhawana/4.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=WdWNVL1dswA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=5',
            image: 'bhawana/5.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=XSdfRdEOj98&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=6',
            image: 'bhawana/6.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=ConJhFWFIoA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=7',
            image: 'bhawana/7.jpg'
        },
        {
            title: 'Learning',
            body: 'Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.',
            link: 'https://www.youtube.com/watch?v=-nEIhpuRfWs&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=8',
            image: 'bhawana/8.jpg'
        }
    ];

    const newsAndEventsData = [
        {
            type: 'Event',
            title: 'Land Donation',
            description: 'A land of approximately 85 acers with a house was offered to the IIT by pious devotee Mr. Chandrakeerthi Bandara and his family - mother-in-law D.M.M. Disanayaka and wife Mrs. Chandima Wanninayaka - under the guidance of well renowned meditation teacher Most Venerable Agulgamuwe Ariyananda Mahā Thera, the Abbot of the Na-Uyana forest monastery. The land is known as Heenatikalmawatta and is located in the provincial council of Karuwalagaswewa, Sri Lanka. Heenatikalmawatta was hereditary property of the Bandara Family which was owned by the father-in-law of Mr. Bandara, Late State Minister H.B. Wanninayaka. Donation was held on 25th April a day after the 80th Birthday of the Late Na-Uyane Ariyadhamma Mahā Nāyaka Thera, the Vice President of the Śrī Rāmañña Mahā Nikāya, Sri Lanka at the presence of number of renowned Mahā Theras of the Śrī Kaḷyāni Yogāshrama Saṃsthā.',
            date: '2019-04-25T13:35:00.000Z',
            image: '/land-offering.jpg'
        },
        {
            type: 'Event',
            title: 'Establishment',
            description: 'IIT was established with the offering of six residential chambers for monks (kuṭis) by Honorable Maithreepala Sirisena, the President of Democratic Socialist Republic of Sri Lanka on 15th November 2019. Event was participated by more than 25 monks of the Śrī Kaḷyāni Yogāshrama Saṃsthā.',
            date: '2019-04-25T13:35:00.000Z',
            image: '/establishment.jpg'
        },
        {
            type: 'News',
            title: 'Rains Retreat 2020',
            description: 'Number of five monks observed the first rains retreat in the IIT premises with the invitation of Mr. Chandrakeerthi Bandara and Family together with the Kshemabhūmi Saṃsadaya.',
            date: '2020-04-25T13:35:00.000Z',
            image: ''
        },
        {
            type: 'Event',
            title: 'Kaṭhina Ceremony 2020',
            description: 'The first Kaṭhina ceremony was held on November 19 by Mr. Chandrakeerthi Bandara and Family together with the Kshemabhūmi Saṃsadaya with the participant of monks from the IIT and Katana Gangarama Meditation center.',
            date: '2013-04-25T13:35:00.000Z',
            image: ''
        },
        {
            type: 'News',
            title: 'Rains Retreat 2021',
            description: 'Number of 16 monks observed the second rains retreat in the IIT premises with the invitation of renowned Neurologist Professor Mrs Ranjani Gamage and Gemologist Mr Amitha Gamage, together with the Kshemabhūmi Saṃsadaya.',
            date: '2021-04-25T13:35:00.000Z',
            image: ''
        },
        {
            type: 'Event',
            title: 'Kaṭhina Ceremony 2021',
            description: 'The second Kaṭhina ceremony of the IIT was held on 14th November by Professor Ranjani Gamage and Mr Amitha Gamage together with the Kshemabhūmi Saṃsadaya. A grand colouful Paṭṭhāna pūja was organized by the Gamage family on 13th November night wishing welfare for and longivity of the IIT and its members.',
            date: '2021-11-25T13:35:00.000Z',
            image: '/katina-2021.JPG'
        },
        {
            type: 'Event',
            title: 'Offering the LHP Studio',
            description: 'Professor Ranjani Gamage appreciating the urgent need for a separated building dedicated to conduct online Dhamma courses built a LHP studio in the IIT premises. Some other devotees also assisted her in this endeavor. The Studio was offered to the Mahā Saṅgha on 2nd January 2022.',
            date: '2022-04-25T13:35:00.000Z',
            image: '/studio-offering.jpg'
        },
        {
            type: 'Event',
            title: 'General Assembly 2025: A New Chapter in the Governance of the International Institute of Theravāda',
            description: '<p>The International Institute of Theravāda (IIT) is pleased to announce the successful completion of its Annual General Assembly, held on 12th June 2025. The event marks a significant milestone in the Institute’s continued development.</p><p>For the past several years, the Institute has been under the guidance of an interim board that has played a vital role in sustaining and advancing IIT’s mission. The interim board comprised the following venerable members:</p><ul><li><p>Ven. Werapitiye Devananda (President)</p></li><li><p>Ven. Watagoda Maggavihari (Vice President)</p></li><li><p>Ven. Udadigana Siddhattha (Secretary)</p></li><li><p>Ven. Mathugama Dhammanisanti</p></li><li><p>Ven. Labunoruwe Dhammavihari</p></li><li><p>Ven. Palmadulle Vijithananda (Vice Secretary)</p></li></ul><h3>Key Outcomes of the General Assembly</h3><ul><li><p>The interim board members were officially appointed as the Executive Board of IIT, affirming their continued leadership.</p></li><li><p>For the first time since the inception of the Institute, the Sangha elected two new members to the Executive Board:</p><ul><li><p>Ven. Laos Sumana</p></li><li><p>Ven. Dodanduwe Obhasa</p></li></ul><p> Both were elected with 100% unanimous approval by the Sangha.</p></li><li><p>A key highlight of the Assembly was the election of a new President. In a display of transparency and collective decision-making, the Sangha cast their votes by secret ballot—a cornerstone of democratic tradition. The outcome reflected full, unanimous support.</p></li></ul><h3>Commitment to Transparency and Dhamma-Centered Leadership</h3><p>The Institute reaffirmed its commitment to accountability, openness, and Sangha-centered decision-making. Going forward, all financial records, institutional decisions, and activities will be conducted with full transparency and in alignment with the guiding va...</p>',
        }
    ]

    const ourFocusData = [
        {
            title: 'Learning',
            body: 'Illuminating Minds Through Tradition We impart the timeless Dhamma and Vinaya of the Theravāda tradition through authentic study of the Pāli Canon and Commentaries. Open to sincere students worldwide.',
            image: 'learning_new.jpg',
            link: '/learning_new.jpg'
        },
        {
            title: 'Discipline',
            body: 'Disciplined Living, Authentic Practice Our community trains in strict accordance with the ancient disciplinary code of the Vinaya Pitaka, upholding the Buddha\'s original precepts in daily monastic life.',
            image: 'discipline.png',
            link: '/discipline.png'
        },
        {
            title: 'Training',
            body: 'Samatha and Vipassanā meditation practices.',
            image: 'MeditateThero.JPG',
            link: '/MeditateThero.JPG'
        },
        {
            title: 'Propagation',
            body: 'Disseminating the Theravāda teachings to a global audience.',
            image: 'prolonging.png',
            link: '/prolonging.png'
        },
        {
            title: 'Prolongation',
            body: 'Building the capacity of trainee-clergy (monks), so that once trained, they would be able to ordain and train novices to preserve the Bhikkhu lineage in an efficient manner.',
            image: 'propagation.png',
            link: '/propagation.png'
        }
    ];

    const testimonialsData = [
        {
            quote: 'What is IIT ?',
            author: '',
            image: '',
            description: '',
            video: 'https://www.youtube.com/watch?v=zO2qL0SW2RA'
        },
        {
            quote: 'Why IIT was established ?',
            author: '',
            image: '',
            description: '',
            video: 'https://www.youtube.com/watch?v=qXvLCZvws8E'
        },
        {
            quote: 'Education in IIT',
            author: '',
            image: '',
            description: '',
            video: 'https://www.youtube.com/watch?v=YxTr6g6kpc8'
        },
        {
            quote: 'Monastic Training in IIT',
            author: '',
            image: '',
            description: '',
            video: 'https://www.youtube.com/watch?v=xUvyfyVcitM'
        },
        {
            quote: 'Vision of IIT',
            author: '',
            image: '',
            description: '',
            video: 'https://www.youtube.com/watch?v=olkLu3BTLis'
        }
    ];

    const academicProfilesData = [
        {
            name: 'Ven Werapitiye Dewānanda Thera',
            title: 'President',
            body: '<p>Holds a BA and MA in Buddha Dhamma from the International Theravāda Buddhist Missionary University in Yangon, and a BA (Honours) in Sanskrit from the University of Peradeniya. Earned the title&nbsp;<em>Vidyānidhi Pandita</em>&nbsp;from Vidyodaya Parivena. Experienced in propagating the Dhamma in various settings, including in Australia and Hawaii.</p>',
            body2: '',
            profileImage: '/profilepic/DewanandaThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Ven Watagoda Maggavihari Thera',
            title: 'Vice-President',
            body: '<p>Holds a BA and MA in Buddha Dhamma from the International Theravāda Buddhist Missionary University in Yangon. Specializes in Abhidhamma and is the designer of the widely acclaimed course&nbsp;<em>Fundamentals of the Theravāda</em>, followed by both monastics and lay practitioners, locally and internationally. Has practiced meditation in Myanmar under renowned teachers and also undergone monastic training in the Thai Forest Tradition. Conducts meditation retreats both locally and internationally, and is currently pursuing a PhD at the Postgraduate Institute of Pali and Buddhist Studies, University of Kelaniya.</p>',
            body2: '',
            profileImage: '/profilepic/MaggavihariThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Ven Matugama Dhammanisanti Thera',
            title: '',
            body: '<p>An experienced Abhidhamma teacher, currently conducting both basic and advanced Abhidhamma courses, as well as Pali courses, for lay devotees in Colombo for over ten years.</p>',
            body2: '',
            profileImage: '/profilepic/DhammanisanthiThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Ven Ududigana Siddhatthālaṅkāra Thera',
            title: 'Secretary of IIT and Head of the Vinaya Department',
            body: '<p>Holds a BA in Buddha Dhamma from the International Theravāda Buddhist Missionary University, Yangon, and is the first Sri Lankan to pass all three stages of both the&nbsp;<em>Sāsanālaṅkāra</em>&nbsp;(Sāmaṇejo) and&nbsp;<em>Vinayavidū</em>&nbsp;traditional Buddhist examinations in Myanmar. Well known for his deep knowledge of Theravāda Vinaya, he holds an MA in Pali from the Shan State Buddhist University (SSBU), Myanmar, and an MA in Buddhist Counselling from the Postgraduate Institute of Pali and Buddhist Studies, University of Kelaniya. In addition, he teaches online Pāli courses for BA students at SSBU.</p>',
            body2: '',
            profileImage: '/profilepic/SiddaththaThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Ven Labunoruwe Dhammavihari Thera',
            title: 'Treasure of IIT',
            body: '<p>Holds the&nbsp;<em>Tripiṭakācārya</em>&nbsp;title from both the Sri Sumaṅgala Gunānusmaraṇa Sabhā of Vidyodaya Parivena and the Śrī Kaḷyāṇī Yogāśrama Saṃsthā of the Rāmañña Mahānikāya. He formerly served as a Vinaya teacher at Nā-Uyana Forest Monastery, Sri Lanka, where he trained numerous young monks for higher ordination (<em>upasampadā</em>). He holds a Diploma in Psychology and Counselling from IMBS Green Campus, Sri Lanka, and is currently pursuing a BA degree in Buddhist Studies at the Nagananda International Institute for Buddhist Studies, as well as a Diploma in Buddhist Counselling and Management at Eurasian Campus, Sri Lanka.</p>',
            body2: '',
            profileImage: '/profilepic/DhammavihariThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Ven Palmadulle Vijitānandābhivaṃsa Thera',
            title: 'Vice Secretary of IIT and Head of the Pāḷi, Sanskrit and Prakrit Department',
            body: '<p>Holds the&nbsp;<em>Sāsanadhaja Dhammācariya</em>&nbsp;and the first-stage&nbsp;<em>Sakyasīha Dhammācariya</em>&nbsp;(Mandalay Abhivaṃsa) titles from Myanmar. He is one of the most academically distinguished Sri Lankan monks to have studied in Myanmar, becoming only the second Sri Lankan to pass the first stage of the highly respected&nbsp;<em>Sakyasīha Dhammācariya</em>&nbsp;Examination—an achievement attained by only about six hundred monks in its century-long history. He has also passed one of the three subjects of the second stage of this examination. In addition, he holds an MA in Pali from the Postgraduate Institute of Pali and Buddhist Studies, University of Kelaniya, and a Postgraduate Diploma in Psychology from the University of Peradeniya. He has served as a Dhamma teacher at the well-known Ywama Pariyatti Center in Ein Sein, Yangon.</p>',
            body2: '',
            profileImage: '/profilepic/VijithanandaThero.webp',
            createdAt: '2025-04-01 15:48:39',
            updatedAt: '2025-04-01 15:48:39'
        },
        {
            name: 'Venerable Laos Sumana (Somthong Duangpanya)',
            title: 'Teacher',
            body: '<p>Holds a BA in Buddha Dhamma from the International Theravāda Buddhist Missionary University in Yangon and is currently pursuing an MA in Pali at the University of Kelaniya. He teaches&nbsp;<em>Khuddaka Nikāya</em>&nbsp;and Pāli in the English medium.</p><p><br></p>',
            body2: '',
            profileImage: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/assets/profiles/ajhan_sumana.jpg',
            createdAt: '2025-06-22 04:24:10',
            updatedAt: '2025-06-22 04:24:10'
        },
        {
            name: 'Venerable Dodandūve Obhāsa',
            title: 'Teacher',
            body: '<p>Holds a BSc in Engineering from the University of Moratuwa, completed prior to ordination, and is currently pursuing an MA in Pali at the University of Kelaniya. He has studied Dhamma and Vinaya under qualified monastic teachers and teaches&nbsp;<em>Khuddaka Nikāya</em>&nbsp;and Pāli in the Sinhala medium.</p><p></p>',
            body2: '',
            profileImage: 'https://s3-iit.s3.ap-southeast-1.amazonaws.com/assets/profiles/ajhan_obhasa.jpg',
            createdAt: '2025-06-22 04:25:17',
            updatedAt: '2025-06-22 04:25:17'
        }
    ];

    const carouselData = [
        {
            id: 1,
            imageSrc: "/buddha_20250628.png",
            imageAlt: "Buddha Image",
            title: "IIT",
            description: "International Institute of Theravada is an inclusive bhikkhu training center aiming at capacitating attahita, parahita and vinayadhara Buddhist monks.",
            imageWidth: "100%",
            imageHeight: "auto",
        },
        {
            id: 2,
            imageSrc: "/temple.svg",
            imageAlt: "Temple Image",
            title: "Dhamma Programs",
            description: "IIT holds online Dhamma programs during full moon days. You can listen to various dhamma discourses, meditation instructions in both Sinhala and English medium.",
            imageWidth: "100px",
            imageHeight: "auto"
        },
        {
            id: 3,
            imageSrc: "/IIT-2.png",
            imageAlt: "IIT Logo",
            title: "Wheel of Dhamma",
            description: "<p><strong>Brown Coloured Large Wheel of Dhamma</strong> indicates how the dispensation of the Buddha is spread all over the world.</p><p><strong>Twenty-four Spokes</strong> of the wheel represent the twenty-four factors of the Noble Truths.</p><p><strong>Palm-Leaf-Books</strong> which holds the wheel of Dhamma indicates how the dispensation depends upon studies on Dhamma and Vinaya after the passing away of the Buddha.</p><p><strong>The Pen and the Palm Leaf</strong> inside the wheel depicts how a monk is involved in studies of Dhamma and Vinaya – pariyatti sāsana.</p><p><strong>The Meditative Figure</strong> shows how a monk is involved in developing spiritual qualities – paṭipatti sāsana.</p><p><strong>The Pagoda</strong> depicts how a monk who involves in both scriptural studies and spiritual practice becomes a noble being who deserves to be venerated having a pagoda built for him.</p>",
            imageWidth: "400px",
            imageHeight: "auto",
        }
    ];

    await knex('Mission').del();
    await knex('Card').del();
    await knex('NavigationItem').del();
    await knex('DhammaLecture').del();
    await knex('FAQ').del();
    await knex('Meditation').del();
    await knex('NewsAndEvent').del();
    await knex('OurFocus').del();
    await knex('Testimonial').del();
    await knex('User').del();
    await knex('AcademicProfile').del();
    await knex('Carousel').del();

    // Seed data
    await knex('Mission').insert(missionData);
    await knex('Card').insert(cardData);
    await knex('NavigationItem').insert(aboutUsList);
    await knex('NavigationItem').insert(instituteList);
    await knex('NavigationItem').insert(eduList);
    await knex('DhammaLecture').insert(dhammaLectureData);
    await knex('FAQ').insert(faqData);
    await knex('Meditation').insert(meditationData);
    await knex('NewsAndEvent').insert(newsAndEventsData);
    await knex('OurFocus').insert(ourFocusData);
    await knex('Testimonial').insert(testimonialsData);
    await knex('AcademicProfile').insert(academicProfilesData);
    await knex('Carousel').insert(carouselData);

    // Seed User table
    const userData = [
        {
            username: 'admin',
            password: '',
            createdAt: '2025-03-29 09:34:03',
            updatedAt: '2025-03-29 09:34:03',
            role: 'admin'
        },
        {
            username: 'user',
            password: '',
            createdAt: '2025-03-29 10:13:14',
            updatedAt: '2025-03-29 10:13:14',
            role: 'moderator'
        },
    ];
    await knex('User').insert(userData);

    console.log('Database seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await knex.destroy();
    });