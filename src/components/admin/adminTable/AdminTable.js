import { Table, Button, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import styles from './AdminTable.module.css';

const AdminTable = ({ items = [], fields, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading data...</p>
            </div>
        );
    }

    if (!Array.isArray(items) || items.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h4>No items found</h4>
                <p>There are currently no items in this section.</p>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <Table hover responsive className={styles.adminTable}>
                <thead className={styles.tableHeader}>
                    <tr>
                        {fields.map((field) => (
                            <th key={field.key}>{field.label}</th>
                        ))}
                        <th className={styles.actionsHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className={styles.tableRow}>
                            {fields.map((field) => (
                                <td key={field.key} className={styles.tableCell}>
                                    {field.render
                                        ? field.render(item[field.key], item)
                                        : item[field.key]
                                            ? item[field.key].slice(0, 500) + (item[field.key].length > 500 ? '...' : '')
                                            : ''}
                                </td>
                            ))}
                            <td className={styles.actionCell}>
                                <div className={styles.actionButtons}>
                                    <Button
                                        variant="outline-primary"
                                        className={styles.actionButton}
                                        onClick={() => onEdit(item)}
                                    >
                                        <FaEdit className="me-2" /> Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className={styles.actionButton}
                                        onClick={() => onDelete(item.id)}
                                    >
                                        <FaTrash className="me-2" /> Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminTable;