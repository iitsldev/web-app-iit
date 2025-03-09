const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

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
      title: "Courses Conducted",
      image: "coursesAndTrainningIcon.svg",
      description: "IIT provides three courses – Nissayamuttaka Course (NmC), Parisupaṭṭhāka Course (PuC) and Bhussuta Course (BstC).",
      link: "/education",
      color: "#FFD426",
      titleColor: "#132072",
      arrowColor: ""
    },
    {
      title: "Dhamma Lectures and Sermons",
      image: "ourServicesIcon.svg",
      description: "In addition to occasional Dhamma discourses, IIT currently holds few valuable online Dhamma courses related to Theravada in both Sinhala and English medium.",
      link: "https://www.youtube.com/watch?v=pQY_xMowfRA&list=PLdluojKrWhDe6PRlcaHvxqvqKA5kwo1Dz",
      color: "#025BC1",
      titleColor: "#FFFFFF",
      arrowColor: ""
    },
    {
      title: "Meditation Instructions (Sinhala Medium)",
      image: "meditationProgIcon.svg",
      description: "Meditation becomes successful with proper guidance.",
      link: "/meditation",
      color: "#FFEDA5",
      titleColor: "#132072",
      arrowColor: ""
    },
    {
      title: "Calling Applications for the Nissayamuttaka Course (NmC)",
      image: "getRegisteredIcon.svg",
      description: "Monks who are willing to register for this course, can use the given link (Deadline is 20th of August 2023.)",
      link: "/nmcmain",
      color: "#1E1EA2",
      titleColor: "#FFFFFF",
      arrowColor: ""
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
    { title: 'Academic Staff', htmlId: 'academic-staff', category: 'institute' },
    { title: 'Monastery', htmlId: 'monastery', category: 'institute' },
    { title: 'Administration', htmlId: 'administration', category: 'institute' },
  ];

  const eduList = [
    { title: 'Subjects', htmlId: 'subjects', category: 'edu' },
    { title: 'Courses', htmlId: 'courses', category: 'edu' },
  ];

  const dhammaLectureData = [
    {
      title: "Fundamentals of Theravada Buddhism",
      body: "Ven Watagoda Maggavihari Thera",
      image: "/lecture/2.jpg",
      link: "https://www.youtube.com/watch?v=WeF9BYgeqF8&list=PLDkufrwzs8aUDYUHQQGODzJtMzVhdm6MZ"
    },
    {
      title: "ථේරවාද බුදු දහමේ සිද්ධාන්ත",
      body: "පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ",
      image: "/lecture/1.jpg",
      link: "https://www.youtube.com/watch?v=u7iEJt4c57c&list=PLDkufrwzs8aWqIP4gnYxKI9bDZ6Nsu2fR"
    },
    {
      title: "සූවිසි ප්‍රත්‍යය අභිධර්ම සම්භාෂණය",
      body: "පූජ්‍ය දෙනියායේ උපසම ස්වාමීන්වහන්සේ",
      image: "/lecture/3.jpg",
      link: "https://www.youtube.com/watch?v=LvMGieIA4Ys&list=PLDkufrwzs8aVdSzzBdFDHeBy0Tx6nst_j"
    },
    {
      title: "සූත්‍ර සම්භාෂණය",
      body: "පූජ්‍ය උඩදිගන සිද්ධත්ථ ස්වාමීන්වහන්සේ",
      image: "/lecture/4.jpg",
      link: "https://www.youtube.com/watch?v=CknJSJcYHMY&list=PLDkufrwzs8aVe0y6qca85fAap1kzTsZZA"
    },
    {
      title: "ආර්ය උතුමෝ",
      body: "පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ",
      image: "/lecture/5.jpg",
      link: "https://www.youtube.com/watch?v=sbOSDQJVdNY&list=PLDkufrwzs8aUYyM16uaYzq4leyX6toIXE"
    },
    {
      title: "ජාතක කතා",
      body: "පූජ්‍යපාද පස්සර පදුමසිරි ස්වාමීන්වහනසේ",
      image: "/lecture/6.jpg",
      link: "https://www.youtube.com/watch?v=lA2VV-D73H0&list=PLDkufrwzs8aWMVLDNJ7O4OQeUAla9eaTU"
    },
    {
      title: "විමාන වස්තු",
      body: "පූජ්‍ය වලල්ලාවිට වජිරඤාණ ස්වාමීන්වහන්සේ",
      image: "/lecture/7.jpg",
      link: "https://www.youtube.com/watch?v=_CTEOO2eByg&list=PLDkufrwzs8aXyJMqC1YThc7txU1D2Qg32"
    },
    {
      title: "ධර්ම විනිශ්චය",
      body: "පූජ්‍ය වටගොඩ මග්ගවිහාරී ස්වාමීන්වහන්සේ",
      image: "/lecture/8.jpg",
      link: "https://www.youtube.com/watch?v=05jKhN-T_o8&list=PLDkufrwzs8aW7yzS6FOOXhEIfV_dO2zsd"
    }
  ];

  const faqData = [
    {
      question: "What is the International Institute of Theravada (IIT)?",
      answer: "The International Institute of Theravada (IIT) is a comprehensive training institute aimed at facilitating the spiritual and academic development of Buddhist monks based on Theravada teachings. It provides education in Buddhist scriptures, meditation, and monastic discipline."
    },
    {
      question: "Who can join the IIT?",
      answer: "IIT is primarily designed for Buddhist monks of the Theravada tradition, regardless of sect (Nikaya). Lay practitioners may participate in certain public lectures and courses offered by the institute."
    },
    {
      question: "What courses does IIT offer?",
      answer: "IIT offers three main courses: Nissayamuttaka Course (NmC), Parisupaṭṭhāka Course (PuC), and Bhussuta Course (BstC), focusing on Theravada doctrine, meditation, and monastic training."
    },
    {
      question: "Are the lectures available online?",
      answer: "Yes, IIT provides online Dhamma lectures and sermons in both Sinhala and English, accessible via platforms like YouTube. Check our Education page for links."
    },
    {
      question: "How is IIT governed?",
      answer: "IIT is autonomously governed by its General Assembly, which includes the Executive Board, Senate, and Vinaya Council, ensuring both academic and monastic oversight."
    },
    {
      question: "Can I donate to support IIT?",
      answer: "Yes, IIT welcomes donations to support its mission. Please contact our administration through the official website for details on how to contribute."
    },
    {
      question: "What is the focus of IIT’s meditation training?",
      answer: "IIT’s meditation training emphasizes authentic Theravada techniques, such as mindfulness of breathing (Anapanasati) and insight meditation (Vipassana), guided by experienced monks."
    }
  ];

  const meditationData = [
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=H1TmDmqW8d8&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=1",
      image: "bhawana/1.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=VQ49f7_cBL4&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=2",
      image: "bhawana/2.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=4qQGaItF_vA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=3",
      image: "bhawana/3.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=wFivrNw978U&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=4",
      image: "bhawana/4.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=WdWNVL1dswA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=5",
      image: "bhawana/5.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=XSdfRdEOj98&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=6",
      image: "bhawana/6.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=ConJhFWFIoA&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=7",
      image: "bhawana/7.jpg"
    },
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      link: "https://www.youtube.com/watch?v=-nEIhpuRfWs&list=PLDkufrwzs8aXs5thvWFx8guViQG_wj4sT&index=8",
      image: "bhawana/8.jpg"
    }
  ];

  const newsAndEventsData = [
    {
      type: "Event",
      title: "Land Donation",
      description: "A land of approximately 85 acers with a house was offered to the IIT by pious devotee Mr. Chandrakeerthi Bandara and his family - mother-in-law D.M.M. Disanayaka and wife Mrs. Chandima Wanninayaka - under the guidance of well renowned meditation teacher Most Venerable Agulgamuwe Ariyananda Mahā Thera, the Abbot of the Na-Uyana forest monastery. The land is known as Heenatikalmawatta and is located in the provincial council of Karuwalagaswewa, Sri Lanka. Heenatikalmawatta was hereditary property of the Bandara Family which was owned by the father-in-law of Mr. Bandara, Late State Minister H.B. Wanninayaka. Donation was held on 25th April a day after the 80th Birthday of the Late Na-Uyane Ariyadhamma Mahā Nāyaka Thera, the Vice President of the Śrī Rāmañña Mahā Nikāya, Sri Lanka at the presence of number of renowned Mahā Theras of the Śrī Kaḷyāni Yogāshrama Saṃsthā.",
      date: "2019-04-25T13:35:00.000Z",
      image: "/land-offering.jpg"
    },
    {
      type: "Event",
      title: "Establishment",
      description: "IIT was established with the offering of six residential chambers for monks (kuṭis) by Honorable Maithreepala Sirisena, the President of Democratic Socialist Republic of Sri Lanka on 15th November 2019. Event was participated by more than 25 monks of the Śrī Kaḷyāni Yogāshrama Saṃsthā.",
      date: "2019-04-25T13:35:00.000Z",
      image: "/establishment.jpg"
    },
    {
      type: "News",
      title: "Rains Retreat 2020",
      description: "Number of five monks observed the first rains retreat in the IIT premises with the invitation of Mr. Chandrakeerthi Bandara and Family together with the Kshemabhūmi Saṃsadaya.",
      date: "2020-04-25T13:35:00.000Z",
      image: ""
    },
    {
      type: "Event",
      title: "Kaṭhina Ceremony 2020",
      description: "The first Kaṭhina ceremony was held on November 19 by Mr. Chandrakeerthi Bandara and Family together with the Kshemabhūmi Saṃsadaya with the participant of monks from the IIT and Katana Gangarama Meditation center.",
      date: "2013-04-25T13:35:00.000Z",
      image: ""
    },
    {
      type: "News",
      title: "Rains Retreat 2021",
      description: "Number of 16 monks observed the second rains retreat in the IIT premises with the invitation of renowned Neurologist Professor Mrs Ranjani Gamage and Gemologist Mr Amitha Gamage, together with the Kshemabhūmi Saṃsadaya.",
      date: "2021-04-25T13:35:00.000Z",
      image: ""
    },
    {
      type: "Event",
      title: "Kaṭhina Ceremony 2021",
      description: "The second Kaṭhina ceremony of the IIT was held on 14th November by Professor Ranjani Gamage and Mr Amitha Gamage together with the Kshemabhūmi Saṃsadaya. A grand colouful Paṭṭhāna pūja was organized by the Gamage family on 13th November night wishing welfare for and longivity of the IIT and its members.",
      date: "2021-11-25T13:35:00.000Z",
      image: "/katina-2021.JPG"
    },
    {
      type: "Event",
      title: "Offering the LHP Studio",
      description: "Professor Ranjani Gamage appreciating the urgent need for a separated building dedicated to conduct online Dhamma courses built a LHP studio in the IIT premises. Some other devotees also assisted her in this endeavor. The Studio was offered to the Mahā Saṅgha on 2nd January 2022.",
      date: "2022-04-25T13:35:00.000Z",
      image: "/studio-offering.jpg"
    }
  ];

  const ourFocusData = [
    {
      title: "Learning",
      body: "Imparting knowledge in students on the Dhamma and Vinaya preserved under the Theravāda tradition enshrined in the Pāli Doctrine – Canon and Commentaries.",
      image: "learning_new.jpg",
      link: "/learning_new.jpg"
    },
    {
      title: "Discipline",
      body: "Training according to the disciplinary rules as per the Vinaya Pitaka.",
      image: "discipline.png",
      link: "/discipline.png"
    },
    {
      title: "Training",
      body: "Samatha and Vipassanā meditation practices.",
      image: "MeditateThero.JPG",
      link: "/MeditateThero.JPG"
    },
    {
      title: "Propagation",
      body: "Disseminating the Theravāda teachings to a global audience.",
      image: "prolonging.png",
      link: "/prolonging.png"
    },
    {
      title: "Prolongation",
      body: "Building the capacity of trainee-clergy (monks), so that once trained, they would be able to ordain and train novices to preserve the Bhikkhu lineage in an efficient manner.",
      image: "propagation.png",
      link: "/propagation.png"
    }
  ];

  const testimonialsData = [
    {
      quote: "What is IIT ?",
      author: "",
      image: "",
      description: "",
      video: "https://www.youtube.com/watch?v=zO2qL0SW2RA"
    },
    {
      quote: "Why IIT was established ?",
      author: "",
      image: "",
      description: "",
      video: "https://www.youtube.com/watch?v=qXvLCZvws8E"
    },
    {
      quote: "Education in IIT",
      author: "",
      image: "",
      description: "",
      video: "https://www.youtube.com/watch?v=YxTr6g6kpc8"
    },
    {
      quote: "Monastic Training in IIT",
      author: "",
      image: "",
      description: "",
      video: "https://www.youtube.com/watch?v=xUvyfyVcitM"
    },
    {
      quote: "Vision of IIT",
      author: "",
      image: "",
      description: "",
      video: "https://www.youtube.com/watch?v=olkLu3BTLis"
    }
  ];

  await prisma.mission.deleteMany();
  await prisma.card.deleteMany();
  await prisma.navigationItem.deleteMany();
  await prisma.dhammaLecture.deleteMany();
  await prisma.FAQ.deleteMany();
  await prisma.meditation.deleteMany();
  await prisma.newsAndEvent.deleteMany();
  await prisma.ourFocus.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.user.deleteMany(); // Clear existing users



  await prisma.mission.createMany({ data: missionData });
  await prisma.card.createMany({ data: cardData });
  await prisma.navigationItem.createMany({ data: aboutUsList });
  await prisma.navigationItem.createMany({ data: instituteList });
  await prisma.navigationItem.createMany({ data: eduList });
  await prisma.dhammaLecture.createMany({ data: dhammaLectureData });
  await prisma.FAQ.createMany({ data: faqData });
  await prisma.meditation.createMany({ data: meditationData });
  await prisma.newsAndEvent.createMany({ data: newsAndEventsData });
  await prisma.ourFocus.createMany({ data: ourFocusData });
  await prisma.testimonial.createMany({ data: testimonialsData });
  //for User table
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('iitmonk', saltRounds); // Default password: admin123

  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });