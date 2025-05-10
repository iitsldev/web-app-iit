import { useState, useEffect } from 'react';
import { Form, Button, Modal, ButtonGroup } from 'react-bootstrap';
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaHeading,
    FaListUl,
    FaListOl,
    FaUpload
} from 'react-icons/fa';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import styles from './AdminForm.module.css';

const AdminForm = ({ show, onHide, onSubmit, initialData, fields }) => {
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
        ],
        content: initialData?.description || '',
        onUpdate: ({ editor }) => {
            setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
        },
    });

    useEffect(() => {
        const defaultData = {};
        fields.forEach((field) => {
            defaultData[field.key] = initialData?.[field.key] || '';
        });
        setFormData(defaultData);
        if (editor && initialData?.description) {
            editor.commands.setContent(initialData.description);
        }
    }, [initialData, editor, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Upload failed');
            }
            const { filePath } = await res.json();
            setFormData((prev) => ({ ...prev, image: filePath }));
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onHide();
    };

    const renderRichTextToolbar = () => {
        if (!editor) return null;

        return (
            <ButtonGroup className={styles.tiptapToolbar}>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FaBold />
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FaItalic />
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('strike') ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <FaStrikethrough />
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <FaHeading />
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <FaListUl />
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <FaListOl />
                </Button>
            </ButtonGroup>
        );
    };

    if (!editor) return null;

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            dialogClassName={styles.formModal}
        >
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>
                    {initialData ? 'Edit Item' : 'Add Item'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.formContainer}>
                <Form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <Form.Group
                            key={field.key}
                            className="mb-3"
                            controlId={field.key}
                        >
                            <Form.Label>{field.label}</Form.Label>
                            {field.type === 'richtext' ? (
                                <div className={styles.tiptapContainer}>
                                    {renderRichTextToolbar()}
                                    <div className={styles.tiptapEditor}>
                                        <EditorContent editor={editor} />
                                    </div>
                                </div>
                            ) : field.type === 'datetime' ? (
                                <Form.Control
                                    type="datetime-local"
                                    name={field.key}
                                    value={formData[field.key] ? new Date(formData[field.key]).toISOString().slice(0, 16) : ''}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            ) : field.type === 'file' ? (
                                <div className={styles.fileUploadGroup}>
                                    <Form.Control
                                        type="file"
                                        name={field.key}
                                        onChange={handleFileUpload}
                                        accept="image/jpeg,image/jpg,image/png"
                                        disabled={uploading}
                                        className="mb-2"
                                    />
                                    {formData[field.key] && (
                                        <img
                                            src={formData[field.key]}
                                            alt="Preview"
                                            className={styles.imagePreview}
                                        />
                                    )}
                                    {uploading && (
                                        <div className={styles.uploadProgress}>
                                            Uploading...
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Form.Control
                                    type={field.type || 'text'}
                                    name={field.key}
                                    value={formData[field.key] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            )}
                        </Form.Group>
                    ))}
                    <div className={styles.actionButtons}>
                        <Button
                            variant="secondary"
                            onClick={onHide}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={uploading}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AdminForm;