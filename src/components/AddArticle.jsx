import React, { useState } from 'react';
import { apiUrl } from "../constants";

function AddArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // Stato per l'immagine
    const [excerpt, setExcerpt] = useState('');
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Seleziona il primo file caricato dall'input file
    };

    const handleExcerptChange = (e) => {
        setExcerpt(e.target.value);
    };

    const handleAddArticle = async (e) => {
        e.preventDefault();
        try {
            // Carica l'immagine per ottenere l'ID
            const imageData = new FormData();
            imageData.append('file', image);
            const authString = "admin:7wd6 dZ7c 6oPc 6sxJ h1l2 zjbU";
            const encodedAuthString = btoa(authString);
            const imageResponse = await fetch(`${apiUrl}/media`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${encodedAuthString}`,
                },
                body: imageData,
            });

            if (!imageResponse.ok) {
                throw new Error("Errore durante il caricamento dell'immagine");
            }

            const imageJson = await imageResponse.json();
            const imageId = imageJson.id;

            // Creare il nuovo articolo con l'ID dell'immagine
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('excerpt', excerpt);
            formData.append('featured_media', imageId); // Aggiungi l'ID dell'immagine come immagine di copertina
            formData.append('status', 'publish'); // Aggiungi lo stato "publish"

            const response = await fetch(`${apiUrl}/posts`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${encodedAuthString}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Errore durante l'inserimento del nuovo articolo");
            }

            const newArticle = await response.json();
            console.log("Nuovo articolo aggiunto:", newArticle);
            setTitle('');
            setContent('');
            setImage(null); // Resetta lo stato dell'immagine
            setExcerpt('');
            setError('');
        } catch (error) {
            console.error(error);
            setError("Errore durante l'inserimento del nuovo articolo");
        }
    };

    return (
        <div>
            <h1 className='mx-4'>Add New Article</h1>
            <form onSubmit={handleAddArticle} className='m-4'>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea className="form-control" value={content} onChange={handleContentChange} />
                </div>
                <div className="form-group my-2">
                    <label>Image: </label>
                    <input type="file" className="form-control-file mx-2" onChange={handleImageChange} />
                </div>
                <div className="form-group">
                    <label>Excerpt:</label>
                    <textarea className="form-control" value={excerpt} onChange={handleExcerptChange} />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" className="btn btn-primary">Publish</button>
            </form>
        </div>
    );
}

export default AddArticle;