import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditPostForm = ({ editedPost, onSubmit, onClose }) => {
    const [editedTitle, setEditedTitle] = useState(editedPost.title.rendered);
    const [editedContent, setEditedContent] = useState(editedPost.content.rendered);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedTitle, editedContent);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
            <Button variant="secondary" onClick={onClose} className="ms-2">
                Cancel
            </Button>
        </Form>
    );
};

export default EditPostForm;


