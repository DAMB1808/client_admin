import { useAuthStore } from "../store/authStore.js";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    // Verificamos que useForm se ejecute correctamente
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLoginSubmit = async (data) => {
        try {
            const res = await login(data);
            if (res?.success) {
                navigate("/dashboard");
                toast.success("¡Bienvenido de nuevo!");
            }
        } catch (err) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">
            {/* Mostrar error global de Zustand si existe */}
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email o Usuario
                </label>
                <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("emailOrUsername", { required: "Campo obligatorio" })}
                />
                {errors.emailOrUsername && <span className="text-red-500 text-xs">{errors.emailOrUsername.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input
                    type="password"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("password", { required: "Contraseña obligatoria" })}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg disabled:opacity-50"
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            <p className="text-center text-sm">
                <button type="button" onClick={onForgot} className="text-main-blue hover:underline">
                    ¿Olvidaste tu contraseña?
                </button>
            </p>
        </form>
    );
};