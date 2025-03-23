import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Container,
    Row,
    Col,
    Nav,
    Navbar,
    Button,
    NavbarBrand,
} from 'react-bootstrap';
import { adminAuthMiddleware } from '../../middleware/auth';
import styles from './AdminDashboard.module.css';
import {
    FaBullseye,
    FaCreditCard,
    FaCompass,
    FaBookOpen,
    FaQuestionCircle,
    FaMedkit,
    FaNewspaper,
    FaEye,
    FaComments,
    FaBars,
} from 'react-icons/fa';
import AdminTable from '../../components/admin/adminTable/AdminTable';
import AdminForm from '../../components/admin/adminForm/AdminForm';

const sections = [
    { key: 'Mission', label: 'Missions', icon: <FaBullseye />, apiModel: 'mission' },
    { key: 'Card', label: 'Cards', icon: <FaCreditCard />, apiModel: 'card' },
    { key: 'NavigationItem', label: 'Navigation Items', icon: <FaCompass />, apiModel: 'navigationItem' },
    { key: 'DhammaLecture', label: 'Dhamma Lectures', icon: <FaBookOpen />, apiModel: 'dhammaLecture' },
    { key: 'FAQ', label: 'FAQs', icon: <FaQuestionCircle />, apiModel: 'FAQ' },
    { key: 'Meditation', label: 'Meditations', icon: <FaMedkit />, apiModel: 'meditation' },
    { key: 'NewsAndEvent', label: 'News & Events', icon: <FaNewspaper />, apiModel: 'newsAndEvent' },
    { key: 'OurFocus', label: 'Our Focus', icon: <FaEye />, apiModel: 'ourFocus' },
    { key: 'Testimonial', label: 'Testimonials', icon: <FaComments />, apiModel: 'testimonial' },
];

const modelFields = {
    Mission: [
        { key: 'image', label: 'Image', type: 'file', required: true },
        { key: 'text', label: 'Description', type: 'text', required: true },
    ],
    Card: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'image', label: 'Image', type: 'file', required: true },
        { key: 'description', label: 'Description', type: 'text', required: true },
        { key: 'link', label: 'Link', type: 'text', required: false },
        { key: 'color', label: 'Title', type: 'text', required: false },
        { key: 'titleColor', label: 'Title', type: 'text', required: false },
        { key: 'arrowColor', label: 'Title', type: 'text', required: false },
    ],
    NavigationItem: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'htmlId', label: 'URL Slug', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'text', required: true },
    ],
    DhammaLecture: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'image', label: 'Image', type: 'image', required: true },
        { key: 'body', label: 'Description', type: 'richtext', required: false },
        { key: 'link', label: 'Link', type: 'text', required: false },
    ],
    FAQ: [
        { key: 'question', label: 'Question', type: 'text', required: true },
        { key: 'answer', label: 'Answer', type: 'richtext', required: true },
    ],
    Meditation: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'body', label: 'Description', type: 'richtext', required: true },
        { key: 'link', label: 'Link', type: 'text', required: true },
        { key: 'image', label: 'Image', type: 'file', required: true },
    ],
    NewsAndEvent: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'type', label: 'Type', type: 'text', required: true },
        { key: 'date', label: 'Date', type: 'datetime', required: true },
        { key: 'description', label: 'Description', type: 'richtext', required: true },
        { key: 'image', label: 'Image', type: 'file', required: false },
    ],
    OurFocus: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'body', label: 'Description', type: 'text', required: true },
        { key: 'image', label: 'Image', type: 'file', required: false },
        { key: 'link', label: 'Link', type: 'text', required: false },
    ],
    Testimonial: [
        { key: 'quote', label: 'Quote', type: 'text', required: true },
        { key: 'author', label: 'Author', type: 'text', required: false },
        { key: 'image', label: 'Image', type: 'file', required: false },
        { key: 'description', label: 'Description', type: 'text', required: false },
        { key: 'video', label: 'Video Link', type: 'text', required: false },
    ],
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('NewsAndEvent');
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const activeModel = sections.find((section) => section.key === activeSection)?.apiModel;

    useEffect(() => {
        if (!activeModel) return;
        setLoading(true);
        fetch(`/api/${activeModel}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setItems((prev) => ({
                    ...prev,
                    [activeSection]: Array.isArray(data) ? data : [],
                }));
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Fetch error for ${activeModel}:`, error);
                setItems((prev) => ({ ...prev, [activeSection]: [] }));
                setLoading(false);
            });
    }, [activeSection, activeModel]);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                const res = await fetch(`/api/${activeModel}?id=${id}`, {
                    method: 'DELETE',
                });
                if (!res.ok) throw new Error('Failed to delete');
                setItems((prev) => ({
                    ...prev,
                    [activeSection]: prev[activeSection].filter((item) => item.id !== id),
                }));
            } catch (error) {
                alert('Error deleting item: ' + error.message);
            }
        }
    };

    const handleCleanup = async () => {
        if (confirm('Are you sure you want to clean up unused images?')) {
            try {
                const res = await fetch('/api/cleanup', { method: 'POST' });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Cleanup failed');
                }
                const { message } = await res.json();
                alert(message);
            } catch (error) {
                alert('Error cleaning up images: ' + error.message);
            }
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            const url = editItem
                ? `/api/${activeModel}?id=${editItem.id}`
                : `/api/${activeModel}`;
            const method = editItem ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            let responseData;
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                responseData = await res.json();
            } else {
                responseData = { error: await res.text() };
            }

            if (!res.ok) {
                throw new Error(responseData.error || `Failed to save (status: ${res.status})`);
            }

            const savedItem = responseData;
            setItems((prev) => ({
                ...prev,
                [activeSection]: editItem
                    ? prev[activeSection].map((item) => (item.id === editItem.id ? savedItem : item))
                    : [...prev[activeSection].filter((item) => item.id !== savedItem.id), savedItem],
            }));
            setShowForm(false);
        } catch (error) {
            console.error('Save error:', error);
            alert('Error saving item: ' + error.message);
        }
    };


    return (
        <Container fluid className={styles.dashboard}>
            <Navbar expand="sm" className={`${styles.topNav} d-sm-none`} bg="dark" variant="dark">
                <NavbarBrand className={styles.brand}>Admin</NavbarBrand>
                <Navbar.Toggle aria-controls="top-nav" />
                <Navbar.Collapse id="top-nav">
                    <Nav className="me-auto">
                        {sections.map((section) => (
                            <Nav.Link
                                key={section.key}
                                className={`${styles.navLink} ${activeSection === section.key ? styles.active : ''}`}
                                onClick={() => setActiveSection(section.key)}
                            >
                                <span className={styles.icon}>{section.icon}</span>
                                {section.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            <Row className={styles.mainRow}>
                <Col md={3} lg={2} className={`${styles.sidebar} d-none d-sm-block`}>
                    <Navbar className={styles.sidebarNav}>
                        <Nav className="flex-column">
                            <Navbar.Brand className={styles.brand}>Admin Panel</Navbar.Brand>
                            {sections.map((section) => (
                                <Nav.Link
                                    key={section.key}
                                    className={`${styles.navLink} ${activeSection === section.key ? styles.active : ''}`}
                                    onClick={() => setActiveSection(section.key)}
                                >
                                    <span className={styles.icon}>{section.icon}</span>
                                    <span className={styles.label}>{section.label}</span>
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar>
                </Col>

                <Col md={9} lg={10} className={styles.mainContent}>
                    <div className={`${styles.header} d-none d-sm-flex`}>
                        <h1 className={styles.headerTitle}>Admin Dashboard</h1>
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                    <div className={styles.content}>
                        <Button
                            variant="primary"
                            className="m-3"
                            onClick={() => {
                                setEditItem(null);
                                setShowForm(true);
                            }}
                        >
                            Add New
                        </Button>
                        <Button
                            variant="danger"
                            className="m-3"
                            onClick={handleCleanup}
                        >
                            Clean Up Unused Images
                        </Button>
                    </div>

                    <AdminTable
                        items={items[activeSection] || []}
                        fields={modelFields[activeSection]}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                    <AdminForm
                        show={showForm}
                        onHide={() => setShowForm(false)}
                        onSubmit={handleFormSubmit}
                        initialData={editItem}
                        fields={modelFields[activeSection]}
                    />
                </Col>
            </Row>
        </Container >
    );
}

export const getServerSideProps = adminAuthMiddleware(async (context) => {
    return {
        props: {},
    };
});