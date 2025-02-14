import { useForm } from "react-hook-form";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { TLoginForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { toast } from "react-toastify";
import { useAppStore } from "../../store/useAppStore";
import { TResponseLogin } from "../../schemas";

export default function LoginUserView() {

    const initialValues: TLoginForm = {
        email: '',
        password: ''
    }
    const {changeSpinner} = useAppStore()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm<TLoginForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
            changeSpinner(false)
        },
        onSuccess: (data:TResponseLogin) => {
            
            if(data.state === 'error'){
                if(data.msg.includes('usuario')){
                    setError("email", { type: "manual", message: data.msg, });
                }
                else{
                    setError("password", { type: "manual", message: data.msg, });
                }
            }
            else{
                localStorage.setItem('AUTH_TOKEN', data.data!)
                navigate('/')
            }
            changeSpinner(false)

        }
    })
    
    function handleLogin(formData: TLoginForm){
        changeSpinner(true)
        mutate(formData)
    }

    return (
        <div className="w-[390px] h-[400px] py-2 border border-purple-700 rounded-lg flex flex-col justify-evenly items-center bg-white">

            <Link to={'/'} className={`font-bold text-3xl my-4 select-none`}> <span className="text-purple-700">Project</span> Manager </Link>
            <form className="w-[70%]" onSubmit={handleSubmit(handleLogin)} noValidate>
                
                <div className="flex flex-col my-2">
                    <div className="flex items-center">
                        <label className="bg-purple-700 rounded-l-md w-7 h-8 flex justify-center items-center text-white" htmlFor="email"> <IoMailOutline /> </label>
                        <input className="w-full h-8 pl-2 focus:outline-none bg-gray-100 border rounded-r-md text-sm" type="email" id="email" placeholder="Email"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}

                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.email ? `${errors.email.message}` : ''} </p>
                </div>
                <div className="flex flex-col my-2">
                    <div className="flex items-center">
                        <label className="bg-purple-700 rounded-l-md w-7 h-8 flex justify-center items-center text-white" htmlFor="password"> <IoLockClosedOutline /> </label>
                        <input className="w-full h-8 pl-2 focus:outline-none bg-gray-100 border rounded-r-md text-sm" type='password' id="password" placeholder="Contraseña"
                            {...register("password", {
                                required: "El Password es obligatorio",
                                minLength: {
                                    value: 7,
                                    message: "Debe ser mínimo de 7 caracteres",
                                }
                                
                            })}
                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.password ? `${errors.password.message}` : ''} </p>
                </div>
                
                
                <button type="submit" className="bg-purple-800 text-white w-full my-2 h-9 rounded-md hover:bg-purple-600 select-none">Ingresar</button>

                <hr className="border border-gray-200 my-6" />
                <div className="flex justify-between">
                    <Link to={'/user/register'} className="text-sm hover:text-red-700 hover:underline select-none" > Registrate</Link>
                    <Link to={'/'} className="text-sm hover:text-red-700 hover:underline select-none" > Olvidé mi contraseña </Link>
                </div>

            </form>
        </div>
    )
}
