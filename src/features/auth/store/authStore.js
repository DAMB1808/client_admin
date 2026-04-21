import { create } from "zustand";
import { persist } from "zustand/middleware";

import { 
    login as loginRequest
} from "../../../shared/Api/api.js";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user:null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "DAMIN_ROLE";

                if(token && !isAdmin){
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No tienes permiso para acceder como administrador"
                    })
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            login: async ({emailOrUsername, password})=>{

                const { data } = await loginRequest({emailOrUsername, password})

                // Solo administradores pueden iniciar sesion en cliente-admin
                const role = data?.userDerails?.role;
                if(role !== "ADMIN_ROLE"){
                    const message = "No tienes permisos para acceder como administrador";

                    set({
                        user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                    loading: false,
                    error: message,
                    });

                    showError(message);
                    return {succes: false, error: message};
                }

                set(
                    {
                        user: data.userDetails,
                        token: data.accesToken || data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn || data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                    }
                )
            },
        }), 
        {name: "auth-store"}
    )
);