import { useState } from "react";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);

    return(
        <div className="w-full max-w-xl bg-white 
        rounded-xl shadow-lg border border-gray-200 p-6 
        md: p-10">
            
            <div className="flex justify-center mb-6">
                <img 
                src="src/assets/img/kinal_sport.png"
                alt="Kinal Sport"
                className="h-20 w-auto"
                />

            </div>

            <div className=" text-2xl lg:text-3xl font-bold
             text-gray-900 mb-2">

                <h1 className=" text-2xl lg:text-3xl
                font-bold text-gray-900 mb-2">

                    {isForgot
                    ? "Recuperar contraseña"
                    :isLogin
                    ? "Bienvenido de nuevo"
                    : "Crear cuenta"
                    }
                </h1>

                <p className="text-gray-600 text-base max-w-md mx-auto">
                    {ifForgot
                        ? "Ingresa tu correo de administrador  de Kinal Sports"
                        : "Registrate como administrador de Kinal sports"
                    }
                </p>

                {isForgot
                ? "Formulario"
                :

                }
             </div>
        </div>
    );
};

export { AuthPage };