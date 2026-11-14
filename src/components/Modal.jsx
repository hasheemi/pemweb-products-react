import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

function Modal({ isOpen, onClose, type, product }) {
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

    return (
        // Overlay Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            {/* Modal Container */}
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
                        // Tampilan Varian Hapus
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                            <span className="text-xs font-semibold text-gray-400 block mb-1">
                                ID: {product?.id || '3'}
                            </span>
                            <h3 className="text-md font-bold text-gray-800">
                                {product?.name || 'Spidol'}
                            </h3>
                            <p className="text-[#004080] font-semibold">
                                {product?.price || 'Rp8.000'}
                            </p>
                        </div>
                    ) : (
                        // Tampilan Varian Tambah / Edit (Form)
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    defaultValue={type === 'edit' ? product?.name : ''}
                                    placeholder="Contoh: Pulpen"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004080] focus:border-[#004080]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Harga (Rp)
                                </label>
                                <input
                                    type="text"
                                    defaultValue={
                                        type === 'edit'
                                            ? product?.price.replace('Rp', '').replace('.', '')
                                            : ''
                                    }
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

                {/* Footer (Actions) */}
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                        }}
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
