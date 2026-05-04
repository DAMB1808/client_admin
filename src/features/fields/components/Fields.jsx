import { useState } from "react";
import { FieldModal } from "./FieldModal";

export const Fields = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Campos</h1>

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Nuevo Campo
                </button>
            </div>

            {/* Aquí iría tu lista de campos */}
            <div className="bg-gray-100 p-4 rounded-lg">
                No hay campos aún
            </div>

            <FieldModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};