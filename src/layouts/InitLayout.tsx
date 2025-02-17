import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";



export default function InitLayout() {
  return (
    <div className="w-full">
      <Header />
      <section className="min-w-full mx-auto mt-10  min-h-screen">
        <Outlet />
      </section>
      <Footer/>
    </div>
  )
}


