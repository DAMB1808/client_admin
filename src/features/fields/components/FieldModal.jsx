import { useState } from "react";

export const FieldModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        capacity: "",
        pricePerHour: "",
        description: "",
        photo: null,
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFile = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit?.(formData); // enviar datos al padre
        onClose?.(); // cerrar modal
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{
                        background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                    }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">Nuevo Campo</h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Completa la información de la cancha
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto">

                    {/* PREVIEW */}
                    <div className="flex justify-center">
                        <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden">

                            {formData.photo ? (
                                <img
                                    src={URL.createObjectURL(formData.photo)}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">Sin imagen</span>
                            )}

                        </div>
                    </div>

                    {/* INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Nombre */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold">Nombre</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border"
                                placeholder="Ej. Cancha Central"
                            />
                        </div>

                        {/* Tipo */}
                        <div>
                            <label className="text-sm font-semibold">Tipo</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border"
                            >
                                <option value="">Seleccione</option>
                                <option value="sintetica">Sintética</option>
                                <option value="concreto">Concreto</option>
                                <option value="natural">Natural</option>
                            </select>
                        </div>

                        {/* Capacidad */}
                        <div>
                            <label className="text-sm font-semibold">Capacidad</label>
                            <select
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border"
                            >
                                <option value="">Seleccione</option>
                                <option value="5">Fútbol 5</option>
                                <option value="7">Fútbol 7</option>
                                <option value="11">Fútbol 11</option>
                            </select>
                        </div>

                        {/* Precio */}
                        <div>
                            <label className="text-sm font-semibold">Precio</label>
                            <input
                                type="number"
                                name="pricePerHour"
                                value={formData.pricePerHour}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border"
                                placeholder="Q100"
                            />
                        </div>

                        {/* Descripción */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border"
                                placeholder="Detalles..."
                            />
                        </div>

                        {/* Imagen */}
                        <div className="md:col-span-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4 border-t">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 text-white rounded-lg"
                            style={{
                                background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                            }}
                        >
                            Crear campo
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};