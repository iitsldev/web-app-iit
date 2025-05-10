import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MainLayoutSection from '../../components/maincommonlayout/MainCommonLayoutSection';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './NewsAndEventPost.module.css';
import sanitizeHtml from 'sanitize-html';

export default function NewsAndEventPost({ post, recentPosts = [] }) {  // Default to empty array
    const { t, lang } = useTranslation();
    const router = useRouter();

    const renderRecentItem = (item, index) => (
        <div className={styles.recentItem} key={index}>
            <div className={styles.recentItemInner}>
                {item.image && (
                    <div className={styles.recentImageWrapper}>
                        <img src={item.image} alt={item.title} className={styles.recentImage} />
                        <span className={item.type === 'News' ? styles.typeNews : styles.typeEvent}>
                            {item.type}
                        </span>
                    </div>
                )}
                <div className={styles.recentContent}>
                    <div className={styles.recentDate}>{item.date}</div>
                    <h3 className={styles.recentTitle}>{item.title}</h3>
                    <p className={styles.recentDescription}>
                        {`${item.description.slice(0, 100)}...`}
                    </p>
                    <a href={`/newsandevents/${item.id}`} className={styles.recentLink}>
                        Read more →
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="skeleton">
            <Head>
                <title>{post.title} | News and Events</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content={post.description.slice(0, 150) + '...'}
                />
            </Head>

            <div className="navbarCarouselWrapper institute">
                <Header />
                <MainLayoutSection
                    title={post.title}
                    description={`${post.type} - ${post.date}`}
                    photo={post.image || '/Group 1071.png'}
                    backgroundImg="url(/MaskGroup3.svg)"
                />
            </div>

            <Container fluid className={styles.postContainer}>
                <Row>
                    <Col md={8} className="mx-auto">
                        <div className={styles.postContent}>
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className={styles.postImage}
                                />
                            )}
                            <div className={styles.postTextWrapper}>
                                <h1 className={styles.postTitle}>{post.title}</h1>
                                <div className={styles.postSubtitle}>
                                    {post.type} | {post.date}
                                </div>
                                <div className={styles.postText} dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.description) }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className={styles.recentContainer}>
                {Array.isArray(recentPosts) && recentPosts.length > 0 && (
                    <Row className={styles.recentSection}>
                        <Col>
                            <h2 className={styles.sectionTitle}>Recent Posts</h2>
                            <div className={styles.recentGrid}>
                                {recentPosts.map(renderRecentItem)}
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>

            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;

    try {
        // Fetch the specific post
        const postResponse = await fetch(`${process.env.API_BASE_URL}/api/news-and-events?id=${slug}`);
        if (!postResponse.ok) {
            console.error(`Failed to fetch post: ${postResponse.status}`);
            return { notFound: true };
        }
        const post = await postResponse.json();

        // Fetch recent posts with error handling
        const recentPostsResponse = await fetch(
            `${process.env.API_BASE_URL}/api/news-and-events?limit=10`
        );
        let recentPosts = [];

        if (recentPostsResponse.ok) {
            recentPosts = await recentPostsResponse.json();
            // Ensure recentPosts is an array and process it
            recentPosts = Array.isArray(recentPosts)
                ? recentPosts
                    .filter((item) => item.id !== post.id)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 10)
                : [];
        } else {
            console.error(`Failed to fetch recent posts: ${recentPostsResponse.status}`);
        }

        return {
            props: {
                post: {
                    ...post,
                    date: post.date.slice(0, 10),
                },
                recentPosts: recentPosts.map((item) => ({
                    ...item,
                    description: item.description.replace(/<[^>]*>/g, ''),
                    date: item.date.slice(0, 10),
                })),
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                post: null,
                recentPosts: [],
            },
            notFound: true,
        };
    }
}