import React, { useState, useEffect } from 'react';
import SinglePost from './SinglePost';
import MyPagination from './MyPagination';
import { apiUrl } from "../costants";

const ITEMS_PER_PAGE = 3;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, [activePage, searchTerm]); 

    const fetchData = async () => {
        try {
            let url = `${apiUrl}/posts?_embed&per_page=${ITEMS_PER_PAGE}&page=${activePage}`;
            if (searchTerm) {
                url += `&search=${searchTerm}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);

            const totalResponse = await fetch(`${apiUrl}/posts`);
            const totalData = await totalResponse.json();
            const totalArticles = totalData.length;
            const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa('admin:7wd6 dZ7c 6oPc 6sxJ h1l2 zjbU'),
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Rimuovi il post eliminato dall'elenco dei post
                setPosts(posts.filter(post => post.id !== postId));
            } else {
                console.error('Errore durante l\'eliminazione del post:', response.statusText);
            }
        } catch (error) {
            console.error('Errore durante la richiesta di eliminazione:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className='col-md-8 pb-1'><h1>Latest Articles</h1></div>
                {/* Barra di ricerca */}
                <div className="col-md-4 pt-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                {posts.map(post => (
                    <SinglePost key={post.id} post={post} onDelete={handleDelete} />
                ))}
            </div>
            <MyPagination totalPages={totalPages} activePage={activePage} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;


