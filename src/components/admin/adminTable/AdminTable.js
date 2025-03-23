import { Table, Button, Spinner } from 'react-bootstrap';
import styles from './AdminTable.module.css';

const AdminTable = ({ items = [], fields, onEdit, onDelete, loading }) => {
    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto my-4" />;
    }

    if (!Array.isArray(items) || items.length === 0) {
        return <p>No items found.</p>;
    }

    return (
        <Table striped bordered hover responsive className={styles.adminTable}>
            <thead>
                <tr>
                    {fields.map((field) => (
                        <th key={field.key}>{field.label}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        {fields.map((field) => (
                            <td key={field.key}>{item[field.key]}</td>
                        ))}
                        <td>
                            <Button
                                variant="outline-primary"
                                className="me-2 mb-2 w-100"
                                onClick={() => onEdit(item)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                className='w-100'
                                onClick={() => onDelete(item.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminTable;