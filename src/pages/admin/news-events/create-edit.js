import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { 
  Bold, Italic, List, ListOrdered, 
  Image as ImageIcon, Link, Undo, Redo 
} from 'lucide-react';

export default function CreateEditPage({ post, onClose }) {
  const [title, setTitle] = useState(post?.title || '');
  const [type, setType] = useState(post?.type || 'Event');
  const [date, setDate] = useState(post?.date || '');
  const [image, setImage] = useState(post?.image || '');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: post?.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      title,
      type,
      date,
      image,
      content: editor.getHTML(),
      dateStr: new Date(date).toISOString().split('T')[0],
    };

    const url = post 
      ? `/api/admin/news-events/${post.slug}`
      : '/api/admin/news-events';
    
    const response = await fetch(url, {
      method: post ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      onClose();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {post ? 'Edit Post' : 'Create New Post'}
        </h1>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Event">Event</option>
                <option value="News">News</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="border rounded-lg mb-4">
          <div className="flex gap-2 p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-secondary' : ''}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-secondary' : ''}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const url = window.prompt('Enter image URL:');
                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
          
          <EditorContent editor={editor} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {post ? 'Update' : 'Create'} Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}