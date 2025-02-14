import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { TRegisterForm } from "../../types";
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { createAccount } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RegisterUserView() {

    const initialValues: TRegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
    const [hidePassword, setHidePassord] = useState(true)
    const {changeSpinner} = useAppStore()
    
    function handleHidePassword() {
        setHidePassord(!hidePassword)
    }


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<TRegisterForm>({ defaultValues: initialValues });

    const password = watch("password");

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {

            toast.error(error.message)
            changeSpinner(false)
        },
        onSuccess: (data) => {
            
            reset()
            changeSpinner(false)
            toast.success(data?.msg)
        }

    })

    const handleRegister = async (formData: TRegisterForm) => {

        changeSpinner(true)
        mutate(formData)

    };



    return (
        <div className="w-[390px] h-[600px] py-2 border border-purple-700 rounded-lg flex flex-col justify-evenly items-center bg-white">

            <Link to={'/'} className={`font-bold text-3xl my-4 select-none`}> <span className="text-purple-700">Project</span> Manager </Link>
            <form className="w-[70%]" onSubmit={handleSubmit(handleRegister)} noValidate >
                <div className="flex flex-col my-2">
                    <div className="flex items-center">
                        <label className="bg-purple-700 rounded-l-md w-7 h-8 flex justify-center items-center text-white" htmlFor="name"> <CiUser /> </label>
                        <input className="w-full h-8 pl-2 focus:outline-none bg-gray-100 border rounded-r-md text-sm" type="text" id="name" placeholder="Nombre"
                            {...register("name", {
                                required: "El nombre es obligatorio",

                            })}

                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.name ? `${errors.name.message}` : ''} </p>
                </div>
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
                        <input className="w-full h-8 pl-2 focus:outline-none bg-gray-100 border rounded-r-md text-sm" type={hidePassword ? 'password' : 'text'} id="password" placeholder="Contraseña"
                            {...register("password", {
                                required: "El Password es obligatorio",
                                minLength: {
                                    value: 7,
                                    message: "Debe ser mínimo de 7 caracteres",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#+?¿¡$%^&*/-])/,
                                    message: "Mayúscula, minúscula y carácter especial",
                                },
                            })}
                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.password ? `${errors.password.message}` : ''} </p>
                </div>
                <div className="flex flex-col my-2">
                    <div className="flex items-center">
                        <label className="bg-purple-700 rounded-l-md w-7 h-8 flex justify-center items-center text-white" htmlFor="password_confirmation"> <IoLockClosedOutline /> </label>
                        <input type="password" id="" placeholder="Confirmar contraseña" className="w-full h-8 pl-2 focus:outline-none bg-gray-100 border rounded-r-md text-sm"
                            {...register("password_confirmation", {
                                required: "Debe repetir la constraseña",
                                validate: (value) => value === password || "Los Passwords no son iguales",
                            })}
                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.password_confirmation ? `${errors.password_confirmation.message}` : ''} </p>

                </div>
                <div className="flex items-center my-3">
                    <label className="text-sm mr-2 text-gray-400 select-none hover:underline" htmlFor="hide">Ver contraseña</label>
                    <input onChange={handleHidePassword} type="checkbox" id="hide" className="" />
                </div>
                <button type="submit"  className="bg-purple-800 text-white w-full my-2 h-9 rounded-md hover:bg-purple-600 select-none">Registrar</button>

                <hr className="border border-gray-200 my-6" />
                <div className="flex justify-between">
                    <Link to={'/user/login'} className="text-sm hover:text-red-700 hover:underline select-none" > Ingresar</Link>
                    <Link to={'/'} className="text-sm hover:text-red-700 hover:underline select-none" > Olvidé mi contraseña </Link>
                </div>

            </form>
        </div>
    )
}
