import { Button } from 'react-bootstrap';
import styles from './Header.module.css';
import { FaUserPlus, FaKey } from 'react-icons/fa';

export default function Header({
    user,
    onLogout,
    onAddUser,
    onChangePassword
}) {
    return (
        <div className={`${styles.header} d-none d-sm-flex`}>
            <h1 className={styles.headerTitle}>Admin Dashboard</h1>
            <div>
                {user?.role === 'admin' && (
                    <>
                        <Button
                            variant="outline-primary"
                            className="me-2"
                            onClick={onAddUser}
                        >
                            <FaUserPlus /> Add User
                        </Button>
                        <Button
                            variant="outline-secondary"
                            className="me-2"
                            onClick={onChangePassword}
                        >
                            <FaKey /> Change Password
                        </Button>
                    </>
                )}
                <Button variant="outline-danger" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}