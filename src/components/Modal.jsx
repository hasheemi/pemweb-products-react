import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { formatPrice } from '../utils/format.js';

function Modal({ isOpen, onClose, type, product, onSave, onDelete }) {
    const [namaProduk, setNamaProduk] = useState('');
    const [harga, setHarga] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (type === 'edit' && product) {
                setNamaProduk(product.name);
                setHarga(product.price);
            } else {
                setNamaProduk('');
                setHarga('');
            }
        }
    }, [isOpen, type, product]);

    if (!isOpen) return null;

    const modalConfig = {
        tambah: {
            title: 'Tambah Produk',
            desc: 'Masukkan informasi produk baru.',
            btnText: 'Simpan Produk',
            btnClass: 'bg-[#004080] hover:bg-blue-800 text-white',
        },
        edit: {
            title: 'Edit Produk',
            desc: 'Perbarui informasi produk yang dipilih.',
            btnText: 'Simpan Perubahan',
            btnClass: 'bg-[#004080] hover:bg-blue-800 text-white',
        },
        hapus: {
            title: 'Hapus Produk?',
            desc: 'Produk yang dihapus tidak dapat dikembalikan.',
            btnText: 'Hapus Produk',
            btnClass: 'bg-red-500 hover:bg-red-600 text-white',
        },
    };

    const config = modalConfig[type];

    // handle submit
    const handleSubmit = e => {
        e.preventDefault();

        if (type === 'hapus') {
            onDelete(product.id);
            onClose();
            return;
        }

        if (!namaProduk || !harga) {
            alert('Nama dan Harga harus diisi!');
            return;
        }

        // Kirim data ke App (harga dikirim sebagai angka, API menyimpan Int)
        onSave(type, { name: namaProduk, price: parseInt(harga, 10) }, product?.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        {type === 'hapus' && (
                            <div className="p-2 bg-red-50 rounded-full">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
                            <p className="text-sm text-gray-500 mt-0.5">{config.desc}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {type === 'hapus' ? (
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 block mb-1">
                                ID: {product?.id}
                            </span>
                            <h3 className="text-md font-bold text-gray-800">{product?.name}</h3>
                            <p className="text-[#004080] font-semibold">{formatPrice(product?.price)}</p>
                        </div>
                    ) : (
                        <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    value={namaProduk}
                                    onChange={e => setNamaProduk(e.target.value)}
                                    placeholder="Contoh: Pulpen"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004080] focus:border-[#004080]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Harga (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={harga}
                                    onChange={e => setHarga(e.target.value)}
                                    placeholder="Contoh: 5000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004080] focus:border-[#004080]"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Harga harus lebih dari 0.
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer tombol */}
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>

                    <button
                        type={type === 'hapus' ? 'button' : 'submit'}
                        form={type === 'hapus' ? undefined : 'product-form'}
                        onClick={type === 'hapus' ? handleSubmit : undefined}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${config.btnClass}`}
                    >
                        {config.btnText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
