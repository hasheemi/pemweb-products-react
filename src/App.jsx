import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useOutletContext } from 'react-router';
import Card from './components/Card';
import Modal from './components/Modal';

function App() {
    const { products, loading, error, refresh, handleSave, handleDelete } = useOutletContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('tambah');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (type, product = null) => {
        setModalType(type);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
            <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 w-full">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Manajemen Produk
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola daftar produk dan harga dalam satu tempat.
                        </p>
                    </div>
                    <button
                        onClick={() => openModal('tambah')}
                        className="flex items-center justify-center gap-2 bg-[#004080] hover:bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Produk
                    </button>
                </div>

                {/* Search & Info Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 w-full">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004080] focus:border-[#004080] sm:text-sm transition-all"
                            placeholder="Cari nama produk..."
                        />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                        {products.length} produk
                    </span>
                </div>

                {/* Product List */}
                <div className="flex flex-wrap gap-4 w-full">
                    {loading ? (
                        <div className="w-full text-center py-10 text-gray-500">
                            Memuat produk...
                        </div>
                    ) : error ? (
                        <div className="w-full text-center py-10 text-red-500">
                            Gagal memuat produk: {error}
                            <button
                                onClick={refresh}
                                className="block mx-auto mt-3 px-4 py-2 bg-[#004080] text-white rounded-md text-sm"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    ) : products.length > 0 ? (
                        products.map(product => (
                            <Card
                                key={product.id}
                                product={product}
                                onEdit={() => openModal('edit', product)}
                                onDelete={() => openModal('hapus', product)}
                            />
                        ))
                    ) : (
                        <div className="w-full text-center py-10 text-gray-500">
                            Tidak ada produk. Silakan tambah produk baru.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-left text-sm text-gray-400 w-full">
                    Menampilkan {products.length} produk
                </div>
            </main>

            {/* Render Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
                product={selectedProduct}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
