import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";



export default function InitLayout() {
  return (
    <div className="w-full">
        <Header/>
        <div>
            <Outlet/>
        </div>
        
    </div>
  )
}


