import { create } from "zustand";
import {
  getFields as getFieldsRequest,
  createField as createFieldRequest,
  updateField as _updateFieldRequest,
  deleteField as _deleteFieldRequest,
  getAllReservations as getAllReservationsRequest,
  confirmReservation as confirmReservationRequest,
} from "../../../shared/api";

export const useFieldsStore = create((set, get) => ({
  fields: [],
  reservations: [],
  loading: false,
  error: null,

  getFields: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getFieldsRequest();

      const data = response?.data?.data;

      set({
        fields: Array.isArray(data) ? data : [],
        loading: false,
      });

    } catch (error) {
      set({
        fields: [],
        loading: false,
        error:
          error.code === "ERR_NETWORK"
            ? "Error de conexión con el servidor"
            : error.response?.data?.message || "Error al obtener canchas",
      });
    }
  },

  createField: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await createFieldRequest(formData);

      const newField = response?.data?.data;

      set({
        fields: newField
          ? [newField, ...get().fields]
          : get().fields,
        loading: false,
      });

    } catch (error) {
      set({
        loading: false,
        error:
          error.code === "ERR_NETWORK"
            ? "Error de conexión con el servidor"
            : error.response?.data?.message || "Error al crear campo",
      });
    }
  },

  getAllReservations: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getAllReservationsRequest();

      const data = response?.data?.data;

      set({
        reservations: Array.isArray(data) ? data : [],
        loading: false,
      });

    } catch (error) {
      set({
        reservations: [],
        error:
          error.code === "ERR_NETWORK"
            ? "Error de conexión con el servidor"
            : error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },

  confirmReservation: async (id) => {
    try {
      set({ loading: true, error: null });

      await confirmReservationRequest(id);

      await get().getAllReservations();

      set({ loading: false });

    } catch (error) {
      set({
        loading: false,
        error:
          error.code === "ERR_NETWORK"
            ? "Error de conexión con el servidor"
            : error.response?.data?.message || "Error al confirmar reservación",
      });
    }
  },
}));