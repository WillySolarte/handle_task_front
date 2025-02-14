import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppStore } from "../store/useAppStore"
import Spinner from "../components/ui/Spinner"

export default function AuthLayout() {

  const {spinner} = useAppStore()
  return (
    <div className="imgPrimary h-screen flex justify-center items-center bg-gray-100">

      {spinner && (
        <div className="absolute z-10 w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <Outlet/>

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  )
}
