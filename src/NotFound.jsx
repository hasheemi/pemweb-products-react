import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

function NotF() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Halaman tidak ditemukan</h2>
            <Link to="/" className="text-[#004080] hover:underline flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
            </Link>
        </div>
    );
}

export default NotF;
