import { useEffect, useState } from "react";
import { useFieldsStore } from "../../users/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";
import { showError } from "../../../shared/utils/toast";
import { FieldModal } from "./FieldModal";

import placeholderImg from "../../../assets/img/avatarDefault.png";

export const Fields = () => {
  const { fields, loading, error, getFields, deleteField } = useFieldsStore();
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

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-main-blue">
          Gestión de Canchas
        </h1>
      </div>

      {/* GRID */}
      {!loading && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {safeFields.length === 0 ? (
            <p className="text-gray-500">No hay campos disponibles</p>
          ) : (
            safeFields.map((field) => (
              <div key={field._id} className="bg-white rounded-xl shadow-md overflow-hidden">

                {/* IMAGEN CORREGIDA */}
                <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                  <img
                    src={field.photo || placeholderImg}
                    alt={field.fieldName}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = placeholderImg;
                    }}
                  />
                </div>

                {/* CONTENIDO */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-main-blue">
                    {field.fieldName}
                  </h2>

                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 text-xs bg-blue-100">
                      {field.capacity?.replace("_", " ")}
                    </span>

                    <span className="px-3 py-1 text-xs bg-green-100">
                      Q{field.pricePerHour}/hora
                    </span>
                  </div>

                  {/* BOTONES */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => {
                        setSelectedField(field);
                        setOpenModal(true);
                      }}
                      className="flex-1 py-2 bg-main-blue text-white rounded"
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
                      className="flex-1 py-2 bg-red-600 text-white rounded"
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

      {/* MODAL */}
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