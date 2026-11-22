import { useParams, useNavigate, Link, useOutletContext } from 'react-router';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Modal from './components/Modal';
import { formatPrice } from './utils/format.js';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { products, handleSave, handleDelete } = useOutletContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('edit');

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Produk tidak ditemukan</h2>
                <Link to="/" className="text-[#004080] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800 p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#004080] mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                </Link>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-6 border-b pb-4">
                        <div>
                            <span className="text-sm font-semibold text-gray-400">
                                ID Produk: {product.id}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 mt-1">
                                {product.name}
                            </h1>
                            <p className="text-xl text-[#004080] font-semibold mt-2">
                                {formatPrice(product.price)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setModalType('edit');
                                    setIsModalOpen(true);
                                }}
                                className="p-2 border border-[#004080] text-[#004080] rounded hover:bg-blue-50"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setModalType('hapus');
                                    setIsModalOpen(true);
                                }}
                                className="p-2 border border-red-200 text-red-500 rounded hover:bg-red-50"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
                product={product}
                onSave={(type, data, productId) => {
                    handleSave(type, data, productId);
                }}
                onDelete={productId => {
                    handleDelete(productId);
                    navigate('/');
                }}
            />
        </div>
    );
}

export default Detail;
