import { useRouter } from 'next/router';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MainLayoutSection from '../../components/maincommonlayout/MainCommonLayoutSection';
import { Container } from 'react-bootstrap';
import styles from './newsAndEvents.module.css';

export default function NewsEventPage({ frontmatter, content }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>News and Events - {frontmatter.title}</title>
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
        title="News and Events"
        description="Be informed of our wholesome activities. Join, Rejoice, and Accumulate Great Merits."
        photo="/Group 1071.png"
        backgroundImg="url(/MaskGroup3.svg)"
      />

      <Container style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div className={styles.newsAndEventsPostTitle}>
            {frontmatter.title}
          </div>
          <div className={styles.newsAndEventsPostSubTitle}>
            {frontmatter.date} | &nbsp;
            {frontmatter.type.indexOf("News") > -1 ? (
              <span className={styles.typeNews}>{frontmatter.type}</span>
            ) : (
              <span className={styles.typeEvent}>{frontmatter.type}</span>
            )}
          </div>
        </div>

        <article>
          <div className={styles.newsAndEventsPostRow}>
            {frontmatter.image && (
              <div className={styles.newsAndEventsPostRowImg}>
                <img
                  width="100%"
                  src={frontmatter.image}
                  alt={frontmatter.title}
                />
              </div>
            )}

            <div className={styles.newsAndEventsPostRowText}>
              <div 
                className={styles.newsAndEventsPostPara}
                dangerouslySetInnerHTML={{ 
                  __html: marked(content, {
                    breaks: true,
                    gfm: true
                  })
                }} 
              />
            </div>
          </div>
        </article>
      </Container>
      
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('news_events'));
  
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const markdownWithMeta = fs.readFileSync(
      path.join('news_events', slug + '.md'),
      'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
      props: {
        frontmatter,
        content,
        slug
      },
      // Revalidate every hour
      revalidate: 3600
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}