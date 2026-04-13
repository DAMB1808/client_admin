import {Route, Routes} from "react-router-dom";
import { AuthPage } from " ../../features/auth/pages/AuthPage";

export const AppRoutes = ()=> {

    return(
        <Routes>
            {/* PÚBLICAS */}
            <Route path="/" element={<AuthPage />} />

        </Routes>

    );

};