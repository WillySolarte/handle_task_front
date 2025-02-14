
import { Link } from "react-router-dom";

import { CiWarning } from "react-icons/ci";


export default function DefaultErrorView() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
        <div className="bg-white border-4 border-dashed border-black rounded-lg p-6 w-[350px] md:w-[450px] flex flex-col">
            <div className="flex justify-evenly items-center">
              <CiWarning className="text-8xl text-red-600 select-none font-bold" />
              <p className="text-5xl poppins font-bold text-red-600 text-center my-3 select-none">Error 404</p>
            </div>
            
            <div className="flex justify-center items-center my-7 lg:justify-evenly">
              <p className="text-base md:text-xl my-3 poppins text-black select-none text-center w-1/2 md:w-2/3 lg:w-52">La página a la que estas intentando ingresar no existe</p>
              <Link className="w-1/2 my-4 bg-blue-700 md:w-1/3 lg:w-32 h-8 flex justify-center items-center rounded-lg text-white font-bold hover:opacity-[0.5]" to={'/'}>Inicio</Link>
            </div>
        </div>

    </div>
  )
}
