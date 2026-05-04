import { useEffect, useState } from "react";
import { useFieldsStore } from "../../users/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";
import { showError } from "../../../shared/utils/toast";
import { FieldModal } from "./FieldModal";

export const Fields = () => {
  const {
    fields,
    loading,
    error,
    getFields,
    deleteField,
  } = useFieldsStore();

  const { openConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    getFields();
  }, [getFields]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  const safeFields = Array.isArray(fields) ? fields : [];

  return (
    <div className="p-4">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">
            Gestión de Canchas
          </h1>
          <p className="text-gray-500 text-sm">
            Administra las canchas registradas
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedField(null);
            setOpenModal(true);
          }}
          className="bg-main-blue px-4 py-2 rounded text-white"
        >
          + Agregar Campo
        </button>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500">
          Cargando campos...
        </div>
      )}

      {!loading && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {safeFields.length === 0 ? (
            <p className="text-gray-500">No hay campos disponibles</p>
          ) : (
            safeFields.map((field) => (
              <div key={field._id} className="bg-white rounded-xl shadow-md">

                <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                  <img
                    src={field.photo || "https://via.placeholder.com/300x200"}
                    alt={field.fieldName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold">
                    {field.fieldName}
                  </h2>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-3 py-1 text-xs bg-blue-100">
                      {field.capacity?.replace("_", " ")}
                    </span>

                    <span className="px-3 py-1 text-xs bg-green-100">
                      Q{field.pricePerHour}/hora
                    </span>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => {
                        setSelectedField(field);
                        setOpenModal(true);
                      }}
                      className="flex-1 py-2 bg-blue-600 text-white"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        openConfirm({
                          title: "Eliminar campo",
                          message: `¿Eliminar ${field.fieldName}?`,
                          onConfirm: () => deleteField(field._id),
                        })
                      }
                      className="flex-1 py-2 bg-red-600 text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}

        </div>
      )}

      <FieldModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedField(null);
        }}
        field={selectedField}
      />
    </div>
  );
};