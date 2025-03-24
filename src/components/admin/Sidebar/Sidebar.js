import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import styles from './Sidebar.module.css';
import { FaBullseye, FaCreditCard /* ... other icons ... */ } from 'react-icons/fa';

const sections = [/* same sections array as before */];

export default function Sidebar({ activeSection, setActiveSection }) {
    return (
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
    );
}