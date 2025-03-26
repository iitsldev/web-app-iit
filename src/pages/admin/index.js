import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { adminAuthMiddleware } from '../../middleware/auth';

import {
    Container,
    Row,
    Col,
    Nav,
    Navbar,
    Button,
    Modal,
    Form,
    Dropdown
} from 'react-bootstrap';
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
    FaChalkboardTeacher,
    FaUser,
    FaLock,
    FaSignOutAlt,
    FaRemoveFormat,
    FaBroom
} from 'react-icons/fa';
import styles from './AdminDashboard.module.css';
import AdminTable from '../../components/admin/adminTable/AdminTable';
import AdminForm from '../../components/admin/adminForm/AdminForm';

const sections = [
    { key: 'AcademicProfile', label: 'Academic Profiles', icon: <FaChalkboardTeacher />, apiModel: 'academicProfiles' },
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
    AcademicProfile: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'body', label: 'Body', type: 'richtext', required: true },
        { key: 'body2', label: 'Additional Body', type: 'text', required: false },
        { key: 'profileImage', label: 'Profile Image', type: 'file', required: true },
    ],
    Mission: [
        { key: 'image', label: 'Image', type: 'file', required: true },
        { key: 'text', label: 'Description', type: 'text', required: true },
    ],
    Card: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'image', label: 'Image', type: 'file', required: true },
        { key: 'description', label: 'Description', type: 'text', required: true },
        { key: 'link', label: 'Link', type: 'text', required: false },
        { key: 'color', label: 'color', type: 'text', required: false },
        { key: 'titleColor', label: 'Title Color', type: 'text', required: false },
        { key: 'arrowColor', label: 'Arrow Color', type: 'text', required: false },
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
    const [collapsed, setCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('NewsAndEvent');
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const activeModel = sections.find((section) => section.key === activeSection)?.key;

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
        await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
        router.push('/admin/login');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New password and confirmation do not match');
            return;
        }

        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensure JWT cookie is sent
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to change password');

            alert('Password changed successfully');
            setShowPasswordModal(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            alert('Error changing password: ' + error.message);
        }
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
        <Container fluid className={styles.dashboardContainer}>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                <div className={styles.logoContainer}>
                    <h2 className={styles.logo}>
                        {collapsed ? 'AD' : 'Admin Panel'}
                    </h2>
                </div>
                <Nav className={styles.sideNav}>
                    {sections.map((section) => (
                        <Nav.Link
                            key={section.key}
                            className={`${styles.navItem} ${activeSection === section.key ? styles.active : ''}`}
                            onClick={() => setActiveSection(section.key)}
                        >
                            <span className={styles.navIcon}>{section.icon}</span>
                            {!collapsed && <span className={styles.navLabel}>{section.label}</span>}
                        </Nav.Link>
                    ))}
                </Nav>
            </div>

            {/* Main Content */}
            <div className={`${styles.mainContent} ${collapsed ? styles.expanded : ''}`}>
                {/* Header */}
                <Navbar className={styles.topHeader}>
                    <div className={styles.headerLeft}>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setCollapsed(!collapsed)}
                            className={styles.collapseBtn}
                        >
                            <FaBars />
                        </Button>
                        <h1 className={styles.pageTitle}>
                            {sections.find(s => s.key === activeSection)?.label}
                        </h1>
                    </div>
                    <div className={styles.headerRight}>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary" id="user-dropdown" className={styles.userDropdown}>
                                <FaUser /> Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item onClick={() => setShowPasswordModal(true)}>
                                    <FaLock className="me-2" /> Change Password
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCleanup()}>
                                    <FaBroom className="me-2" /> Cleanup Unused Images
                                </Dropdown.Item>

                                <Dropdown.Divider />
                                <Dropdown.Item className="text-danger">
                                    <FaSignOutAlt className="me-2" /> Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Navbar>

                {/* Content Area */}
                <div className={styles.contentArea}>
                    <div className={styles.sectionTabs}>
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

                    </div>
                    <div className={styles.sectionContent}>
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
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePasswordChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({
                                    ...passwordData,
                                    currentPassword: e.target.value
                                })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({
                                    ...passwordData,
                                    newPassword: e.target.value
                                })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({
                                    ...passwordData,
                                    confirmPassword: e.target.value
                                })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export const getServerSideProps = adminAuthMiddleware(async (context) => {
    return {
        props: {},
    };
});