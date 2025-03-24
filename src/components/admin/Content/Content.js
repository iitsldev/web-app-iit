import { Button } from 'react-bootstrap';
import AdminTable from '../adminTable/AdminTable';
import AdminForm from '../adminForm/AdminForm';

export default function Content({
    activeSection,
    items,
    loading,
    onAddNew,
    onCleanup,
    onEdit,
    onDelete,
    showForm,
    setShowForm,
    editItem,
    onFormSubmit,
    modelFields
}) {
    return (
        <>
            <div className="content">
                <Button variant="primary" className="m-3" onClick={onAddNew}>
                    Add New
                </Button>
                <Button variant="danger" className="m-3" onClick={onCleanup}>
                    Clean Up Unused Images
                </Button>
            </div>

            <AdminTable
                items={items[activeSection] || []}
                fields={modelFields[activeSection]}
                onEdit={onEdit}
                onDelete={onDelete}
                loading={loading}
            />
            <AdminForm
                show={showForm}
                onHide={() => setShowForm(false)}
                onSubmit={onFormSubmit}
                initialData={editItem}
                fields={modelFields[activeSection]}
            />
        </>
    );
}