import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/header/Header";
import { ToastContainer } from "react-toastify"
import Footer from "../components/footer/Footer";

export default function ProyectLayout() {
    const { data, isError, isLoading } = useAuth()
    if (isLoading) {
        return 'Cargando ...'
    }
    if (isError) {
        return <Navigate to={'/'} />
    }
    if (data) return (
        <div>
            <Header />
            <section className="max-w-screen-2xl mx-auto mt-10 p-5 min-h-screen">

                <Outlet />
            </section>
            <Footer/>
            <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        </div>
    )
}
