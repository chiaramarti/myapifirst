import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import SinglePost from './SinglePost';
import MyPagination from './MyPagination';
import { apiUrl } from "../costants";

const ITEMS_PER_PAGE = 3;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [activePage]); // Aggiornare i dati quando cambia la pagina attiva

    const fetchData = async () => {
        try {
            const totalArticlesResponse = await fetch(`${apiUrl}/posts`);
            const totalArticlesData = await totalArticlesResponse.json();
            const totalArticles = totalArticlesData.length;

            const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
            setTotalPages(totalPages);

            const start = (activePage - 1) * ITEMS_PER_PAGE;
            const end = activePage === totalPages ? totalArticles : activePage * ITEMS_PER_PAGE;
            const response = await fetch(`${apiUrl}/posts?_embed&per_page=${ITEMS_PER_PAGE}&offset=${start}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 ms-2">Latest Articles</h1>
            <div className="row">
                {posts.map(post => (
                    <SinglePost key={post.id} post={post} />
                ))}
            </div>
            <MyPagination totalPages={totalPages} activePage={activePage} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;

