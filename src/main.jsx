import { StrictMode, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import './index.css';
import App from './App.jsx';
import About from './About.jsx';
import Detail from './Detail.jsx';
import NotF from './NotFound.jsx';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api.js';

function RootLayout() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    // handle save edit and add (via API)
    const handleSave = async (type, formData, id) => {
        const payload = { name: formData.name, price: parseInt(formData.price, 10) };
        if (type === 'tambah') {
            await createProduct(payload);
        } else if (type === 'edit') {
            await updateProduct(id, payload);
        }
        await refresh();
    };

    const handleDelete = async id => {
        await deleteProduct(id);
        await refresh();
    };

    return (
        <Outlet
            context={{ products, loading, error, refresh, handleSave, handleDelete }}
        />
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="*" element={<NotF />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
