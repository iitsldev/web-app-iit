import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MainLayoutSection from '../../components/maincommonlayout/MainCommonLayoutSection';
import styles from './NewsAndEventPage.module.css';

export default function NewsAndEvents({ initialNewsAndEvents = [] }) {
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

  // Get badge color based on post type
  function getPostTypeBadgeColor(type) {
    switch (type.toLowerCase()) {
      case 'news':
        return styles.newsTypeBadge;
      case 'event':
        return styles.eventTypeBadge;
      case 'announcement':
        return styles.announcementTypeBadge;
      case 'workshop':
        return styles.workshopTypeBadge;
      case 'seminar':
        return styles.seminarTypeBadge;
      default:
        return styles.defaultTypeBadge;
    }
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
    <div className={styles.newsEventsPage}>
      <Head>
        <title>News and Events | International Institute of Theravada</title>
        <meta name="description" content="Stay updated with the latest news and events from the International Institute of Theravada" />
      </Head>

      <Header />

      <MainLayoutSection
        title="News and Events"
        description="Be informed of our wholesome activities. Join, Rejoice, and Accumulate Great Merits."
        photo="/Group 1071.png"
        backgroundImg="url(/MaskGroup3.svg)"
      />

      <Container className={styles.newsContainer}>
        <div className={styles.newsGridWide}>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div key={post.id} className={styles.newsCardWide}>
                {post.image && (
                  <div className={styles.newsCardImageWide}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.newsCardImageContent}
                    />
                    <span className={`${styles.newsCardTypeBadge} ${getPostTypeBadgeColor(post.type)}`}>
                      {post.type}
                    </span>
                  </div>
                )}
                <div className={styles.newsCardContentWide}>
                  <div className={styles.newsCardMetaWide}>
                    <span className={styles.newsCardDateWide}>
                      {formatDateTime(post.date)}
                    </span>
                  </div>
                  <h3 className={styles.newsCardTitleWide}>
                    <Link
                      href={`/newsandevents/${post.id}`}
                      className={styles.newsCardTitleLinkWide}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p
                    className={styles.newsCardDescriptionWide}
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  <Link
                    href={`/newsandevents/${post.id}`}
                    className={styles.newsCardReadMoreWide}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noPostsWide}>No posts available.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationContainerWide}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${styles.paginationButtonWide} ${currentPage === 1 ? styles.disabledWide : ''}`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.paginationButtonWide} ${i + 1 === currentPage ? styles.activeWide : ''
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${styles.paginationButtonWide} ${currentPage === totalPages ? styles.disabledWide : ''
                }`}
            >
              Next
            </button>
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/news-and-events`);
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
          .sort((a, b) => new Date(b.date) - new Date(a.date))
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
}