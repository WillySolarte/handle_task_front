import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa";
import { SiJsonwebtokens } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";


import { FaTasks } from "react-icons/fa";


export default function Presentation() {
    return (
        <div className="w-full p-10">
            <div className="shadow-2xl w-[98%] xl:w-[80%] 2xl:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 my-32">

                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <AiOutlineFundProjectionScreen className="text-5xl text-purple-700 select-none" />
                    <p className="roboto text-xl font-bold uppercase select-none">Proyectos</p>
                    <p className="text-center text-sm">Con solo registrarte podras empezar a crear tus proyectos.</p>
                </div>



                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <FaDatabase  className="text-5xl text-purple-700 select-none" />
                    <p className="roboto text-xl font-bold uppercase select-none">Datos</p>
                    <p className="text-center text-sm">Toda tu información estará segura en nuestra base de datos.</p>
                </div>

                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <FaTasks className="text-5xl text-purple-700 select-none" />
                    <p className="roboto text-xl font-bold uppercase select-none">Gestionar tareas</p>
                    <p className="text-center text-sm select-none">Puedes crear tareas y categorizarlas dependiendo tu progreso.</p>
                </div>

                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <SiJsonwebtokens  className="text-5xl text-purple-700 select-none" />
                    <p className="roboto text-xl font-bold uppercase select-none">JWT</p>
                    <p className="text-center text-sm select-none">Tu sesión segura y resguardada.</p>
                </div>

                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <FaArrowsDownToPeople  className="text-5xl text-purple-700" />
                    <p className="roboto text-xl font-bold uppercase select-none">Colaboradores</p>
                    <p className="text-center text-sm">Puedes asignar colaboradores a tus proyectos si estos estan registrados en la página.</p>
                </div>

                <div className=" w-72 h-56 flex flex-col items-center justify-evenly p-3 mx-auto">
                    <MdManageAccounts  className="text-5xl text-purple-700" />
                    <p className="roboto text-xl font-bold uppercase select-none">Fácil</p>
                    <p className="text-center text-sm">Facil de usar y compartir.</p>
                </div>

            </div>
        </div>
    )
}
