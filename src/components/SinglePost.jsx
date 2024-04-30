import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SinglePost = ({ post, onDelete }) => {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            if (post._links && post._links['wp:featuredmedia']) {
                const imgUrl = post._links['wp:featuredmedia'][0].href;
                try {
                    const response = await fetch(imgUrl);
                    const data = await response.json();
                    setImgSrc(data.source_url);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImage();
    }, [post]);

    const handleDelete = () => {
        onDelete(post.id);
    };

    return (
        <div className="col-md-4 mb-4">
            <Card className="h-100">
                {imgSrc && (
                    <div className='img-wrapper'>
                        <Card.Img
                            variant="top"
                            src={imgSrc}
                            className="w-100 h-100 rounded-0"
                        />
                    </div>
                )}
                <Card.Body>
                    <Card.Title>{post.title.rendered}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <Link to={`/article/${post.id}`} className="btn btn-primary me-4">Read more</Link>
                    <Button variant="warning" className="me-2">Edit</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SinglePost;

