import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from "../costants";
import Button from 'react-bootstrap/Button';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${apiUrl}/posts/${id}?_embed`);
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    const renderAuthorAndDate = () => {
        const authorName = article._embedded.author[0].name;
        const date = new Date(article.date).toLocaleDateString();
        return (
            <p>
                <strong>Author:</strong> {authorName} | <strong>Date:</strong> {date}
            </p>
        );
    };

    return (
        <div className="container mt-5">
            <h1>{article.title.rendered}</h1>
            {article._embedded && article._embedded['wp:featuredmedia'] && (
                <img src={article._embedded['wp:featuredmedia'][0].source_url} alt={article.title.rendered} style={{ maxWidth: '100%' }} />
            )}
            <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
            {renderAuthorAndDate()}
            <Button variant="primary" href="/">Back to Home</Button>
        </div>
    );
};

export default ArticleDetail;

