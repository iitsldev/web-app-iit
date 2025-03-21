import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Container, Card, Pagination } from 'react-bootstrap';
import MainLayoutSection from '../components/maincommonlayout/MainCommonLayoutSection';
import React, { useState, useEffect } from 'react';
import styles from './newsandevents/NewsAndEventPost.module.css';
import Link from 'next/link';

export default function NewsAndEvents({ initialNewsAndEvents = [] }) {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const [newsAndEvents, setNewsAndEvents] = useState(initialNewsAndEvents || []);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Format date
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(newsAndEvents)
    ? newsAndEvents.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil((newsAndEvents?.length || 0) / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Head>
        <title>News and Events</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="News and Events from the International Institute of Theravada"
        />
      </Head>
      <div className="navbarCarouselWrapper institute">
        <Header />
        <MainLayoutSection
          title="News and Events"
          description="Be informed of our wholesome activities. Join, Rejoice, and Accumulate Great Merits."
          photo="/Group 1071.png"
          backgroundImg="url(/MaskGroup3.svg)"
        />
      </div>

      <Container className={styles.newsContainer}>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <Card key={post.id} className={styles.postCard}>
              {post.image && (
                <Card.Img
                  variant="top"
                  src={post.image}
                  alt={post.title}
                  className={styles.postImage}
                />
              )}
              <Card.Body>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>
                    {formatDateTime(post.date)}
                  </span>
                  <span className={styles.postType}>{post.type}</span>
                </div>
                <Card.Title className={styles.postTitle}>
                  <Link href={`/newsandevents/${post.id}`} target="_blank">{post.title}</Link>
                </Card.Title>
                <Card.Text
                  className={styles.postDescription}
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className={styles.noPosts}>No posts available.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className={styles.pagination}>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
<<<<<<< HEAD
  try {
    const response = await fetch('http://localhost:3000/api/news-and-events'); // Fixed API endpoint
=======
<<<<<<< Updated upstream
  // const products = await fetch('https://fakestoreapi.com/products')
  // .then(res=>res.json());
  return {
    props: {
      //products
    },
  };
}
=======
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`); // Fixed API endpoint
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js
    if (!response.ok) {
      console.error(`Failed to fetch news and events: ${response.status}`);
      return {
        props: {
          initialNewsAndEvents: [],
        },
      };
    }
    const newsAndEvents = await response.json();
    return {
      props: {
        initialNewsAndEvents: newsAndEvents
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
          .map((item) => ({
            ...item,
            date: item.date,
          })),
      },
    };
  } catch (error) {
    console.error('Error fetching news and events:', error);
    return {
      props: {
        initialNewsAndEvents: [],
      },
    };
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> Stashed changes
>>>>>>> # new file: .env new file: prisma/.fuse_hidden0000e60000000002 new file: prisma/dev.db new file: prisma/dev1.db new file: prisma/migrations/20250320165625_/migration.sql new file: prisma/schema.prisma new file: prisma/seed.js new file: src/models/db.js modified: src/pages/aboutus.js new file: src/pages/api/academic-profiles.js modified: src/pages/education.js modified: src/pages/index.js modified: src/pages/institute.js new file: src/pages/institute_old.js modified: src/pages/meditation.js modified: src/pages/newsandevents.js new file: src/pages/newsandevents/[slug].js
