import { Pencil, Trash2 } from 'lucide-react';

function Card(props) {
    return (
        <div
            className=" bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between 
 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.66rem)] lg:w-[calc(25%-0.75rem)]  "
        >
            <div>
                <span className="text-xs font-semibold text-gray-400 mb-1 block">
                    ID: {props.product.id}
                </span>
                <h3 className="text-lg font-bold text-gray-800">{props.product.name}</h3>
                <p className="text-[#004080] font-semibold mt-1">{props.product.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-5">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#004080] text-[#004080] rounded text-sm font-medium hover:bg-blue-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 rounded text-sm font-medium hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                </button>
            </div>
        </div>
    );
}

export default Card;
