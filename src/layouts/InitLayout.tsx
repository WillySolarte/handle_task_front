import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";



export default function InitLayout() {
  return (
    <div className="w-full">
      <Header />
      <section className="max-w-screen-2xl mx-auto mt-10 p-5 min-h-screen">
        <Outlet />
      </section>
      <Footer/>
    </div>
  )
}


