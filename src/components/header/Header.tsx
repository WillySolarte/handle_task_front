import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userExist } from "../../services/authService";

export default function Header() {


  const [exit, setExist] = useState<boolean>(false);

  useEffect(() => {
    setExist(userExist())
  }, [exit])

  function closeSession() {
    localStorage.removeItem('AUTH_TOKEN')
    setExist(false)
    window.location.reload();
  }

  return (
    <header className="w-full h-32 shadow-xl flex justify-between items-center px-10">
      <Link to={'/'} className="text-5xl font-bold"><span className="text-purple-700">Project</span> Manager </Link>
      {exit ? (

        <div className="flex space-x-3">
            <Link className="w-36 h-8 flex justify-center items-center text-white bg-black border-2 border-black font-bold text-sm hover:bg-white hover:text-black rounded-md" to={'/project/dashboard'}>Mis proyectos</Link>
            <button onClick={closeSession} type="button" className="w-20 h-8 flex justify-center items-center text-white bg-purple-700 border-2 border-purple-700 font-bold text-sm hover:bg-white hover:text-purple-700 rounded-md">Salir</button>


        </div>

      ) : (

        <Link className="w-20 h-8 flex justify-center items-center text-white bg-purple-700 border-2 border-purple-700 font-bold text-sm hover:bg-white hover:text-purple-700 rounded-md" to={'/user/login'}>Ingresar</Link>

      )}
    </header>
  )
}
