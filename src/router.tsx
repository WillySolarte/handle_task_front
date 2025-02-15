import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitLayout from "./layouts/InitLayout";
import InitView from "./views/InitView";
import AuthLayout from "./layouts/AuthLayout";
import RegisterUserView from "./views/auth/RegisterUserView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import DefaultErrorView from "./views/DefaultErrorView";
import LoginUserView from "./views/auth/LoginUserView";
import ProyectLayout from "./layouts/ProyectLayout";
import DashBoardView from "./views/project/DashBoardView";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<InitLayout />} >
          <Route path="/" element={<InitView />} index />
          

        </Route>
        <Route element={<AuthLayout />} >
          <Route path='/user/register' element={<RegisterUserView />} />
          <Route path='/user/confirmation/:token' element={<ConfirmAccountView/>} />
          <Route path='/user/login' element={<LoginUserView/>} />
          
        </Route>
        <Route element={<ProyectLayout />} >
            <Route path='/project/dashboard' element={<DashBoardView />} index />
          
          
          </Route>

        

        <Route path='*' element={ <DefaultErrorView/> } />

      </Routes>


    </BrowserRouter>
  )
}

