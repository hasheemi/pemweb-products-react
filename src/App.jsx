import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from './components/Card';
import Modal from './components/Modal';

function App() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Pulpen', price: 'Rp5.000' },
        { id: 2, name: 'Buku Tulis', price: 'Rp12.000' },
        { id: 3, name: 'Spidol', price: 'Rp8.000' },
        { id: 4, name: 'Penggaris', price: 'Rp6.000' },
        { id: 5, name: 'Penghapus', price: 'Rp3.000' },
    ]);

    // State Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('tambah');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Handler buka modal
    const openModal = (type, product = null) => {
        setModalType(type);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
            <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8">
                {/* Section Header */}
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
                    {products.map(product => (
                        <Card
                            key={product.id}
                            product={product}
                            // Lempar fungsi ke dalam Card untuk tombol Edit & Hapus
                            onEdit={() => openModal('edit', product)}
                            onDelete={() => openModal('hapus', product)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-8 text-left text-sm text-gray-400 w-full">
                    Menampilkan {products.length} dari {products.length} produk
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
                product={selectedProduct}
            />
        </div>
    );
}

export default App;
